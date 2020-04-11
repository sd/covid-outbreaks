require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data from NYC
class FetchNYC
  LOCAL_FILE = './src/data/other.deaths.csv'.freeze
  DATA_URL = 'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/case-hosp-death.csv'.freeze

  CSSE_DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/' \
                  'master/csse_covid_19_data/csse_covid_19_daily_reports/[date].csv'.freeze

  UPDATE_INFO = '6pm EDT'.freeze

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
    puts "Reading NYC CSSE Data for #{@yesterday_iso}"

    csse = FetchCSSE.new
    csse_data = csse.load_new_data(@yesterday)

    data = csse_data.find { |row| row[:key] == 'US, New York, New York City' }['Deaths']

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "NYC data for #{@yesterday_mmdd} copied to clipboard!!!"
  end

  # Fetch NYCHealth data, as a row with previous dates
  def fetch_nych
    puts "Reading NYC Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(DATA_URL).open, headers: :first_row).read

    total = 0
    total_for_date = {}
    dates = []

    new_data.each do |row|
      # binding.pry
      next unless row[0]

      date_parts = row[0].split('/')

      date_iso = Date.parse("20#{date_parts[2]}-#{date_parts[0]}-#{date_parts[1]}").strftime('%Y-%m-%d')
      dates << date_iso

      if row[3]
        total += row[3].to_i
      end
      total_for_date[date_iso] = total
    end

    dates_with_total = dates.select { |d| total_for_date[d].positive? }
    data = dates_with_total.collect { |d| total_for_date[d] }.join("\t")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "NYC data for #{@today_mmdd}, starting on #{dates_with_total[0]} copied to clipboard!!!"
  end

  NY_METRO_COUNTIES = [
    'US, New York, New York City',
    'US, New York, Westchester',
    'US, New Jersey, Bergen',
    'US, New Jersey, Hudson',
    'US, New Jersey, Passaic',
    'US, New York, Putnam',
    'US, New York, Rockland'
  ].freeze

  NY_NJ_MSA_COUNTIES = NY_METRO_COUNTIES + [
    'US, New York, Suffolk',
    'US, New York, Nassau',
    'US, New Jersey, Middlesex',
    'US, New Jersey, Monmouth',
    'US, New Jersey, Ocean',
    'US, New Jersey, Somerset',
    'US, New Jersey, Essex',
    'US, New Jersey, Union',
    'US, New Jersey, Morris',
    'US, New Jersey, Sussex',
    'US, New Jersey, Hunterdon',
    'US, Pennsylvania, Pike',
  ].freeze
end
