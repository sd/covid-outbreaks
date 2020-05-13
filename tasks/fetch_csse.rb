require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data from CSSE
class FetchCSSE
  LOCAL_FILE = './src/data/csse.deaths.csv'.freeze
  DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/' \
        'master/csse_covid_19_data/csse_covid_19_daily_reports/[date].csv'.freeze

  UPDATE_TIME = '8pm EDT (12am UTC)'.freeze

  # New instance
  def initialize(date)
    @now = date || DateTime.now
    @today_iso = @now.to_time.utc.strftime('%Y-%m-%d')
    @today_mmdd = @now.to_time.utc.strftime('%m/%d/20')

    @yesterday = @now - 1
    @yesterday_iso = @yesterday.to_time.utc.strftime('%Y-%m-%d')
    @yesterday_mmdd = @yesterday.to_time.utc.strftime('%m/%d/20')

    @day_before = @now - 2
    @day_before_iso = @day_before.to_time.utc.strftime('%Y-%m-%d')
    @day_before_mmdd = @day_before.to_time.utc.strftime('%m/%d/20')
  end

  # Main fetch task
  def fetch
    puts "Reading CSSE Data for #{@yesterday_iso}"

    new_data = load_new_data(@yesterday).reject { |row| row['Country_Region'] == 'US' }

    current_data = load_current_data.reject { |row| row['Country_Region'] == 'US' }

    print_warnings(@yesterday_mmdd, new_data, current_data)

    data = ([@yesterday_mmdd] + new_data.collect { |row| "#{row['Deaths']}\t#{row[:key]}" }).join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "CSSE Rows match. Data for #{@yesterday_mmdd} copied to clipboard!!!"
  end

  # Print Warnings
  def print_warnings(date_mmdd, new_data, current_data)
    new_index = new_data.group_by { |row| row[:key] }
    current_index = current_data.group_by { |row| row[:key] }

    added_keys = (new_index.keys - current_index.keys)
    removed_keys = (current_index.keys - new_index.keys)

    if !added_keys.empty?
      puts 'CSSE ADDED:'
      added_keys.each do |key|
        puts " + #{new_index[key][0][:line]} • #{key}"
      end
    end

    if !removed_keys.empty?
      puts 'CSSE REMOVED:'
      removed_keys.each do |key|
        puts " - #{current_index[key][0][:line]} • #{key}"
      end
    end

    if added_keys.empty? && removed_keys.empty?
      new_data.each do |row|
        current_row = current_index[row[:key]][0]
        if current_row[date_mmdd] && row['Deaths'] < current_row[date_mmdd]
          puts " ! • #{row[:key]} #{row['Deaths']} is less than existing #{current_row[date_mmdd]}"
        end
      end
    end
  end

  # Load new data
  def load_new_data(date)
    url = DATA_URL.gsub('[date]', date.to_time.utc.strftime('%m-%d-%Y'))

    new_data = CSV.new(URI.parse(url).open, headers: :first_row).read

    new_data =  new_data.sort_by { |row|
      [
        row['Country_Region'].downcase || '',
        (row['Province_State'] || 'zzz').downcase,
        (row['Admin2'] || 'zzz').downcase
      ]
    }

    new_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = [row['Country_Region'], row['Province_State'], row['Admin2']].compact.join(', ')
      case row[:key]
      when 'Spain'
        row[:key] = 'Spain, ignore'
      when 'Canada, Recovered'
        row[:key] = 'Canada, ignore'
      when 'France'
        row[:key] = 'France, ignore'
      when /France, .*/
        row[:key] = 'France, ignore'
      when 'Italy'
        row[:key] = 'Italy, ignore'
      when 'United Kingdom'
        row[:key] = 'United Kingdom, ignore'
      end
    end

    new_data
  end

  # Load current data
  def load_current_data
    current_data = CSV.read(FetchCSSE::LOCAL_FILE, headers: :first_row)

    current_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = [row['Country/Region'], row['Province/State']].compact.join(', ')
    end

    current_data
  end
end
