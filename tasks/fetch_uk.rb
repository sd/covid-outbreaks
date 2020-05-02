require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data for UK
class FetchUK
  OFFICIAL_DATA_URL = 'https://raw.githubusercontent.com/tomwhite/covid-19-uk-data/master/data/covid-19-indicators-uk.csv'.freeze

  UPDATE_INFO = '4:30pm GMT+1 (11:30 EDT)'.freeze

  # New instance
  def initialize
    @now = DateTime.now - 1
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
    puts "Reading UK Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(OFFICIAL_DATA_URL).open, headers: :first_row).read

    real_rows = UK_REGIONS.collect { |region| [region, {}] }.to_h

    new_data.each do |row|
      date_iso = row['Date']

      next unless row['Indicator'] == 'Deaths'

      real_rows[row['Country']][date_iso] = row['Value']
    end

    if real_rows['UK'][@today_iso].nil?
      puts "NO DATA FOR #{@today_mmdd}!!!"
    else
      data = UK_REGIONS.collect { |region| real_rows[region][@today_iso] }.join("\n")

      IO.popen('pbcopy', 'w') { |f| f << data }
      puts "UK data for #{@today_mmdd} copied to clipboard!!!"
    end
  end

  # Main fetch task
  def fetch_all
    puts "Reading UK Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(OFFICIAL_DATA_URL).open, headers: :first_row).read

    real_rows = UK_REGIONS.collect { |region| [region, {}] }.to_h

    new_data.each do |row|
      date_iso = row['Date']

      next unless row['Indicator'] == 'Deaths'

      real_rows[row['Country']][date_iso] = row['Value']
    end

    dates = real_rows['UK'].keys.sort

    data =  (
              [dates.join("\t")] \
              + UK_REGIONS.collect { |region| dates.collect { |date| real_rows[region][date] }.join("\t") }
            ).join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts 'UK data for all dates copied to clipboard!!!'
  end

  UK_REGIONS = [
    'England',
    'Northern Ireland',
    'Scotland',
    'Wales',
    'UK'
  ].freeze
end
