import countryByAbbreviation from 'country-json/src/country-by-abbreviation' // https://github.com/samayo/country-json/blob/master/src/country-by-abbreviation.json
import countryByPopulation from 'country-json/src/country-by-population' // https://github.com/samayo/country-json/blob/master/src/country-by-abbreviation.json

import countryNamesES from '../../locales/es/countries.es.json'

import { US_STATES_BY_CODE } from '../../data/geoData'
import { OUTBREAK_ATTRIBUTES } from '../../data/outbreakInfo'

let nameToCodeIndex = {
  'Taiwan': 'tw',
  'Taiwan*': 'tw',
  'Holy See': 'va',
  'occupied Palestinian territory': 'ps',
  'West Bank and Gaza': 'ps',
  'Czechia': 'cz',
  'Korea, South': 'kr',
  'Congo (Kinshasa)': 'cg',
  'Russia': 'ru',
  'Cote d\'Ivoire': 'ci',
  'Cabo Verde': 'cv',
  'East Timor': 'tl',
  'Kosovo': 'xk',
  'Fiji': 'fj',
  'Eswatini': 'sz',
  'United Kingdom': 'uk',
  'Libya': 'ly',
  'Burma': 'mm', // Myanmar

  'Spain > Andalusia': 'es.and',
  'Spain > Aragon': 'es.ara',
  'Spain > Asturias': 'es.ast',
  'Spain > Baleares': 'es.bal',
  'Spain > Canarias': 'es.can',
  'Spain > Cantabria': 'es.cnt',
  'Spain > Castilla - La Mancha': 'es.cma',
  'Spain > Castilla y Leon': 'es.cle',
  'Spain > Catalonia': 'es.cat',
  'Spain > Ceuta': 'es.ceu',
  'Spain > C. Valenciana': 'es.val',
  'Spain > Extremadura': 'es.ext',
  'Spain > Galicia': 'es.gal',
  'Spain > Madrid': 'es.mad',
  'Spain > Melilla': 'es.mel',
  'Spain > Murcia': 'es.mur',
  'Spain > Navarra': 'es.nav',
  'Spain > Pais Vasco': 'es.pva',
  'Spain > La Rioja': 'es.rio',

  'Cruise Ship > Diamond Princess': 'other.diamond_princess',
  'Grand Princess': 'other.grand_princess',
  'MS Zaandam': 'other.ms_zaandam',

  'Netherlands > Aruba': 'aw',

  'US > New York City': 'us.nyc',

  'Canada > Alberta': 'ca.ab',
  'Canada > British Columbia': 'ca.bc',
  'Canada > Manitoba': 'ca.mb',
  'Canada > New Brunswick': 'ca.nb',
  'Canada > Newfoundland and Labrador': 'ca.nl',
  'Canada > Northwest Territories': 'ca.nt',
  'Canada > Nova Scotia': 'ca.ns',
  'Canada > Nunavut': 'ca.nu',
  'Canada > Ontario': 'ca.on',
  'Canada > Prince Edward Island': 'ca.pe',
  'Canada > Quebec': 'ca.qc',
  'Canada > Saskatchewan': 'ca.sk',
  'Canada > Yukon': 'ca.yt',

  'Australia > Northern Territory': 'au.nt',
  'Australia > Western Australia': 'au.wa',
  'Australia > South Australia': 'au.sa',
  'Australia > Victoria': 'au.vic',
  'Australia > Queensland': 'au.qld',
  'Australia > New South Wales': 'au.nsw',
  'Australia > Australian Capital Territory': 'au.act',
  'Australia > Tasmania': 'au.tas',

  'Italy > Abruzzo': 'it.abr',
  'Italy > Basilicata': 'it.bas',
  'Italy > P.A. Bolzano': 'it.bol',
  'Italy > Calabria': 'it.cal',
  'Italy > Campania': 'it.cam',
  'Italy > Emilia-Romagna': 'it.emi',
  'Italy > Friuli Venezia Giulia': 'it.fvg',
  'Italy > Lazio': 'it.laz',
  'Italy > Liguria': 'it.lig',
  'Italy > Lombardia': 'it.lom',
  'Italy > Marche': 'it.mar',
  'Italy > Molise': 'it.mol',
  'Italy > Piemonte': 'it.pie',
  'Italy > Puglia': 'it.pug',
  'Italy > Sardegna': 'it.sar',
  'Italy > Sicilia': 'it.sic',
  'Italy > Toscana': 'it.tos',
  'Italy > P.A. Trento': 'it.tre',
  'Italy > Umbria': 'it.umb',
  'Italy > Valle d\'Aosta': 'it.vda',
  'Italy > Veneto': 'it.ven',

  'France > Auvergne-Rhône-Alpes': 'fr.ara',
  'France > Bourgogne-Franche-Comté': 'fr.bfc',
  'France > Bretagne': 'fr.bre',
  'France > Centre-Val de Loire': 'fr.cvl',
  'France > Corse': 'fr.cor',
  'France > Grand Est': 'fr.est',
  'France > Hauts-de-France': 'fr.hdf',
  'France > Île-de-France': 'fr.idf',
  'France > Normandie': 'fr.nor',
  'France > Nouvelle-Aquitaine': 'fr.naq',
  'France > Occitanie': 'fr.occ',
  'France > Pays de la Loire': 'fr.loi',
  'France > Provence-Alpes-Côte d\'Azur': 'fr.pac',
  'France > Guadeloupe': 'fr.gua',
  'France > Saint-Barthélémy': 'fr.sba',
  'France > Saint-Martin': 'fr.sma',
  'France > Martinique': 'fr.mar',
  'France > Guyane': 'fr.guy',
  'France > La Réunion': 'fr.reu',
  'France > Mayotte': 'fr.may',
  'France > Nouvelle-Calédonie': 'fr.nca',

  'UK > England': 'uk.gb.en',
  'UK > Northern Ireland': 'uk.gb.nir',
  'UK > Scotland': 'uk.gb.sc',
  'UK > Wales': 'uk.gb.wl',
  'UK': 'uk.gb',

  'Germany > Baden-Wurttemberg': 'de.bwu',
  'Germany > Bayern': 'de.bay',
  'Germany > Berlin': 'de.ber',
  'Germany > Brandenburg': 'de.bra',
  'Germany > Bremen': 'de.bre',
  'Germany > Hamburg': 'de.ham',
  'Germany > Hessen': 'de.hes',
  'Germany > Mecklenburg-Vorpommern': 'de.mvo',
  'Germany > Niedersachsen': 'de.nie',
  'Germany > Nordrhein-Westfalen': 'de.nwe',
  'Germany > Rheinland-Pfalz': 'de.rpf',
  'Germany > Saarland': 'de.saa',
  'Germany > Sachsen': 'de.sac',
  'Germany > Sachsen-Anhalt': 'de.san',
  'Germany > Schleswig-Holstein': 'de.sho',
  'Germany > Thuringen': 'de.thu',
  'Germany > Unknown': 'de.unk',

  'Mexico > Aguascalientes': 'mx.agu',
  'Mexico > Baja California': 'mx.bca',
  'Mexico > Baja California Sur': 'mx.bcs',
  'Mexico > Campeche': 'mx.cam',
  'Mexico > Chiapas': 'mx.chi',
  'Mexico > Chihuahua': 'mx.chh',
  'Mexico > Ciudad de Mexico': 'mx.cdmx',
  'Mexico > Coahuila': 'mx.coa',
  'Mexico > Colima': 'mx.col',
  'Mexico > Durango': 'mx.dur',
  'Mexico > Guanajuato': 'mx.gua',
  'Mexico > Guerrero': 'mx.gue',
  'Mexico > Hidalgo': 'mx.hid',
  'Mexico > Jalisco': 'mx.jal',
  'Mexico > Mexico': 'mx.mex',
  'Mexico > Michoacan': 'mx.mic',
  'Mexico > Morelos': 'mx.mor',
  'Mexico > Nayarit': 'mx.nay',
  'Mexico > Nuevo Leon': 'mx.nle',
  'Mexico > Oaxaca': 'mx.oax',
  'Mexico > Puebla': 'mx.pue',
  'Mexico > Queretaro': 'mx.que',
  'Mexico > Quintana Roo': 'mx.qro',
  'Mexico > San Luis Potosi': 'mx.slp',
  'Mexico > Sinaloa': 'mx.sin',
  'Mexico > Sonora': 'mx.son',
  'Mexico > Tabasco': 'mx.tab',
  'Mexico > Tamaulipas': 'mx.tam',
  'Mexico > Tlaxcala': 'mx.tla',
  'Mexico > Veracruz': 'mx.ver',
  'Mexico > Yucatan': 'mx.yuc',
  'Mexico > Zacatecas': 'mx.zac',
}

