export const OUTBREAK_ATTRIBUTES = {
  'cn': { // China
    links: { 'Official Reports': 'http://en.nhc.gov.cn/news.html',
            'Wikipedia': 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China' }
  },
  'tw': { // Taiwan
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Taiwan' }
  },
  'jp': { // Japan
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Japan' }
  },
  'kr': { // South Korea
    links: { 'Official Reports': 'https://www.cdc.go.kr/board/board.es?mid=a30402000000&bid=0030',
            'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_South_Korea' }
  },
  'sg': { // Singapore
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Singapore' }
  },
  'my': { // Malasya
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Malaysia'}
  },

  'in': { // India
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_India' }
  },

  'ca': { // Canada
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Canada' }
  },

  'us': {
    links: { 'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }
  },
  'us.wa': {
    links: { 'WA State Dept. of Health': 'https://www.doh.wa.gov/Emergencies/Coronavirus',
             'Wikipedia WA': 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Washington_(state)',
             'Wikipedia US': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }
  },
  'us.ca': {
    links: { 'CA Dept. Public of Health': 'https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/nCoV2019.aspx',
             'Wikipedia CA': 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_California',
             'Wikipedia US': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' },
    keyDates: {
      death1: '',
      death10: '',
      death50: '',
      death250: '',
      localSchoolClosings: '',
      wideSchoolClosings: '3/16/20',
      localLockdown: '3/9/20', // Widespread work from home
      wideLockdown: '3/15/20', // Restaurants closed
      fullLockdown: '3/17/20', // Shelter-in-place order
    }
  },
  'us.ny': {
    links: { 'NY Dept. of Health': 'https://www.health.ny.gov/diseases/communicable/coronavirus/',
             'Wikipedia NY': 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_New_York_(state)',
             'Wikipedia US': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' },
    keyDates: {
      death1: '3/14/20',
      death10: '3/16/20',
      death50: '3/21/20',
      death250: '',
      localSchoolClosings: '3/07/20',
      wideSchoolClosings: '3/14/20',
      localLockdown: '3/10/20', // Limited movement in New Rochelle, calls to social distance
      wideLockdown: '3/17/20', // Limited movement in most areas, restaurants closed
      fullLockdown: '3/22/20', // Only essential services
    }
  },
  'us.fl': {
    keyDates: {
      death1: '',
      death10: '',
      death50: '',
      death250: '',
      localSchoolClosings: '',
      wideSchoolClosings: '',
      localLockdown: '3/9/20', // Widespread work from home
      wideLockdown: '3/18/20', // Restaurants closed
      fullLockdown: '', // Shelter-in-place order
    }
  },

  'ir': { // Iran
    links: { 'Islamic Republic News Agency': 'https://en.irna.ir/service/news',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iran' }
  },
  'iq': { // Iraq
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iraq' }
  },
  'ae': { // United Arab Emirates
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Arab_Emirates' }
  },
  'eg': { // Egypt
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Egypt' }
  },

  'au': { // Australia
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Australia' }
  },

  'it': { // Italy
    links: { 'Protezione Civile': 'http://www.protezionecivile.gov.it/media-communication/press-release',
             '@dpcgov': 'https://twitter.com/dpcgov',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Italy' },
    keyDates: {
      death1: '2/21/20',
      death10: '2/25/20',
      death50: '3/2/20',
      death250: '3/8/20',
      localSchoolClosings: '02/22/20',
      wideSchoolClosings: '03/04/20',
      localLockdown: '03/08/20', // Limited movement in some areas
      wideLockdown: '03/09/20', // Limited movement in most areas
      fullLockdown: '03/11/20', // Only essential services
    }
  },

  'es': { // Spain
    links: { 'Ministerio de Sanidad': 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/situacionActual.htm',
             'RTVE': 'https://www.rtve.es/noticias/20200314/mapa-del-coronavirus-espana/2004681.shtml',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Spain' },
    keyDates: {
      death1: '3/3/20',
      death10: '3/7/20',
      death50: '3/9/20',
      death250: '3/15/20',
      localSchoolClosings: '03/09/20',
      wideSchoolClosings: '03/12/20',
      localLockdown: '03/08/20', // Limited movement in some areas
      wideLockdown: '03/14/20', // Limited movement in most areas
      fullLockdown: '03/15/20', // Only essential services
    }
  },

  'fr': { // France
    links: { 'Santé publique France': 'https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_France' },
    keyDates: {
      death1: '2/26/20',
      death10: '3/7/20',
      death50: '3/12/20',
      death250: '3/18/20',
      localSchoolClosings: '',
      wideSchoolClosings: '03/16/20',
      localLockdown: '', // Limited movement in some areas
      wideLockdown: '03/17/20', // Limited movement in most areas
      fullLockdown: '', // Only essential services
    }
  },

  'gb': { // United Kingdom
    links: { 'Gov.uk': 'https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public',
             '@DHSCgovuk': 'https://twitter.com/DHSCgovuk',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Kingdom' },
    keyDates: {
      death1: '3/5/20',
      death10: '3/12/20',
      death50: '3/16/20',
      death250: '3/22/20',
      localSchoolClosings: '03/11/20',
      wideSchoolClosings: '03/20/20',
      localLockdown: '03/16/20', // Limited movement in some areas, calls to social distance
      wideLockdown: '03/20/20', // Limited movement in most areas, restaurants closed
      fullLockdown: '', // Only essential services
    }
  },

  'ph': { // Philippines
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Philippines' }
  },

  'ch': { // Switzerland
    links: { 'Tribune de Geneva': 'https://interactif.tdg.ch/2020/covid-19-carte-suisse/',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Switzerland' }
  },

  'nl': { // Netherlands
    links: { 'Ministry of Health': 'https://www.rivm.nl/en/news/current-information-about-novel-coronavirus-covid-19',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Netherlands' }
  },
  'sm': { // San Marino
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_San_Marino' }
  },

  'de': { // Germany
    links: { 'Robert Koch Institut': 'https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Situationsberichte/Gesamt.html',
             'Berliner Morgenpost': 'https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/?fbclid=IwAR04HlqzakGaNssQzbz4d8o8R3gz0C910U8tvfYlBT6P0lVJJvHfk9uS2rc',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Germany' }
  },

  'se': { // Sweden
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Sweden' }
  },

  'be': { // Belgium
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Belgium' }
  },
  'at': { // Austria
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Austria' }
  },

  'other.diamond_princess': {
    displayName: 'Diamond Princess (out of Japan)',
    emoji: '🛳',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_on_cruise_ships#Diamond_Princess' }
  },
  'other.grand_princess': {
    displayName: 'Grand Princess (out of US)',
    emoji: '🛳'
  }
}

export const OLD_OUTBREAK_ATTRIBUTES = {
  'China': { emoji: '🇨🇳', region: 'asia',
    links: { 'Official Reports': 'http://en.nhc.gov.cn/news.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_outbreak_in_mainland_China' }},
  'China > Other': { esDisplayName: 'China > Otros' },
  'Taiwan': { emoji: '🇹🇼', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Taiwan' }},
  'Japan': { emoji: '🇯🇵', region: 'asia',
    esDisplayName: 'Japón',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Japan' }},
  'South Korea': { emoji: '🇰🇷', region: 'asia',
    esDisplayName: 'Corea del Sur',
    links: { 'Official Reports': 'https://www.cdc.go.kr/board/board.es?mid=a30402000000&bid=0030',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_South_Korea' }},
  'Singapore': { emoji: '🇸🇬', region: 'asia',
    esDisplayName: 'Singapur',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Singapore' }},
  'Malaysia': { emoji: '🇲🇾', region: 'asia',
    esDisplayName: 'Malasia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Malaysia'}},
  'Vietnam': { emoji: '🇻🇳', region: 'asia' },
  'Macau': { emoji: '🇲🇴', region: 'asia', esDisplayName: 'Macao' },
  'Cambodia': { emoji: '🇰🇭', region: 'asia', esDisplayName: 'Camboya' },
  'Kazakhstan': { emoji: '🇰🇿', region: 'asia', esDisplayName: 'Kazakstán' },
  'Laos': { emoji: '🇱🇦', region: 'asia' },
  'Brunei': { emoji: '🇧🇳', region: 'asia' },
  'Thailand': { emoji: '🇹🇭', region: 'asia', esDisplayName: 'Tailandia' },
  'Mongolia': { emoji: '🇲🇳', region: 'asia' },
  'Uzbekistan': { emoji: '🇺🇿', region: 'asia', esDisplayName: 'Uzbequistán' },
  'North Korea': { emoji: '🇰🇵', region: 'asia' },
  'Kyrgyzstan': { emoji: '🇰🇬', region: 'asia' },
  'Fiji': { emoji: '🇫🇯', region: 'asia' },

  /* South East Asia */
  'India': { emoji: '🇮🇳', region: 'asia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_India' }},
  'Bangladesh': { emoji: '🇧🇩', region: 'asia' },
  'Bhutan': { emoji: '🇧🇹', region: 'asia' },
  'East Timor': { emoji: '🇹🇱', region: 'asia' },
  'Sri Lanka': { emoji: '🇱🇰', region: 'asia' },
  'Indonesia': { emoji: '🇮🇩', region: 'asia' },
  'Maldives': { emoji: '🇲🇻', region: 'asia', esDisplayName: 'Maldivas' },
  'Myanmar': { emoji: '🇲🇲', region: 'asia' },
  'Nepal': { emoji: '🇳🇵', region: 'asia' },
  'Papua New Guinea': { emoji: '🇵🇬', region: 'asia' },

  'Canada': { emoji: '🇨🇦', region: 'americas',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Canada' }},
  'USA': { emoji: '🇺🇸', region: 'americas',
    links: { 'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},
  'USA > Washington': { emoji: '🇺🇸', region: 'americas', displayName: 'USA > Washington (Seattle)',
    links: { 'WA State Dept. of Health': 'https://www.doh.wa.gov/Emergencies/Coronavirus',
             'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},
  'USA > California': { emoji: '🇺🇸', region: 'americas',
    links: { 'CA Dept. Public of Health': 'https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/nCoV2019.aspx',
             'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},
  'USA > New York': { emoji: '🇺🇸', region: 'americas',
     links: { 'NY Dept. of Health': 'https://www.health.ny.gov/diseases/communicable/coronavirus/',
          'CDC': 'https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html',
          'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States' }},

  'Puerto Rico': { displayName: 'Puerto Rico', emoji: '🇵🇷', region: 'americas' },

  'Mexico': { emoji: '🇲🇽', region: 'americas', esDisplayName: 'México' },
  'Panama': { emoji: '🇵🇦', region: 'americas', esDisplayName: 'Panamá' },
  'Costa Rica': { emoji: '🇨🇷', region: 'americas' },
  'El Salvador': { emoji: '🇸🇻', region: 'americas' },
  'Honduras': { emoji: '🇭🇳', region: 'americas' },
  'Guatemala': { emoji: '🇬🇹', region: 'americas' },
  'Nicaragua': { emoji: '🇳🇮', region: 'americas' },
  'Belize': { emoji: '🇧🇿', region: 'americas' },
  'Dominican Republic': { emoji: '🇩🇴', region: 'americas', esDisplayName: 'República Dominicana' },
  'Martinique': { emoji: '🇲🇶', region: 'americas', esDisplayName: 'Martinica' },
  'Saint Martin': { emoji: '🇸🇽', region: 'americas' },
  'Saint Barthelemy': { emoji: '🇫🇷', region: 'americas' },
  'Jamaica': { emoji: '🇯🇲', region: 'americas' },
  'The Bahamas': { emoji: '🇧🇸', region: 'americas', esDisplayName: 'Las Bahamas' },
  'Cuba': { emoji: '🇨🇺', region: 'americas' },
  'Haiti': { emoji: '🇭🇹', region: 'americas', esDisplayName: 'Haití' },
  'Trinidad and Tobago': { emoji: '🇹🇹', region: 'americas', esDisplayName: 'Trinidad y Tobago' },
  'Aruba': { emoji: '🇦🇼', region: 'americas' },
  'Curacao': { emoji: '🇨🇼', region: 'americas' },
  'Saint Lucia': { emoji: '🇱🇨', region: 'americas' },
  'Saint Vincent and the Grenadines': { emoji: '🇻🇨', region: 'americas', esDisplayName: 'San Vicente y las Grenadinas' },
  'Antigua and Barbuda': { emoji: '🇦🇬', region: 'americas', esDisplayName: 'Antigua y Barbuda' },
  'Cayman Islands': { emoji: '🇰🇾', region: 'americas', esDisplayName: 'Islas Caimán' },
  'Guadeloupe': { emoji: '🇬🇵', region: 'americas', esDisplayName: 'Guadalupe' },
  'Barbados': { emoji: '🇧🇧', region: 'americas' },
  'Colombia': { emoji: '🇨🇴', region: 'americas' },
  'Venezuela': { emoji: '🇻🇪', region: 'americas' },
  'French Guiana': { emoji: '🇬🇫', region: 'americas', esDisplayName: 'Guyana Francesa' },
  'Guyana': { emoji: '🇬🇾', region: 'americas', esDisplayName: 'Guayana' },
  'Suriname': { emoji: '🇸🇷', region: 'americas', esDisplayName: 'Surinam' },
  'Brazil': { emoji: '🇧🇷', region: 'americas', esDisplayName: 'Brasil' },
  'Ecuador': { emoji: '🇪🇨', region: 'americas' },
  'Bolivia': { emoji: '🇧🇴', region: 'americas' },
  'Peru': { emoji: '🇵🇪', region: 'americas' },
  'Uruguay': { emoji: '🇺🇾', region: 'americas' },
  'Argentina': { emoji: '🇦🇷', region: 'americas' },
  'Paraguay': { emoji: '🇵🇾', region: 'americas' },
  'Chile': { emoji: '🇨🇱', region: 'americas' },


  'Iran (Islamic Republic of)': { emoji: '🇮🇷', region: 'middle east',
    displayName: 'Iran', esDisplayName: 'Irán',
    links: { 'Islamic Republic News Agency': 'https://en.irna.ir/service/news',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iran' }},
  'Israel': { emoji: '🇮🇱', region: 'middle east' },
  'Palestine': { emoji: '🇵🇸', region: 'middle east', esDisplayName: 'Palestina' },
  'Kuwait': { emoji: '🇰🇼', region: 'middle east' },
  'Iraq': { emoji: '🇮🇶', region: 'middle east',
    esDisplayName: 'Irak',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Iraq' }},
  'United Arab Emirates': { emoji: '🇦🇪', region: 'middle east',
    esDisplayName: 'Emiratos Árabes Unidos',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Arab_Emirates' }},
  'Lebanon': { emoji: '🇱🇧', region: 'middle east', esDisplayName: 'Líbano' },
  'Bahrain': { emoji: '🇧🇭', region: 'middle east' },
  'Egypt': { emoji: '🇪🇬', region: 'middle east',
    esDisplayName: 'Egipto',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Egypt' }},
  'Qatar': { emoji: '🇶🇦', region: 'middle east' },
  'Oman': { emoji: '🇴🇲', region: 'middle east' },
  'Saudi Arabia': { emoji: '🇸🇦', region: 'middle east', esDisplayName: 'Arabia Saudita' },
  'Pakistan': { emoji: '🇵🇰', region: 'middle east', esDisplayName: 'Paquistán' },
  'Afghanistan': { emoji: '🇦🇫', region: 'middle east', esDisplayName: 'Afganistán' },
  'Turkey': { emoji: '🇹🇷', region: 'middle east', esDisplayName: 'Turquía' },
  'Jordan': { emoji: '🇯🇴', region: 'middle east', esDisplayName: 'Jordania' },

  'Algeria': { emoji: '🇩🇿', region: 'africa' },
  'Senegal': { emoji: '🇸🇳', region: 'africa' },
  'South Africa': { emoji: '🇿🇦', region: 'africa', esDisplayName: 'Sudáfrica' },
  'Cameroon': { emoji: '🇨🇲', region: 'africa', esDisplayName: 'Camerún' },
  'Morocco': { emoji: '🇲🇦', region: 'africa', esDisplayName: 'Marruecos' },
  'Burkina Faso': { emoji: '🇧🇫', region: 'africa' },
  'Tunisia': { emoji: '🇹🇳', region: 'africa', esDisplayName: 'Tunez' },
  'Togo': { emoji: '🇹🇬', region: 'africa' },
  'Nigeria': { emoji: '🇳🇬', region: 'africa' },
  'Congo (Kinshasa)': { emoji: '🇨🇩', region: 'africa' },
  'Republic of the Congo': { emoji: '🇨🇬', region: 'africa', esDisplayName: 'República del Congo' },
  'Cote d\'Ivoire': { emoji: '🇨🇮', region: 'africa', esDisplayName: 'Costa de Marfil' },
  'Reunion': { emoji: '🇫🇷', region: 'africa', esDisplayName: 'Reunión' },
  'Somalia': { emoji: '🇸🇴', region: 'africa' },
  'Tanzania': { emoji: '🇹🇿', region: 'africa', esDisplayName: 'Tanzanía' },
  'Benin': { emoji: '🇧🇯', region: 'africa', esDisplayName: 'Benín' },
  'Liberia': { emoji: '🇱🇷', region: 'africa' },
  'Sudan': { emoji: '🇸🇩', region: 'africa', esDisplayName: 'Sudán' },
  'Ethiopia': { emoji: '🇪🇹', region: 'africa', esDisplayName: 'Etiopía' },
  'Guinea': { emoji: '🇬🇳', region: 'africa' },
  'The Gambia': { emoji: '🇬🇲', region: 'africa', esDisplayName: 'Gambia' },
  'Kenya': { emoji: '🇰🇪', region: 'africa' },
  'Ghana': { emoji: '🇬🇭', region: 'africa' },
  'Zimbabwe': { emoji: '🇿🇼', region: 'africa' },
  'Namibia': { emoji: '🇳🇦', region: 'africa' },
  'Seychelles': { emoji: '🇸🇨', region: 'africa' },
  'Uganda': { emoji: '🇺🇬', region: 'africa' },
  'Eritrea': { emoji: '🇪🇷', region: 'africa' },
  'Cape Verde': { emoji: '🇨🇻', region: 'africa' },
  'Eswatini': { emoji: '🇸🇿', region: 'africa' },
  'Gabon': { emoji: '🇬🇦', region: 'africa', esDisplayName: 'Gabón' },
  'Mauritania': { emoji: '🇲🇷', region: 'africa' },
  'Chad': { emoji: '🇹🇩', region: 'africa' },
  'Angola': { emoji: '🇦🇴', region: 'africa' },
  'Cabo Verde': { emoji: '🇨🇻', region: 'africa' },
  'Madagascar': { emoji: '🇲🇬', region: 'africa' },
  'Niger': { emoji: '🇳🇪', region: 'africa' },
  'Rwanda': { emoji: '🇷🇼', region: 'africa' },
  'Djibouti': { emoji: '🇩🇯', region: 'africa' },
  'Mauritius': { emoji: '🇲🇺', region: 'africa' },
  'Zambia': { emoji: '🇿🇲', region: 'africa' },
  'Central African Republic': { emoji: '🇨🇫', region: 'africa', esDisplayName: 'República Central Africana' },
  'Equatorial Guinea': { emoji: '🇬🇶', region: 'africa', esDisplayName: 'Guinea Ecuatorial' },

  'Australia': { emoji: '🇦🇺', region: 'oceania',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Australia' }},
  'New Zealand': { emoji: '🇳🇿', region: 'oceania', esDisplayName: 'Nueva Zelandia' },

  'Italy': { emoji: '🇮🇹', region: 'europe',
    esDisplayName: 'Italia',
    links: { 'Protezione Civile': 'http://www.protezionecivile.gov.it/media-communication/press-release',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Italy' }},
  'Spain': { emoji: '🇪🇸', region: 'europe',
    esDisplayName: 'España',
    links: { 'Ministerio de Sanidad': 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/situacionActual.htm',
             'RTVE': 'https://www.rtve.es/noticias/20200314/mapa-del-coronavirus-espana/2004681.shtml',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Spain' }},
  'Portugal': { emoji: '🇵🇹', region: 'europe' },
  'France': { emoji: '🇫🇷', region: 'europe',
    esDisplayName: 'Francia',
    links: { 'Santé publique France': 'https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_France' }},
  'United Kingdom': { emoji: '🇬🇧', region: 'europe',
    esDisplayName: 'Reino Unido',
    links: { 'Gov.uk': 'https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public',
             'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_Kingdom' }},
  'Philippines': { emoji: '🇵🇭', region: 'asia',
    esDisplayName: 'Filipinas',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Philippines' }},
  'Switzerland': { emoji: '🇨🇭', region: 'europe',
    esDisplayName: 'Suiza',
    links: {
      'Tribune de Geneva': 'https://interactif.tdg.ch/2020/covid-19-carte-suisse/',
      'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Switzerland'
    }},
  'Netherlands': { emoji: '🇳🇱', region: 'europe',
    esDisplayName: 'Holanda',
    links: {
      'Ministry of Health': 'https://www.rivm.nl/en/news/current-information-about-novel-coronavirus-covid-19',
      'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_Netherlands' }},
  'San Marino': { emoji: '🇸🇲', region: 'europe',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_San_Marino' }},
  'Germany': { emoji: '🇩🇪', region: 'europe',
    esDisplayName: 'Alemania',
    links: {
      'Robert Koch Institut': 'https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Situationsberichte/Gesamt.html',
      'Berliner Morgenpost': 'https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/?fbclid=IwAR04HlqzakGaNssQzbz4d8o8R3gz0C910U8tvfYlBT6P0lVJJvHfk9uS2rc',
      'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Germany' }},
  'Sweden': { emoji: '🇸🇪', region: 'europe',
    esDisplayName: 'Suecia',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_Sweden' }},
  'Belgium': { emoji: '🇧🇪', region: 'europe', esDisplayName: 'Bélgica' },
  'Ireland': { emoji: '🇮🇪', region: 'europe', esDisplayName: 'Irlanda' },
  'Russia': { emoji: '🇷🇺', region: 'europe', esDisplayName: 'Rusia' },
  'Poland': { emoji: '🇵🇱', region: 'europe', esDisplayName: 'Polonia' },
  'Slovenia': { emoji: '🇸🇮', region: 'europe', esDisplayName: 'Eslovenia' },
  'Georgia': { emoji: '🇬🇪', region: 'europe' },
  'Romania': { emoji: '🇷🇴', region: 'europe', esDisplayName: 'Rumania' },
  'Croatia': { emoji: '🇭🇷', region: 'europe', esDisplayName: 'Croacia' },
  'Estonia': { emoji: '🇪🇪', region: 'europe' },
  'Azerbaijan': { emoji: '🇦🇿', region: 'europe' },
  'Hungary': { emoji: '🇭🇺', region: 'europe', esDisplayName: 'Hungría' },
  'Armenia': { emoji: '🇦🇲', region: 'europe' },
  'Andorra': { emoji: '🇦🇩', region: 'europe' },
  'Belarus': { emoji: '🇧🇾', region: 'europe', esDisplayName: 'Belarusia' },
  'Latvia': { emoji: '🇱🇻', region: 'europe' },
  'Bulgaria': { emoji: '🇧🇬', region: 'europe' },
  'Finland': { emoji: '🇫🇮', region: 'europe', esDisplayName: 'Finlandia' },
  'Austria': { emoji: '🇦🇹', region: 'europe' },
  'Greece': { emoji: '🇬🇷', region: 'europe', esDisplayName: 'Grecia' },
  'Norway': { emoji: '🇳🇴', region: 'europe', esDisplayName: 'Noruega' },
  'Jersey': { emoji: '🇯🇪', region: 'europe' },
  'Guernsey': { emoji: '🇬🇬', region: 'europe' },
  'Montenegro': { emoji: '🇲🇪', region: 'europe' },
  'Iceland': { emoji: '🇮🇸', region: 'europe', esDisplayName: 'Islandia' },
  'Moldova': { emoji: '🇲🇩', region: 'europe' },
  'Kosovo': { emoji: '🇽🇰', region: 'europe' },
  'Denmark': { emoji: '🇩🇰', region: 'europe', esDisplayName: 'Dinamarca' },
  'Faroe Islands': { emoji: '🇫🇴', region: 'europe', esDisplayName: 'Islas Faroe' },
  'Czech Republic': { emoji: '🇨🇿', region: 'europe', esDisplayName: 'República Checa' },
  'Bosnia and Herzegovina': { emoji: '🇧🇦', region: 'europe', esDisplayName: 'Bosnia y Herzegovina' },
  'Slovakia': { emoji: '🇸🇰', region: 'europe', esDisplayName: 'Eslovaquia' },
  'Luxembourg': { emoji: '🇱🇺', region: 'europe', esDisplayName: 'Luxemburgo' },
  'Malta': { emoji: '🇲🇹', region: 'europe' },
  'North Macedonia': { emoji: '🇲🇰', region: 'europe', esDisplayName: 'Macedonia Norte' },
  'Albania': { emoji: '🇦🇱', region: 'europe' },
  'Cyprus': { emoji: '🇨🇾', region: 'europe', esDisplayName: 'Chipre' },
  'Gibraltar': { emoji: '🇬🇮', region: 'europe' },
  'Liechtenstein': { emoji: '🇱🇮', region: 'europe' },
  'Lithuania': { emoji: '🇱🇹', region: 'europe', esDisplayName: 'Lituania' },
  'Monaco': { emoji: '🇲🇨', region: 'europe' },
  'Serbia': { emoji: '🇷🇸', region: 'europe' },
  'Greenland': { emoji: '🇬🇱', region: 'europe' },
  'Vatican City': { emoji: '🇻🇦', region: 'europe', esDisplayName: 'Ciudad del Vatiano' },
  'Ukraine': { emoji: '🇺🇦', region: 'europe', esDisplayName: 'Ucrania' },


  'Diamond Princess': { displayName: 'Diamond Princess (out of Japan)', esDisplayName: 'Diamond Princess (en Japón)',
    emoji: '🛳', region: 'other', type: 'other',
    links: { 'Wikipedia': 'https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_on_cruise_ships#Diamond_Princess' }},
  'Grand Princess': { displayName: 'Grand Princess (out of US)', esDisplayName: 'Grand Princess (en EEUU)',
    emoji: '🛳', region: 'other', type: 'other' }
}
