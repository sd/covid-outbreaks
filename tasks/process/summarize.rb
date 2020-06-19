# rubocop:disable Lint/MissingCopEnableDirective, Metrics/ModuleLength, Style/Documentation
# rubocop:disable Metrics/PerceivedComplexity, Metrics/AbcSize, Metrics/BlockLength, Metrics/CyclomaticComplexity
# rubocop:disable Metrics/MethodLength

require 'csv'
require 'json'
require './tasks/process/geo_data'
require './tasks/process/country_info'

module DataProcessor
  def self.summarize_data
    death_data = load_csv_data('src/data/csse.deaths.csv', {})
    death_data = load_csv_data('src/data/other.deaths.csv', death_data)

    processed_data = process_one_file('deaths', death_data, {})

    data = {
      'data' => processed_data['entries'].values.reject { |v| v['code'] =~ /ignore/i },
      'allDates' => processed_data['dates'],
      'last3Weeks' => processed_data['dates'][-21..-1],
      'last4Weeks' => processed_data['dates'][-28..-1],
      'last6Weeks' => processed_data['dates'][-42..-1],
      'last8Weeks' => processed_data['dates'][-56..-1]
    }

    File.write('src/data/preprocessed.json', data.to_json)
  end

  def self.load_csv_data(file, data)
    rows = data['rows'] || {}
    dates = nil
    iso_dates = nil

    CSV.open(file, headers: true) do |csv|
      csv.each do |row|
        dates ||= row.headers.select { |k| k =~ %r{\d+/\d+/\d+} }
        iso_dates ||= dates.collect { |date| format('2020-%02d-%02d', *date.split('/')) }

        name = CountryInfo.country_for_csse_name([row[0], row['Province/State']].compact.join(' > '))

        next unless name

        rows[name] ||= {}
        dates.each_with_index { |d, i| rows[name][iso_dates[i]] = row[d].to_i }
      end
    end

    data.merge(
      'rows' => rows,
      'dates' => iso_dates.concat(data['dates'] || []).compact.uniq.sort,
      'codes' => rows.keys
    )
  end

  #=====================================================================================================================

  def self.combine_rows(data, combination_method, combination_rules)
    rows = {}

    data['codes'].each do |code|
      target_codes = combination_rules.call(code)
      if target_codes
        target_codes = [target_codes] unless target_codes.is_a? Array

        target_codes.each do |target_code|
          row = rows[target_code] || {}
          data['dates'].each do |d|
            if data['rows'][code][d]
              row[d] = combination_method.call(row[d], data['rows'][code][d])
            end
          end
          rows[target_code] = row
        end
      else
        rows[code] = data['rows'][code]
      end
    end

    data.merge('rows' => rows, 'codes' => rows.keys)
  end

  def self.prepare_entries(field_name, entries, data)
    entries ||= {}

    data['rows'].each_key do |code|
      entry = entries[code] || { 'code' => code }.merge(CountryInfo.attributes_for_country(code))

      entry['keyDates'] ||= {}

      entry['totals'] ||= {}
      entry['totals'][field_name] = {}

      entry['daily'] ||= {}
      entry['daily'][field_name] = {}

      entry['percent'] ||= {}
      entry['percent'][field_name] = {}

      entry['velocity'] ||= {}
      entry['velocity'][field_name] = {}

      entry['acceleration'] ||= {}
      entry['acceleration'][field_name] = {}

      entry['rollingAcceleration'] ||= {}
      entry['rollingAcceleration'][field_name] = {}

      entry['outbreakDay'] ||= {}
      entry['outbreakDay'][field_name] = {}

      entry['latestTotal'] ||= {}
      entry['latestTotal'][field_name] ||= 0

      entry['latestDaily'] ||= {}
      entry['latestDaily'][field_name] ||= 0

      entry['latestVelocity'] ||= {}
      entry['latestVelocity'][field_name] ||= 0

      entry['latestAcceleration'] ||= {}
      entry['latestAcceleration'][field_name] ||= 0

      entry['latestOutbreakDay'] ||= {}

      entries[entry['code']] = entry
    end

    entries
  end

  def self.process_one_file(field_name, data, entries = {})
    velocity_offset = 7
    rolling_count = 3

    data = combine_rows(
      data,
      proc { |a, b| ((a || 0) + b) },
      proc { |*args| CountryInfo.find_aggregate_mapping(*args) }
    )
    data = combine_rows(
      data,
      proc { |a, b| Math.max(a || 0, b || 0) },
      proc { |*args| CountryInfo.find_overlay_mapping(*args) }
    )
    data = combine_rows(
      data,
      proc { |a, b| (a || 0) + b },
      proc { |*args| CountryInfo.find_totalization_mapping(*args) }
    )

    entries = prepare_entries(field_name, entries, data)

    dates = data['dates']
    last_date = dates[-1]

    data['codes'].each do |code|
      row = data['rows'][code]
      entry = entries[code]

      outbreak_counter = nil

      dates.each_with_index do |d, index|
        value = row[d]

        # Prevent errors when data is missing
        if !value || value < entry['latestTotal'][field_name]
          value = d == last_date ? entry['latestTotal'][field_name] || 0 : nil
        end

        next unless value && entry['latestTotal'][field_name]

        entry['totals'][field_name][d] = value
        entry['daily'][field_name][d] = entry['totals'][field_name][d] - entry['latestTotal'][field_name]
        entry['latestTotal'][field_name] = entry['totals'][field_name][d]
        entry['latestDaily'][field_name] = entry['daily'][field_name][d]

        if entry['totals'][field_name][d] \
        && entry['totals'][field_name][d] > 1 \
        && entry['totals'][field_name][dates[index - velocity_offset]] \
        && entry['totals'][field_name][dates[index - velocity_offset]] > 1 \
        && entry['totals'][field_name][d] != entry['totals'][field_name][dates[index - velocity_offset]]
          entry['velocity'][field_name][d] = Math.log10(
            entry['totals'][field_name][d] - entry['totals'][field_name][dates[index - velocity_offset]]
          ).round(5)

          entry['latestVelocity'][field_name] = entry['velocity'][field_name][d]
        end

        if entry['velocity'][field_name][d] \
        && entry['velocity'][field_name][dates[index - 1]]
          entry['acceleration'][field_name][d] = entry['velocity'][field_name][d] \
            - entry['velocity'][field_name][dates[index - 1]]
        end

        sum = nil
        cnt = 0
        rolling_count.times do |i|
          if entry['acceleration'][field_name][dates[index - i]]
            sum = (sum || 0) + (entry['acceleration'][field_name][dates[index - i]])
            cnt += 1
          end
        end

        if sum
          entry['rollingAcceleration'][field_name][d] = sum / cnt
          entry['latestAcceleration'][field_name] = sum / cnt
        end

        outbreak_counter = if entry['totals'][field_name][d] < 10
                             nil
                           else
                             outbreak_counter = (outbreak_counter || 0) + 1
                           end

        if outbreak_counter
          entry['outbreakDay'][field_name][d] = outbreak_counter
          entry['latestOutbreakDay'][field_name] = outbreak_counter
        end
      end

      entries[entry['code']] = entry
    end

    data.merge('entries' => entries)
  end
end