let codeToNameIndex = {
  'other.diamond_princess': 'Diamond Princess',
  'other.grand_princess': 'Grand Princess',
  'other.ms_zaandam': 'MS Zaandam',
  'cn.hubei': 'China: Hubei',
  'cn.other': 'China: Other',
  'tw': 'Taiwan',
  'ru': 'Russia',
  'ci': 'Cote d\'Ivoire',
  'cv': 'Cabo Verde',
  'tl': 'East Timor',
  'xk': 'Kosovo',
  'sz': 'Eswatini',
  'uk': 'United Kingdom',
  'ly': 'Libya',
  'cz': 'Czechia',

  'us.nyc': 'USA: New York City',

  'ca.ab': 'Canada: Alberta',
  'ca.bc': 'Canada: British Columbia',
  'ca.mb': 'Canada: Manitoba',
  'ca.nb': 'Canada: New Brunswick',
  'ca.nl': 'Canada: Newfoundland and Labrador',
  'ca.nt': 'Canada: Northwest Territories',
  'ca.ns': 'Canada: Nova Scotia',
  'ca.nu': 'Canada: Nunavut',
  'ca.on': 'Canada: Ontario',
  'ca.pe': 'Canada: Prince Edward Island',
  'ca.qc': 'Canada: Quebec',
  'ca.sk': 'Canada: Saskatchewan',
  'ca.yt': 'Canada: Yukon',

  'au.nt':  'Australia: Northern Territory',
  'au.wa':  'Australia: Western Australia',
  'au.sa':  'Australia: South Australia',
  'au.vic': 'Australia: Victoria',
  'au.qld': 'Australia: Queensland',
  'au.nsw': 'Australia: New South Wales',
  'au.act': 'Australia: Capital Territory',
  'au.tas': 'Australia: Tasmania',

  'es.and': 'Spain: Andalucía',
  'es.ara': 'Spain: Aragón',
  'es.ast': 'Spain: Asturias',
  'es.bal': 'Spain: Baleares',
  'es.can': 'Spain: Canarias',
  'es.cnt': 'Spain: Cantabria',
  'es.cma': 'Spain: Castilla-La Mancha',
  'es.cle': 'Spain: Castilla y León',
  'es.cat': 'Spain: Cataluña',
  'es.ceu': 'Spain: Ceuta',
  'es.val': 'Spain: C. Valenciana',
  'es.ext': 'Spain: Extremadura',
  'es.gal': 'Spain: Galicia',
  'es.mad': 'Spain: Madrid',
  'es.mel': 'Spain: Melilla',
  'es.mur': 'Spain: Murcia',
  'es.nav': 'Spain: Navarra',
  'es.pva': 'Spain: País Vasco',
  'es.rio': 'Spain: La Rioja',

  'it.abr': 'Italy: Abruzzo',
  'it.bas': 'Italy: Basilicata',
  'it.bol': 'Italy: P.A. Bolzano',
  'it.cal': 'Italy: Calabria',
  'it.cam': 'Italy: Campania',
  'it.emi': 'Italy: Emilia-Romagna',
  'it.fvg': 'Italy: Friuli Venezia Giulia',
  'it.laz': 'Italy: Lazio',
  'it.lig': 'Italy: Liguria',
  'it.lom': 'Italy: Lombardia',
  'it.mar': 'Italy: Marche',
  'it.mol': 'Italy: Molise',
  'it.pie': 'Italy: Piemonte',
  'it.pug': 'Italy: Puglia',
  'it.sar': 'Italy: Sardegna',
  'it.sic': 'Italy: Sicilia',
  'it.tos': 'Italy: Toscana',
  'it.tre': 'Italy: P.A. Trento',
  'it.umb': 'Italy: Umbria',
  'it.vda': 'Italy: Valle d\'Aosta',
  'it.ven': 'Italy: Veneto',

  'fr.ara': 'France: Auvergne-Rhône-Alpes',
  'fr.bfc': 'France: Bourgogne-Franche-Comté',
  'fr.bre': 'France: Bretagne',
  'fr.cvl': 'France: Centre-Val de Loire',
  'fr.cor': 'France: Corse',
  'fr.est': 'France: Grand Est',
  'fr.hdf': 'France: Hauts-de-France',
  'fr.idf': 'France: Île-de-France',
  'fr.nor': 'France: Normandie',
  'fr.naq': 'France: Nouvelle-Aquitaine',
  'fr.occ': 'France: Occitanie',
  'fr.loi': 'France: Pays de la Loire',
  'fr.pac': 'France: Provence-Alpes-Côte d\'Azur',
  'fr.gua': 'France: Guadeloupe',
  'fr.sba': 'France: Saint-Barthélémy',
  'fr.sma': 'France: Saint-Martin',
  'fr.mar': 'France: Martinique',
  'fr.guy': 'France: Guyane',
  'fr.reu': 'France: La Réunion',
  'fr.may': 'France: Mayotte',
  'fr.nca': 'France: Nouvelle-Calédonie',

  'uk.gb.en': 'UK: England',
  'uk.gb.nir': 'UK: Northern Ireland',
  'uk.gb.sc': 'UK: Scotland',
  'uk.gb.wl': 'UK: Wales',
  'uk.gb': 'UK: Great Britain',

  'de.bwu': 'Germany: Baden-Wurttemberg',
  'de.bay': 'Germany: Bayern',
  'de.ber': 'Germany: Berlin',
  'de.bra': 'Germany: Brandenburg',
  'de.bre': 'Germany: Bremen',
  'de.ham': 'Germany: Hamburg',
  'de.hes': 'Germany: Hessen',
  'de.mvo': 'Germany: Mecklenburg-Vorpommern',
  'de.nie': 'Germany: Niedersachsen',
  'de.nwe': 'Germany: Nordrhein-Westfalen',
  'de.rpf': 'Germany: Rheinland-Pfalz',
  'de.saa': 'Germany: Saarland',
  'de.sac': 'Germany: Sachsen',
  'de.san': 'Germany: Sachsen-Anhalt',
  'de.sho': 'Germany: Schleswig-Holstein',
  'de.thu': 'Germany: Thuringen',
  'de.unk': 'Germany: Unknown',

  'mx.agu': 'Mexico > Aguascalientes',
  'mx.bca': 'Mexico > Baja California',
  'mx.bcs': 'Mexico > Baja California Sur',
  'mx.cam': 'Mexico > Campeche',
  'mx.chi': 'Mexico > Chiapas',
  'mx.chh': 'Mexico > Chihuahua',
  'mx.cdmx': 'Mexico > Ciudad de Mexico',
  'mx.coa': 'Mexico > Coahuila',
  'mx.col': 'Mexico > Colima',
  'mx.dur': 'Mexico > Durango',
  'mx.gua': 'Mexico > Guanajuato',
  'mx.gue': 'Mexico > Guerrero',
  'mx.hid': 'Mexico > Hidalgo',
  'mx.jal': 'Mexico > Jalisco',
  'mx.mex': 'Mexico > Mexico',
  'mx.mic': 'Mexico > Michoacan',
  'mx.mor': 'Mexico > Morelos',
  'mx.nay': 'Mexico > Nayarit',
  'mx.nle': 'Mexico > Nuevo Leon',
  'mx.oax': 'Mexico > Oaxaca',
  'mx.pue': 'Mexico > Puebla',
  'mx.que': 'Mexico > Queretaro',
  'mx.qro': 'Mexico > Quintana Roo',
  'mx.slp': 'Mexico > San Luis Potosi',
  'mx.sin': 'Mexico > Sinaloa',
  'mx.son': 'Mexico > Sonora',
  'mx.tab': 'Mexico > Tabasco',
  'mx.tam': 'Mexico > Tamaulipas',
  'mx.tla': 'Mexico > Tlaxcala',
  'mx.ver': 'Mexico > Veracruz',
  'mx.yuc': 'Mexico > Yucatan',
  'mx.zac': 'Mexico > Zacatecas',
}

