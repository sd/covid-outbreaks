require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data from CSSE
class FetchCSSE
  LOCAL_FILE = './src/data/csse.deaths.csv'.freeze
  DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/' \
        'master/csse_covid_19_data/csse_covid_19_daily_reports/[date].csv'.freeze

  # New instance
  # rubocop:disable Metrics/AbcSize
  def initialize
    @now = DateTime.now
    @today_iso = @now.to_time.utc.strftime('%Y-%m-%d')
    @today_mmdd = @now.to_time.utc.strftime('%m/%d/20')

    @yesterday = @now - 1
    @yesterday_iso = @yesterday.to_time.utc.strftime('%Y-%m-%d')
    @yesterday_mmdd = @yesterday.to_time.utc.strftime('%m/%d/20')

    @day_before = @now - 2
    @day_before_iso = @day_before.to_time.utc.strftime('%Y-%m-%d')
    @day_before_mmdd = @day_before.to_time.utc.strftime('%m/%d/20')
  end
  # rubocop:enable Metrics/AbcSize

  # Main fetch task
  # rubocop:disable Metrics/PerceivedComplexity, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/AbcSize
  def fetch
    puts "Reading CSSE Data for #{@yesterday_iso}"

    url = DATA_URL.gsub('[date]', @yesterday.to_time.utc.strftime('%m-%d-%Y'))

    new_data = CSV.new(URI.parse(url).open, headers: :first_row).read
    current_data = CSV.read(FetchCSSE::LOCAL_FILE, headers: :first_row)

    new_data = new_data.reject { |row| row['Country_Region'] == 'US' }
                       .sort_by { |row| [
                         row['Country_Region'].downcase || '',
                         (row['Province_State'] || 'zzz').downcase
                        ] }

    new_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = [row['Country_Region'], row['Province_State']].compact.join(', ')
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
      end
    end

    current_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = [row['Country/Region'], row['Province/State']].compact.join(', ')
    end

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
      data = ([@yesterday_mmdd] + new_data.collect { |row| "#{row['Deaths']}\t#{row[:key]}" }).join("\n")

      new_data.each do |row|
        current_row = current_index[row[:key]][0]
        if current_row[@yesterday_mmdd] && row['Deaths'] < current_row[@yesterday_mmdd]
          puts " ! • #{row[:key]} #{row['Deaths']} is less than existing #{current_row[@yesterday_mmdd]}"
        end
      end

      IO.popen('pbcopy', 'w') { |f| f << data }
      puts "CSSE Rows match. Data for #{@yesterday_mmdd} copied to clipboard!!!"
    end
  end
  # rubocop:enable Metrics/PerceivedComplexity, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/AbcSize
end
