
require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data from Datadista
class FetchItaly
  LOCAL_FILE = './src/data/other.deaths.csv'.freeze
  URL = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-[date].csv'.freeze

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
  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  def fetch
    puts "Reading Italy Data for #{@yesterday_iso}"

    url = URL.gsub('[date]', @yesterday.to_time.utc.strftime('%Y%m%d'))

    new_data = CSV.new(URI.parse(url).open, headers: :first_row).read
    current_data = CSV.read(FetchDatadista::LOCAL_FILE, headers: :first_row)

    new_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = ['Italy', row['denominazione_regione']].compact.join(', ')
    end

    current_data.each_with_index do |row, index|
      row[:line] = index + 2
      row[:key] = [row['Country/Region'], row['Province/State']].compact.join(', ')
    end

    data = new_data.collect { |row| row['deceduti'] }.join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "Italy data for #{@today_mmdd} copied to clipboard!!!"
  end

  def fetch_all
    date = DateTime.parse('2020-02-24')
    data_cols = []
    while date
      begin
        dateiso = date.to_time.utc.strftime('%Y%m%d')
        puts "Reading Italy Data for #{dateiso}"

        url = URL.gsub('[date]', dateiso)

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

  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength
end
