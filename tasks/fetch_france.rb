require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data for France
class FetchFrance
  LOCAL_FILE = './src/data/other.deaths.csv'.freeze
  DATA_URL = 'https://raw.githubusercontent.com/cedricguadalupe/FRANCE-COVID-19/' \
        'master/france_coronavirus_time_series-deaths.csv'.freeze

  UPDATE_INFO = '3pm EDT (9pm CEST)'.freeze

  # New instance
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

  # Main fetch task
  def fetch
    puts "Reading France Data for #{@yesterday_iso}"

    new_data = CSV.new(URI.parse(DATA_URL).open, headers: :first_row).read
    regions = new_data.headers.reject { |k| k == 'Date' }

    real_rows = {}
    new_data.each do |row|
      date_parts = row['Date'].split('/')
      date_iso = "#{date_parts[2]}-#{date_parts[1]}-#{date_parts[0]}"

      regions.each do |region|
        real_rows[region] ||= {}
        real_rows[region][date_iso] = row[region]
      end
    end

    data = regions.collect { |region| real_rows[region][@yesterday_iso] }.join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "France data for #{@today_mmdd} copied to clipboard!!!"
  end

  def fetch_all
    puts "Reading France Data for #{@yesterday_iso}"

    new_data = CSV.new(URI.parse(DATA_URL).open, headers: :first_row).read
    regions = new_data.headers.reject { |k| k == 'Date' }
    dates = []

    real_rows = {}
    new_data.each do |row|
      date_parts = row['Date'].split('/')
      date_iso = "#{date_parts[2]}-#{date_parts[1]}-#{date_parts[0]}"
      dates << date_iso

      regions.each do |region|
        real_rows[region] ||= {}
        real_rows[region][date_iso] = row[region]
      end
    end

    data = regions.collect { |region| dates.collect { |date| real_rows[region][date] }.join("\t") }.join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts 'All France data copied to clipboard!!!'
  end
end
