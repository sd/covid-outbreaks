# rubocop:disable Lint/MissingCopEnableDirective, Layout/HashAlignment, Metrics/ModuleLength, Style/WordArray

module GeoData
  OUTBREAK_ATTRIBUTES = {
    'cn' => { # China
      'links' => {
        'Official Reports' => 'http://en.nhc.gov.cn/news.html',
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China'
      }
    },
    'tw' => { # Taiwan
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Taiwan'
      }
    },
    'jp' => { # Japan
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Japan'
      }
    },
    'kr' => { # South Korea
      'links' => {
        'Official Reports' => 'https://www.cdc.go.kr/board/board.es?mid=a30402000000&bid=0030',
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_South_Korea'
      }
    },
    'sg' => { # Singapore
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Singapore'
      }
    },
    'my' => { # Malasya
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Malaysia'
      }
    },

    'in' => { # India
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_India'
      }
    },

    'ca' => { # Canada
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Canada'
      }
    },

    'us' => {
      'links' => {
        'Data: covidtracking.com' => 'https://covidtracking.com/data/',
        'CDC' => 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
        'Wikipedia US' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States'
      }
    },
    'us.wa' => {
      'links' => {
        'WA State Dept. of Health' => 'https://www.doh.wa.gov/Emergencies/Coronavirus',
        'Wikipedia WA' => 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Washington_(state)'
      }
    },
    'us.ca' => {
      'links' => {
        'CA Dept. Public of Health' => 'https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/nCoV2019.aspx',
        'Wikipedia CA' => 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_California'
      }
    },
    'us.ny' => {
      'links' => {
        'Data: NY Health Tracker' => 'https://covid19tracker.health.ny.gov/views/NYS-COVID19-Tracker/NYSDOHCOVID-19Tracker-Fatalities?%3Aembed=yes&%3Atoolbar=no&%3Atabs=n',
        'NY Health' => 'https://www.health.ny.gov/diseases/communicable/coronavirus/',
        'Wikipedia NY' => 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_New_York_(state)'
      }
    },
    'us.nyc' => {
      'links' => {
        'Data: NY Health Tracker' => 'https://covid19tracker.health.ny.gov/views/NYS-COVID19-Tracker/NYSDOHCOVID-19Tracker-Fatalities?%3Aembed=yes&%3Atoolbar=no&%3Atabs=n',
        'John Hopkins University' => 'https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series',
        'gh/nychealth' => 'https://github.com/nychealth/coronavirus-data',
        'NYC Health' => 'https://www1.nyc.gov/site/doh/covid/covid-19-data.page'
      }
    },
    'ir' => { # Iran
      'links' => {
        'Islamic Republic News Agency' => 'https://en.irna.ir/service/news',
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iran'
      }
    },
    'iq' => { # Iraq
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iraq'
      }
    },
    'ae' => { # United Arab Emirates
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Arab_Emirates'
      }
    },
    'eg' => { # Egypt
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Egypt'
      }
    },

    'au' => { # Australia
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Australia'
      }
    },

    'it' => { # Italy
      'links' => {
        'Data: gh/pcm-dcp' => 'https://github.com/pcm-dpc/COVID-19',
        'Protezione Civile' => 'http://www.protezionecivile.gov.it/media-communication/press-release',
        '@dpcgov' => 'https://twitter.com/dpcgov',
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Italy'
      }
    },

    'es' => { # Spain
      'links' => {
        'Data: gh/datadista' => 'https://github.com/datadista/datasets/tree/master/COVID%2019',
        'Ministerio de Sanidad' => 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/situacionActual.htm',
        'RTVE' => 'https://www.rtve.es/noticias/20200314/mapa-del-coronavirus-espana/2004681.shtml',
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Spain'
      }
    },

    'fr' => { # France
      'links' => {
        'Data: gh/cedricguadalupe' => 'https://github.com/cedricguadalupe/FRANCE-COVID-19',
        'Santé publique France' => 'https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde',
        'Data: data.gouv.fr' => 'https://www.data.gouv.fr/en/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/',
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_France'
      }
    },

    'uk' => { # United Kingdom
      'emoji' => '🇬🇧',
      'links' => {
        'Data: tomwhite/covid-19-uk-data' => 'https://github.com/tomwhite/covid-19-uk-data',
        'Gov.uk' => 'https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public',
        '@DHSCgovuk' => 'https://twitter.com/DHSCgovuk',
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Kingdom'
      }
    },
    'uk.gb' => { # Great Britain
      'emoji' => '🇬🇧'
    },
    'uk.gb.en' => { # England
      'emoji' => '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
    },
    'uk.gb.nir' => { # Northern Ireland
      'emoji' => '🇬🇧'
    },
    'uk.gb.sc' => { # Scotland
      'emoji' => '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
    },
    'uk.gb.wl' => { # Wales
      'emoji' => '🏴󠁧󠁢󠁷󠁬󠁳󠁿'
    },

    'ph' => { # Philippines
      'links' => { 'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Philippines' }
    },

    'ch' => { # Switzerland
      'links' => { 'Tribune de Geneva' => 'https://interactif.tdg.ch/2020/covid-19-carte-suisse/',
               'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Switzerland' }
    },

    'nl' => { # Netherlands
      'links' => { 'Ministry of Health' => 'https://www.rivm.nl/en/news/current-information-about-novel-coronavirus-covid-19',
               'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Netherlands' }
    },
    'sm' => { # San Marino
      'links' => { 'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_San_Marino' }
    },

    'de' => { # Germany
      'links' => { 'Robert Koch Institut' => 'https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Situationsberichte/Gesamt.html',
               'Berliner Morgenpost' => 'https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/?fbclid=IwAR04HlqzakGaNssQzbz4d8o8R3gz0C910U8tvfYlBT6P0lVJJvHfk9uS2rc',
               'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Germany' }
    },

    'se' => { # Sweden
      'links' => { 'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Sweden' }
    },

    'be' => { # Belgium
      'links' => { 'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Belgium' }
    },
    'at' => { # Austria
      'links' => { 'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Austria' }
    },

    'ar' => { # Argentina
      'links' => { 'gob.ar' => 'https://www.argentina.gob.ar/coronavirus/informe-diario' }
    },

    'ec' => { # Ecuador
      'links' => { 'gob.ec' => 'https://www.gestionderiesgos.gob.ec/informes-de-situacion-covid-19-desde-el-13-de-marzo-del-2020/',
                '@Riesgos_Ec' => 'https://twitter.com/Riesgos_Ec' }
    },

    'pe' => { # Peru
      'links' => { 'gob.pe' => 'https://www.gob.pe/8662' }
    },

    'co' => { # Colombia
      'links' => { '@MinSaludCol' => 'https://twitter.com/MinSaludCol' }
    },

    'other.diamond_princess' => {
      'name' => 'Diamond Princess (out of Japan)',
      'emoji' => '🛳',
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_on_cruise_ships#Diamond_Princess'
      }
    },
    'other.grand_princess' => {
      'name' => 'Grand Princess (out of US)',
      'emoji' => '🛳'
    },
    'other.ms_zaandam' => {
      'name' => 'MS Zanadam',
      'emoji' => '🛳',
      'links' => {
        'Wikipedia' => 'https://en.wikipedia.org/wiki/MS_Zaandam#Coronavirus_pandemic'
      }
    }
  }.freeze

  #==========================================================================================
  US_STATES_BY_CODE = {
    'AL' => 'Alabama',
    'AK' => 'Alaska',
    'AZ' => 'Arizona',
    'AR' => 'Arkansas',
    'CA' => 'California',
    'CO' => 'Colorado',
    'CT' => 'Connecticut',
    'DE' => 'Delaware',
    'DC' => 'D.C.',
    'FL' => 'Florida',
    'GA' => 'Georgia',
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
    'RI' => 'Rhode Island',
    'SC' => 'South Carolina',
    'SD' => 'South Dakota',
    'TN' => 'Tennessee',
    'TX' => 'Texas',
    'UT' => 'Utah',
    'VT' => 'Vermont',
    'VA' => 'Virginia',
    'WA' => 'Washington',
    'WV' => 'West Virginia',
    'WI' => 'Wisconsin',
    'WY' => 'Wyoming'
  }.freeze

  US_STATES_BY_NAME = US_STATES_BY_CODE.collect { |k, v| [v, k] }.to_h.freeze

  REGIONS = {
    'asia' => [
      'af', 'am', 'az', 'bh', 'bd', 'bt', 'bn', 'kh', 'cn', 'cy', 'ge', 'hk', 'in', 'id', 'ir', 'iq',
      'il', 'jp', 'jo', 'kz', 'kp', 'kr', 'kw', 'kg', 'la', 'lb', 'mo', 'my', 'mv', 'mn', 'mm', 'np',
      'om', 'pk', 'ps', 'ph', 'qa', 'sa', 'sg', 'lk', 'sy', 'tw', 'tj', 'th', 'tl', 'tr', 'tm', 'ae',
      'uz', 'vn', 'ye'
    ],
    'europe' => [
      'ax', 'al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cz', 'dk', 'ee', 'fo', 'fi', 'fr', 'de',
      'gi', 'gr', 'gg', 'va', 'hu', 'is', 'ie', 'im', 'it', 'je', 'lv', 'li', 'lt', 'lu', 'mt', 'md',
      'mc', 'me', 'nl', 'mk', 'no', 'pl', 'pt', 'ro', 'ru', 'sm', 'rs', 'sk', 'si', 'es', 'sj', 'se',
      'ch', 'ua', 'gb', 'uk'
    ],
    'africa' => [
      'dz', 'ao', 'bj', 'bw', 'io', 'bf', 'bi', 'cv', 'cm', 'cf', 'td', 'km', 'cg', 'cd', 'ci', 'dj',
      'eg', 'gq', 'er', 'sz', 'et', 'tf', 'ga', 'gm', 'gh', 'gn', 'gw', 'ke', 'ls', 'lr', 'ly', 'mg',
      'mw', 'ml', 'mr', 'mu', 'yt', 'ma', 'mz', 'na', 'ne', 'ng', 're', 'rw', 'sh', 'st', 'sn', 'sc',
      'sl', 'so', 'za', 'ss', 'sd', 'tz', 'tg', 'tn', 'ug', 'eh', 'zm', 'zw',
      'fr.may', 'fr.reu'
    ],
    'oceania' => [
      'as', 'au', 'cx', 'cc', 'ck', 'fj', 'pf', 'gu', 'hm', 'ki', 'mh', 'fm', 'nr', 'nc', 'nz', 'nu',
      'nf', 'mp', 'pw', 'pg', 'pn', 'ws', 'sb', 'tk', 'to', 'tv', 'um', 'vu', 'wf',
      'fr.nca'
    ],
    'americas' => [
      'ai', 'ag', 'ar', 'aw', 'bs', 'bb', 'bz', 'bm', 'bo', 'bq', 'bv', 'br', 'ca', 'ky', 'cl', 'co',
      'cr', 'cu', 'cw', 'dm', 'do', 'ec', 'sv', 'fk', 'gf', 'gl', 'gd', 'gp', 'gt', 'gy', 'ht', 'hn',
      'jm', 'mq', 'mx', 'ms', 'ni', 'pa', 'py', 'pe', 'pr', 'bl', 'kn', 'lc', 'mf', 'pm', 'vc', 'sx',
      'gs', 'sr', 'tt', 'tc', 'us', 'uy', 've', 'vg', 'vi',
      'uk.British Virgin Islands', 'uk.Anguila', 'uk.Montserrat', 'uk.Cayman Islands', 'uk.Turk and Caicos Islands',
      'uk.Bermuda',
      'nl.Curacao', 'nl.Bonaire, Sint Eustatius and Saba', 'nl.Sint Maarten',
      'fr.mar', 'fr.gua', 'fr.sma', 'fr.sba',
      'uk.Falkland Islands (Malvinas)', 'fr.guy'
    ],

    'middleeast' => [
      'af', 'bh', 'dj', 'eg', 'ir', 'iq', 'jo', 'kw', 'lb', 'ly', 'ma', 'om', 'pk', 'qa', 'sa', 'so',
      'sd', 'ss', 'sy', 'tn', 'ae', 'ye'
    ],

    'seasia' => [
      'bd', 'bt', 'in', 'id', 'mv', 'mm', 'np', 'lk', 'th', 'tl'
    ],

    'asia_southern' => ['af', 'bd', 'bt', 'in', 'ir', 'mv', 'np', 'pk', 'lk'],
    'asia_southeastern' => ['bn', 'kh', 'id', 'la', 'my', 'mm', 'ph', 'sg', 'th', 'tl', 'vn'],
    'asia_eastern' => ['cn', 'hk', 'jp', 'kp', 'kr', 'mo', 'mn', 'tw'],
    'asia_western' => [
      'am', 'az', 'bh', 'cy', 'ge', 'iq', 'il', 'jo', 'kw', 'lb', 'om', 'ps', 'qa', 'sa', 'sy', 'tr',
      'ae', 'ye'
    ],
    'asia_central' => ['kz', 'kg', 'tj', 'tm', 'uz'],

    'oceania_ausnz' => ['au', 'cx', 'cc', 'hm', 'nz', 'nf'],
    'oceania_melanesia' => ['fj', 'nc', 'pg', 'sb', 'vu', 'fr.nca'],
    'oceania_micronesia' => ['gu', 'ki', 'mh', 'fm', 'nr', 'mp', 'pw', 'um'],
    'oceania_polynesia' => ['as', 'ck', 'pf', 'nu', 'pn', 'ws', 'tk', 'to', 'tv', 'wf'],

    'europe_northern' => [
      'ax', 'dk', 'ee', 'fo', 'fi', 'gg', 'is', 'ie',
      'im', 'je', 'lv', 'lt', 'no', 'sj', 'se', 'gb'
    ],
    'europe_southern' => [
      'al', 'ad', 'ba', 'hr', 'gi', 'gr', 'va', 'it', 'mt', 'me', 'mk', 'pt', 'sm', 'rs', 'si', 'es', 'uk.Gibraltar'
    ],
    'europe_western' => ['at', 'be', 'fr', 'de', 'li', 'lu', 'mc', 'nl', 'ch'],
    'europe_eastern' => ['by', 'bg', 'cz', 'hu', 'md', 'pl', 'ro', 'ru', 'sk', 'ua'],

    'america_northern' => ['bm', 'ca', 'gl', 'pm', 'us'],
    'america_latamcarib' => [
      'ai', 'ag', 'ar', 'aw', 'bs', 'bb', 'bz', 'bo', 'bq', 'bv', 'br', 'ky', 'cl', 'co', 'cr', 'cu',
      'cw', 'dm', 'do', 'ec', 'sv', 'fk', 'gf', 'gd', 'gp', 'gt', 'gy', 'ht', 'hn', 'jm', 'mq', 'mx',
      'ms', 'ni', 'pa', 'py', 'pe', 'pr', 'bl', 'kn', 'lc', 'mf', 'vc', 'sx', 'gs', 'sr', 'tt', 'tc',
      'uy', 've', 'vg', 'vi'
    ],

    'america_caribbean' => [
      'ai', 'ag', 'aw', 'bs', 'bb', 'bq', 'ky', 'cu', 'cw', 'dm', 'do', 'gd', 'gp', 'ht', 'jm', 'mq',
      'ms', 'pr', 'bl', 'kn', 'lc', 'mf', 'vc', 'sx', 'tt', 'tc', 'vg', 'vi',
      'uk.British Virgin Islands', 'uk.Anguila', 'uk.Montserrat', 'uk.Cayman Islands', 'uk.Turk and Caicos Islands',
      'uk.Bermuda',
      'nl.Curacao', 'nl.Bonaire, Sint Eustatius and Saba', 'nl.Sint Maarten',
      'fr.mar', 'fr.gua', 'fr.sma', 'fr.sba'
    ],
    'america_south' => [
      'ar', 'bo', 'bv', 'br', 'cl', 'co', 'ec', 'fk', 'gf', 'gy', 'py', 'pe', 'gs', 'sr', 'uy', 've',
      'uk.Falkland Islands (Malvinas)', 'fr.guy'
    ],
    'america_central' => ['bz', 'cr', 'sv', 'gt', 'hn', 'mx', 'ni', 'pa'],

    'america_latam' => [
      'ar', 'bo', 'br', 'cl', 'co', 'ec', 'py', 'pe', 'uy', 've', 'cr', 'sv', 'gt',
      'hn', 'mx', 'ni', 'pa', 'cu', 'pr', 'do', 'ht'
    ],

    'africa_northern' => ['dz', 'eg', 'ly', 'ma', 'sd', 'tn', 'eh'],
    'africa_subsaharan' => [
      'ao', 'bj', 'bw', 'io', 'bf', 'bi', 'cv', 'cm', 'cf', 'td', 'km', 'cg', 'cd', 'ci', 'dj', 'gq',
      'er', 'sz', 'et', 'tf', 'ga', 'gm', 'gh', 'gn', 'gw', 'ke', 'ls', 'lr', 'mg', 'mw', 'ml', 'mr',
      'mu', 'yt', 'mz', 'na', 'ne', 'ng', 're', 'rw', 'sh', 'st', 'sn', 'sc', 'sl', 'so', 'za', 'ss',
      'tz', 'tg', 'ug', 'zm', 'zw',
      'fr.may', 'fr.reu'
    ],

    'africa_subsaharan_western' => [
      'bj', 'bf', 'cv', 'ci', 'gm', 'gh', 'gn', 'gw', 'lr', 'ml', 'mr', 'ne', 'ng', 'sh', 'sn', 'sl', 'tg'
    ],
    'africa_southern_western' => ['bw', 'sz', 'ls', 'na', 'za'],
    'africa_subsaharan_eastern' => [
      'io', 'bi', 'km', 'dj', 'er', 'et', 'tf', 'ke', 'mg', 'mw', 'mu', 'yt', 'mz', 're', 'rw', 'sc', 'so',
      'ss', 'tz', 'ug', 'zm', 'zw', 'fr.may', 'fr.reu'
    ]
  }.freeze
end