countryByAbbreviation.forEach(row => {
  let code = row.abbreviation.toLowerCase()
  nameToCodeIndex[row.country] = nameToCodeIndex[row.country] || code
  codeToNameIndex[code] = codeToNameIndex[code] || row.country
})

Object.keys(US_STATES_BY_CODE).forEach(key => {
  let code = `us.${key.toLowerCase()}`
  nameToCodeIndex[`US > ${US_STATES_BY_CODE[key]}`] = code
  codeToNameIndex[code] = `USA: ${US_STATES_BY_CODE[key]}`
})
nameToCodeIndex = {...nameToCodeIndex, ...{ // Overrides post-data loding
  'US > Puerto Rico': 'pr',
  'US > Guam': 'us.gu',
  'US > American Samoa': 'us.as',
  'US > Northern Mariana Islands': 'us.mp',
  'US > US Virgin Islands': 'us.vi',
  'US > Washington, D.C.': 'us.dc',
  'US > District of Columbia': 'us.dc',
  'US > Virgin Islands, U.S.': 'us.vi',
  'US > United States Virgin Islands': 'us.vi',
  'US > US': 'ignore',
  'Spain > Unknown': 'ignore',
}}
codeToNameIndex = {...codeToNameIndex, ...{ // Overrides post-data loding
  'us.wa': 'USA: Washington State',
  'us.ny': 'USA: New York State',
  'us.dc': 'USA: District of Columbia',
  'us.vi': 'USA: Virgin Islands',
  'us.gu': 'USA: Guam',
  'us.mp': 'USA: Northern Mariana Islands',
  'us.as': 'USA: American Samoa'
}}

