require 'date'
require 'open-uri'
require 'csv'
require 'pp'
require 'nokogiri'

# Fetch data from Worldometers
class FetchWorldometers
  LOCAL_FILE = './src/data/csse.deaths.csv'.freeze
  HTML_URL = 'https://www.worldometers.info/coronavirus/'.freeze

  # New instance
  def initialize
    @now = DateTime.now
    @today_iso = @now.to_time.utc.strftime('%Y-%m-%d')
    @today_mmdd = @now.to_time.utc.strftime('%-m/%-d/20')

    @yesterday = @now - 1
    @yesterday_iso = @yesterday.to_time.utc.strftime('%Y-%m-%d')
    @yesterday_mmdd = @yesterday.to_time.utc.strftime('%-m/%-d/20')

    @day_before = @now - 2
    @day_before_iso = @day_before.to_time.utc.strftime('%Y-%m-%d')
    @day_before_mmdd = @day_before.to_time.utc.strftime('%-m/%-d/20')
  end

  # Main fetch task
  def fetch
    puts 'Reading Worldometers Info'

    current_data = load_current_data.reject { |row| row['Country_Region'] == 'US' }

    page = Nokogiri::HTML(URI.parse(HTML_URL).read)

    real_rows = {}

    page.css('table#main_table_countries_today tbody > tr').each do |row|
      values = row.css('td').collect { |td| td.text }
      next if ALIASES[values[0]] == 'ignore'

      country = ALIASES[values[0]] || values[0]

      real_rows[country] = values[3].gsub(',', '').to_i
    end

    data = ([@today_mmdd] + current_data.collect do |current_row|
      country = current_row[0]
      if current_row[1].nil? && real_rows[country]
        last = current_row[@yesterday_mmdd].to_i
        if last.positive? && real_rows[country] > (last.to_i * (RELIABLE_UPDATES[country] ? 1 : 1.1))
          real_rows[country]
        else
          current_row[@today_mmdd] || ''
        end
      else
        current_row[@today_mmdd] || ''
      end
    end).join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "Worldometers Updates for #{@today_mmdd} copied to clipboard!!!"
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

  ALIASES = {
    'S. Korea' => 'Korea, South'
  }.freeze

  RELIABLE_UPDATES = {
    'Austria' => true,
    'Belgium' => true,
    'Bolivia' => true,
    'Denmark' => true,
    'Finland' => true,
    'Hungary' => true,
    'Indonesia' => true,
    'Iran' => true,
    'Korea, South' => true,
    'Malaysia' => true,
    'Mexico' => true,
    'Netherlands' => true,
    'Norway' => true,
    'Philipines' => true,
    'Portugal' => true,
    'Russia' => true,
    'Sweden' => true,
    'Ukraine' => true
  }
end
