require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data from Datadista
class FetchSpain
  LOCAL_FILE = './src/data/other.deaths.csv'.freeze
  DATA_URL = 'https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/ccaa_covid19_fallecidos.csv'.freeze

  UPDATE_INFO = '6am EDT (12pm CEST)'.freeze

  # New instance
  def initialize(date = nil)
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
    puts "Reading Spain Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(DATA_URL).open, headers: :first_row).read

    new_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = ['Spain', row['CCAA']].compact.join(', ')
      case row[:key]
      when 'Total'
        row[:key] = 'Spain'
      end
    end

    new_data = new_data.reject { |row| row[:key] == 'Spain' }.sort_by { |row| row[:key] }

    data = (
      new_data.collect { |row| row[@today_iso] } # + [new_data.collect { |row| row[@today_iso].to_i }.sum]
    ).join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "Spain data for #{@today_mmdd} copied to clipboard!!!"
  end
end