let codeToPopulationIndex = {}
countryByPopulation.forEach(row => {
  codeToPopulationIndex[nameToCodeIndex[row.country]] = row.population
})

export const CSSE_AGGREGATE = {
  'other.US > Diamond Princess': 'other.diamond_princess',
  'other.Diamond Princess': 'other.diamond_princess',
  'au.From Diamond Princess': 'other.diamond_princess',
  'other.US > Grand Princess': 'other.grand_princess',

  'au.': 'au',
  // 'ca.': 'ca',
  'de.': 'de',
  'br.': 'br',
  'cl.': 'cl',
  'mx.': 'mx'
}

/* Rows that started under one name and now continue under another */
export const CSSE_OVERLAY = {
  'other.Congo (Brazzaville)': 'cg',
  'other.Republic of the Congo': 'cg',

  'other.Gambia, The': 'gm',
  'other.The Gambia': 'gm',
  'other.Bahamas, The': 'bs',
  'other.The Bahamas': 'bs',

  'other.Mayotte': 'fr.Mayotte',
  'other.French Guiana': 'fr.French Guiana',
  'yt': 'fr.Mayotte',
  'gf': 'fr.French Guiana',
  're': 'fr.Reunion',

  'dk.Greenland': 'gl',
  'us.Guam': 'gu'
}

