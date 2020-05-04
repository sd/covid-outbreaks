require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data for Italy
class FetchItaly
  LOCAL_FILE = './src/data/other.deaths.csv'.freeze
  # DATA_URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/' \
  #            'dati-regioni/dpc-covid19-ita-regioni-[date].csv'.freeze
  DATA_URL =  'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/' \
              'dati-regioni/dpc-covid19-ita-regioni-latest.csv'.freeze

  UPDATE_INFO = '12pm EDT (7pm CEST)'.freeze

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
    puts "Reading Italy Data for #{@today_iso}"

    url = DATA_URL.gsub('[date]', @now.to_time.utc.strftime('%Y%m%d'))

    new_data = CSV.new(URI.parse(url).open, headers: :first_row).read

    new_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = ['Italy', row['denominazione_regione']].compact.join(', ')
    end

    data = (new_data.collect { |row| row['deceduti'] } + [new_data.collect { |row| row['deceduti'].to_i }.sum])
           .join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "Italy data for #{@today_mmdd} copied to clipboard!!!"
  end

  def fetch_all
    date = DateTime.parse('2020-02-24')
    data_cols = []
    while date
      begin
        date_iso = date.to_time.utc.strftime('%Y%m%d')
        puts "Reading Italy Data for #{date_iso}"

        url = URL.gsub('[date]', date_iso)

        new_data = CSV.new(URI.parse(url).open, headers: :first_row).read

        new_data.each_with_index do |row, index|
          row[:line] = index + 2
          row[:key] = ['Italy', row['denominazione_regione']].compact.join(', ')
        end

        data_cols << new_data.collect { |row| row['deceduti'] }
        date += 1
      rescue OpenURI::HTTPError
        date = nil
      end
    end

    data = data_cols.transpose.collect { |row| row.join("\t") }.join("\n")
    IO.popen('pbcopy', 'w') { |f| f << data }
    puts 'Italy data copied to clipboard!!!'
  end
end
