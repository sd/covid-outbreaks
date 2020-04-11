require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data for France
class FetchFrance
  LOCAL_FILE = './src/data/other.deaths.csv'.freeze

  OFFICIAL_DATA_URL = 'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7'.freeze

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
    puts "Reading France Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(OFFICIAL_DATA_URL).open, col_sep: ';', headers: :first_row).read

    regions = FRENCH_REGION_GROUPS.keys
    region_for_dep = {}
    FRENCH_REGION_GROUPS.each do |region, deps|
      deps.each { |dep| region_for_dep[dep] = region }
    end

    real_rows = regions.collect { |region| [region, {}] }.to_h

    new_data.each_with_index do |row, index|
      date_iso = row['jour']

      next unless row['dep'] && row['dep'] != ''

      next unless row['sexe'] == '0'

      region = region_for_dep[row['dep']]
      puts "Unknown region for `#{row['dep']}` in line #{index}" && next unless region

      real_rows[region][date_iso] ||= 0
      real_rows[region][date_iso] += row['dc'].to_i
    end

    if real_rows[regions[0]][@today_iso] == nil
      puts "NO DATA FOR #{@today_mmdd}!!!"
    else
      data = (
        regions.collect { |region| real_rows[region][@today_iso] } \
        + [regions.collect { |region| real_rows[region][@today_iso] || 0}.sum]
      ).join("\n")

      IO.popen('pbcopy', 'w') { |f| f << data }
      puts "France data for #{@today_mmdd} copied to clipboard!!!"
    end
  end

  # Main fetch task
  def fetch_all
    puts "Reading France Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(OFFICIAL_DATA_URL).open, col_sep: ';', headers: :first_row).read

    regions = FRENCH_REGION_GROUPS.keys
    region_for_dep = {}
    FRENCH_REGION_GROUPS.each do |region, deps|
      deps.each { |dep| region_for_dep[dep] = region }
    end

    real_rows = regions.collect { |region| [region, {}] }.to_h

    new_data.each_with_index do |row, index|
      date_iso = row['jour']

      next unless row['dep'] && row['dep'] != ''

      next unless row['sexe'] == '0'

      region = region_for_dep[row['dep']]
      puts "Unknown region for `#{row['dep']}` in line #{index}" && next unless region

      real_rows[region][date_iso] ||= 0
      real_rows[region][date_iso] += row['dc'].to_i
    end

    dates = regions['Corse'].keys.sort

    data = regions.collect { |region| dates.collect { |date| real_rows[region][date] }.join("\t") }.join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "France data for #{@today_mmdd} copied to clipboard!!!"
  end

  # https://en.wikipedia.org/wiki/Departments_of_France
  FRENCH_REGION_GROUPS = {
    'Auvergne-Rhône-Alpes': %w[01 1 03 3 07 7 15 26 38 42 43 63 69 73 74],
    'Bourgogne-Franche-Comté': %w[21 25 39 58 70 71 89 90],
    'Bretagne': %w[22 29 35 56],
    'Centre-Val de Loire': %w[18 28 36 37 41 45],
    'Corse': %w[2A 2B],
    'Grand Est': %w[08 8 10 51 52 54 55 57 67 68 88],
    'Hauts-de-France': %w[02 2 59 60 62 80],
    'Île-de-France': %w[75 77 78 91 92 93 94 95],
    'Normandie': %w[14 27 50 61 76],
    'Nouvelle-Aquitaine': %w[16 17 19 23 24 33 40 47 64 79 86 87],
    'Occitanie': %w[09 9 11 12 30 31 32 34 46 48 65 66 81 82],
    'Pays de la Loire': %w[44 49 53 72 85],
    'Provence-Alpes-Côte d\'Azur': %w[04 4 05 5 06 6 13 83 84],
    'Guadeloupe': %w[971],
    'Saint-Barthélémy': %w[977],
    'Saint-Martin': %w[978],
    'Martinique': %w[972],
    'Guyane': %w[973],
    'La Réunion': %w[974],
    'Mayotte': %w[976],
    'Nouvelle-Calédonie': %w[988]
  }.freeze
end