export const CSSE_TOTALIZE = {
  // 'fr.': 'fr',
  // 'es.': 'es',
  // 'it.': 'it',
  'ca.': 'ca',
  // 'au.': 'au',
  // 'de.': 'de',
}

export function countryForCSSEName(name) {
  if (nameToCodeIndex[name]) {
    return nameToCodeIndex[name]
  }

  let parts = name.match(/^(.+) > (\1)$/)
  if (parts) {
    return nameToCodeIndex[parts[1]]
  }

  if (name.match(/> ignore/)) {
    return 'ignore'
  }

  // CSSE Used to have data for counties and some cities, but that should be ignored now
  parts = name.match(/US > (.*), (\w\w)/)
  if (parts && US_STATES_BY_CODE[parts[2]]) {
    return false
  }

  parts = name.match(/China > (.*)/)
  if (parts) {
    return `cn.${parts[1].toLowerCase()}`
  }

  parts = name.match(/^(.*) > (.*)$/)
  if (parts && nameToCodeIndex[parts[1]]) {
    return `${nameToCodeIndex[parts[1]]}.${parts[2]}`
  }

  return `other.${name}`
}

const UNICODE_REGIONAL_INDICATOR_SYMBOL_OFFSET = 127397 - 32 // offset between lowercase ascii and regional indicator symbols

