export const US_STATES_BY_CODE = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'D.C.',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MA': 'Massachusetts',
  'MD': 'Maryland',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
}

const statesByName = {}
Object.keys(US_STATES_BY_CODE).forEach(code => { statesByName[US_STATES_BY_CODE[code]] = code })
export const US_STATES_BY_NAME = statesByName

export const REGIONS = {
  "asia": [
    "af", "am", "az", "bh", "bd", "bt", "bn", "kh", "cn", "cy", "ge", "hk", "in", "id", "ir", "iq",
    "il", "jp", "jo", "kz", "kp", "kr", "kw", "kg", "la", "lb", "mo", "my", "mv", "mn", "mm", "np",
    "om", "pk", "ps", "ph", "qa", "sa", "sg", "lk", "sy", "tw", "tj", "th", "tl", "tr", "tm", "ae",
    "uz", "vn", "ye"
  ],
  "europe": [
    "ax", "al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk", "ee", "fo", "fi", "fr", "de",
    "gi", "gr", "gg", "va", "hu", "is", "ie", "im", "it", "je", "lv", "li", "lt", "lu", "mt", "md",
    "mc", "me", "nl", "mk", "no", "pl", "pt", "ro", "ru", "sm", "rs", "sk", "si", "es", "sj", "se",
    "ch", "ua", "gb", "uk"
  ],
  "africa": [
    "dz", "ao", "bj", "bw", "io", "bf", "bi", "cv", "cm", "cf", "td", "km", "cg", "cd", "ci", "dj",
    "eg", "gq", "er", "sz", "et", "tf", "ga", "gm", "gh", "gn", "gw", "ke", "ls", "lr", "ly", "mg",
    "mw", "ml", "mr", "mu", "yt", "ma", "mz", "na", "ne", "ng", "re", "rw", "sh", "st", "sn", "sc",
    "sl", "so", "za", "ss", "sd", "tz", "tg", "tn", "ug", "eh", "zm", "zw",
    "fr.may", "fr.reu"
  ],
  "oceania": [
    "as", "au", "cx", "cc", "ck", "fj", "pf", "gu", "hm", "ki", "mh", "fm", "nr", "nc", "nz", "nu",
    "nf", "mp", "pw", "pg", "pn", "ws", "sb", "tk", "to", "tv", "um", "vu", "wf",
    "fr.nca"
  ],
  "americas": [
    "ai", "ag", "ar", "aw", "bs", "bb", "bz", "bm", "bo", "bq", "bv", "br", "ca", "ky", "cl", "co",
    "cr", "cu", "cw", "dm", "do", "ec", "sv", "fk", "gf", "gl", "gd", "gp", "gt", "gy", "ht", "hn",
    "jm", "mq", "mx", "ms", "ni", "pa", "py", "pe", "pr", "bl", "kn", "lc", "mf", "pm", "vc", "sx",
    "gs", "sr", "tt", "tc", "us", "uy", "ve", "vg", "vi",
    "uk.British Virgin Islands", "uk.Anguila", "uk.Montserrat", "uk.Cayman Islands", "uk.Turk and Caicos Islands",
    "uk.Bermuda",
    "nl.Curacao", "nl.Bonaire, Sint Eustatius and Saba", "nl.Sint Maarten",
    "fr.mar", "fr.gua", "fr.sma", "fr.sba",
    "uk.Falkland Islands (Malvinas)", "fr.guy"
  ],

  "middleeast": [
    "af", "bh", "dj", "eg", "ir", "iq", "jo", "kw", "lb", "ly", "ma", "om", "pk", "qa", "sa", "so",
    "sd", "ss", "sy", "tn", "ae", "ye"
  ],

  "seasia": [
    "bd", "bt", "in", "id", "mv", "mm", "np", "lk", "th", "tl"
  ],

  "asia_southern": ["af", "bd", "bt", "in", "ir", "mv", "np", "pk", "lk"],
  "asia_southeastern": ["bn", "kh", "id", "la", "my", "mm", "ph", "sg", "th", "tl", "vn"],
  "asia_eastern": ["cn", "hk", "jp", "kp", "kr", "mo", "mn", "tw"],
  "asia_western": [
    "am", "az", "bh", "cy", "ge", "iq", "il", "jo", "kw", "lb", "om", "ps", "qa", "sa", "sy", "tr",
    "ae", "ye"
  ],
  "asia_central": ["kz", "kg", "tj", "tm", "uz"],

  "oceania_ausnz": ["au", "cx", "cc", "hm", "nz", "nf"],
  "oceania_melanesia": ["fj", "nc", "pg", "sb", "vu", "fr.nca"],
  "oceania_micronesia": ["gu", "ki", "mh", "fm", "nr", "mp", "pw", "um"],
  "oceania_polynesia": ["as", "ck", "pf", "nu", "pn", "ws", "tk", "to", "tv", "wf"],

  "europe_northern": ["ax", "dk", "ee", "fo", "fi", "gg", "is", "ie", "im", "je", "lv", "lt", "no", "sj", "se", "gb"],
  "europe_southern": [
    "al", "ad", "ba", "hr", "gi", "gr", "va", "it", "mt", "me", "mk", "pt", "sm", "rs", "si", "es", "uk.Gibraltar"
  ],
  "europe_western": ["at", "be", "fr", "de", "li", "lu", "mc", "nl", "ch"],
  "europe_eastern": ["by", "bg", "cz", "hu", "md", "pl", "ro", "ru", "sk", "ua"],

  "america_northern": ["bm", "ca", "gl", "pm", "us"],
  "america_latamcarib": [
    "ai", "ag", "ar", "aw", "bs", "bb", "bz", "bo", "bq", "bv", "br", "ky", "cl", "co", "cr", "cu",
    "cw", "dm", "do", "ec", "sv", "fk", "gf", "gd", "gp", "gt", "gy", "ht", "hn", "jm", "mq", "mx",
    "ms", "ni", "pa", "py", "pe", "pr", "bl", "kn", "lc", "mf", "vc", "sx", "gs", "sr", "tt", "tc",
    "uy", "ve", "vg", "vi"
  ],

  "america_caribbean": [
    "ai", "ag", "aw", "bs", "bb", "bq", "ky", "cu", "cw", "dm", "do", "gd", "gp", "ht", "jm", "mq",
    "ms", "pr", "bl", "kn", "lc", "mf", "vc", "sx", "tt", "tc", "vg", "vi",
    "uk.British Virgin Islands", "uk.Anguila", "uk.Montserrat", "uk.Cayman Islands", "uk.Turk and Caicos Islands",
    "uk.Bermuda",
    "nl.Curacao", "nl.Bonaire, Sint Eustatius and Saba", "nl.Sint Maarten",
    "fr.mar", "fr.gua", "fr.sma", "fr.sba"
  ],
  "america_south": [
    "ar", "bo", "bv", "br", "cl", "co", "ec", "fk", "gf", "gy", "py", "pe", "gs", "sr", "uy", "ve",
    "uk.Falkland Islands (Malvinas)", "fr.guy"
  ],
  "america_central": ["bz", "cr", "sv", "gt", "hn", "mx", "ni", "pa"],

  "america_latam": [
    "ar", "bo", "br", "cl", "co", "ec", "py", "pe", "uy", "ve", "cr", "sv", "gt", "hn", "mx", "ni", "pa", "cu", "pr", "do", "ht"
  ],

  "africa_northern": ["dz", "eg", "ly", "ma", "sd", "tn", "eh"],
  "africa_subsaharan": [
    "ao", "bj", "bw", "io", "bf", "bi", "cv", "cm", "cf", "td", "km", "cg", "cd", "ci", "dj", "gq",
    "er", "sz", "et", "tf", "ga", "gm", "gh", "gn", "gw", "ke", "ls", "lr", "mg", "mw", "ml", "mr",
    "mu", "yt", "mz", "na", "ne", "ng", "re", "rw", "sh", "st", "sn", "sc", "sl", "so", "za", "ss",
    "tz", "tg", "ug", "zm", "zw",
    "fr.may", "fr.reu"
  ],

  "africa_subsaharan_western": [
    "bj", "bf", "cv", "ci", "gm", "gh", "gn", "gw", "lr", "ml", "mr", "ne", "ng", "sh", "sn", "sl", "tg"
  ],
  "africa_southern_western": ["bw", "sz", "ls", "na", "za"],
  "africa_subsaharan_eastern": [
    "io", "bi", "km", "dj", "er", "et", "tf", "ke", "mg", "mw", "mu", "yt", "mz", "re", "rw", "sc", "so", "ss", "tz", "ug", "zm", "zw",
    "fr.may", "fr.reu"
  ],
}
