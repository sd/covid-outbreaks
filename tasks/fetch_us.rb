require 'date'
require 'open-uri'
require 'csv'
require 'pp'

# Fetch data from Covid Tracking Project
class FetchUS
  LOCAL_FILE = './src/data/other.deaths.csv'.freeze
  DAILY_URL = 'http://covidtracking.com/api/states/daily.csv'.freeze
  CURRENT_URL = 'http://covidtracking.com/api/states.csv'.freeze

  UPDATE_INFO = 'Continuously'.freeze

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
    puts "Reading Daily US Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(DAILY_URL).open, headers: :first_row).read
    current_data = CSV.new(URI.parse(CURRENT_URL).open, headers: :first_row).read

    sorted_state_names = US_STATES_BY_CODE.values.sort

    real_rows = sorted_state_names.map { |state| [state, {}] }.to_h

    new_data.each do |row|
      date = DateTime.parse(row['date'])
      date_iso = date.to_time.utc.strftime('%Y-%m-%d')
      state = US_STATES_BY_CODE[row['state']]
      puts "Unknown state #{row['state']}" if !state

      real_rows[state][date_iso] = row['death'].to_i
    end

    current_data.each do |row|
      state = US_STATES_BY_CODE[row['state']]

      real_rows[state]['now'] = row['death'].to_i
    end

    data = (
      [[@yesterday_iso,
      #  'unchanged', 'current'
      ].join("\t"), ''] \
      + sorted_state_names.collect { |state|
        [
          real_rows[state][@yesterday_iso],
          # real_rows[state][@yesterday_iso] && real_rows[state][@yesterday_iso] == real_rows[state][@day_before_iso] ? real_rows[state][@yesterday_iso] : nil,
          # (real_rows[state]['now'] || 0) > (real_rows[state][@yesterday_iso] || 0) ? real_rows[state]['now'] : nil
        ].join("\t")
      } \
      + [[
        sorted_state_names.collect { |state| real_rows[state][@yesterday_iso].to_i }.sum,
        # nil,
        # sorted_state_names.collect { |state| real_rows[state]['now'].to_i }.sum
      ].join("\t")]
    ).join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "USA data for #{@today_mmdd} copied to clipboard!!!"
  end

  # Main fetch task
  def fetch_current
    puts "Reading Current US Data for #{@today_iso}"

    new_data = CSV.new(URI.parse(CURRENT_URL).open, headers: :first_row).read

    sorted_state_names = US_STATES_BY_CODE.values.sort

    real_rows = sorted_state_names.map { |state| [state, nil] }.to_h

    new_data.each do |row|
      state = US_STATES_BY_CODE[row['state']]
      if !state
        puts "Unknown state #{row['state']}"
      end

      real_rows[state] = row['death']
    end

    data = (
      sorted_state_names.collect { |state| real_rows[state] } \
      + [sorted_state_names.collect { |state| real_rows[state].to_i }.sum]
    ).join("\n")

    IO.popen('pbcopy', 'w') { |f| f << data }
    puts "USA data for #{@today_mmdd} copied to clipboard!!!"
  end

  US_STATES_BY_CODE = {
    'AL' => 'Alabama',
    'AK' => 'Alaska',
    'AS' => 'American Samoa',
    'AZ' => 'Arizona',
    'AR' => 'Arkansas',
    'CA' => 'California',
    'CO' => 'Colorado',
    'CT' => 'Connecticut',
    'DE' => 'Delaware',
    'DC' => 'D.C.',
    'FL' => 'Florida',
    'GA' => 'Georgia',
    'GU' => 'Guam',
    'HI' => 'Hawaii',
    'ID' => 'Idaho',
    'IL' => 'Illinois',
    'IN' => 'Indiana',
    'IA' => 'Iowa',
    'KS' => 'Kansas',
    'KY' => 'Kentucky',
    'LA' => 'Louisiana',
    'ME' => 'Maine',
    'MA' => 'Massachusetts',
    'MD' => 'Maryland',
    'MI' => 'Michigan',
    'MN' => 'Minnesota',
    'MP' => 'Northern Mariana Islands',
    'MS' => 'Mississippi',
    'MO' => 'Missouri',
    'MT' => 'Montana',
    'NE' => 'Nebraska',
    'NV' => 'Nevada',
    'NH' => 'New Hampshire',
    'NJ' => 'New Jersey',
    'NM' => 'New Mexico',
    'NY' => 'New York',
    'NC' => 'North Carolina',
    'ND' => 'North Dakota',
    'OH' => 'Ohio',
    'OK' => 'Oklahoma',
    'OR' => 'Oregon',
    'PA' => 'Pennsylvania',
    'PR' => 'Puerto Rico',
    'RI' => 'Rhode Island',
    'SC' => 'South Carolina',
    'SD' => 'South Dakota',
    'TN' => 'Tennessee',
    'TX' => 'Texas',
    'UT' => 'Utah',
    'VT' => 'Vermont',
    'VA' => 'Virginia',
    'VI' => 'US Virgin Islands',
    'WA' => 'Washington',
    'WV' => 'West Virginia',
    'WI' => 'Wisconsin',
    'WY' => 'Wyoming'
  }.freeze
end