export function attributesForCountry(code) {
  let attrs = {}
  let parts = code.split('.')

  if (parts[0].length === 2) {
    attrs.emoji = String.fromCodePoint(
      parts[0].charCodeAt(0) + UNICODE_REGIONAL_INDICATOR_SYMBOL_OFFSET,
      parts[0].charCodeAt(1) + UNICODE_REGIONAL_INDICATOR_SYMBOL_OFFSET
    )
  }
  attrs.codeCountry = parts[0]
  attrs.codeSubCountry = parts[1]

  attrs.name = codeToNameIndex[code]
  attrs.esName = countryNamesES[code]

  if (parts[0] !== 'other') {
    attrs.name = attrs.name || (`${codeToNameIndex[parts[0]]}: ${parts[1]}`)
  }

  if (codeToPopulationIndex[code]) {
    attrs.population = Math.round(codeToPopulationIndex[code] / 1000000)
  }

  let links = {}, keyDates = {}
  if (OUTBREAK_ATTRIBUTES[parts[0]]) {
    attrs.emoji = OUTBREAK_ATTRIBUTES[parts[0]].emoji || attrs.emoji
    links = {...OUTBREAK_ATTRIBUTES[parts[0]].links, ...links}
    keyDates = {...OUTBREAK_ATTRIBUTES[parts[0]].keyDates, ...keyDates}
  }
  if (OUTBREAK_ATTRIBUTES[code]) {
    attrs.emoji = OUTBREAK_ATTRIBUTES[code].emoji || attrs.emoji
    links = {...OUTBREAK_ATTRIBUTES[code].links, ...links}
    keyDates = {...OUTBREAK_ATTRIBUTES[code].keyDates, ...keyDates}
  }

  return {
    ...attrs,
    links: links === {} ? undefined : links,
    keyDates: keyDates === {} ? undefined : keyDates
  }
}

export function findTotalizationMapping (code) {
  const parts = code.split('.')
  if (parts[1]) {
    return CSSE_TOTALIZE[`${parts[0]}.`] || CSSE_TOTALIZE[code]
  } else {
    return CSSE_TOTALIZE[parts[0]]
  }
}

export function findAggregateMapping (code) {
if (code.match(/de\./)) debugger
  const parts = code.split('.')
  if (parts[1]) {
    if (parts[0] === 'cn') {
      if (parts[1] === 'hubei') {
        return 'cn.hubei'
      } else {
        return 'cn.other'
      }
    } else {
      return CSSE_AGGREGATE[`${parts[0]}.`] || CSSE_AGGREGATE[code]
    }
  } else {
    return CSSE_AGGREGATE[parts[0]]
  }
}

export function findOverlayMapping (code) {
  if (CSSE_OVERLAY[code]) {
    return [CSSE_OVERLAY[code]]
  }

  return false
}
