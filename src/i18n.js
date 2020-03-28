import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Settings as LuxonSettings } from 'luxon'
import numeral from 'numeral'
import 'numeral/locales/es'


// import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en/translation.en.json'
import esTranslations from './locales/es/translation.es.json'

i18n
  // load translation using xhr -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .on('languageChanged', function(lng) {
    if (lng === 'es') {
      numeral.locale(lng)
      LuxonSettings.defaultLocale = lng
    } else {
      LuxonSettings.defaultLocale = 'en-US'
    }
  })
  .init({
    whitelist: ['en', 'es'],
    nonExplicitWhitelist: true, // accept en-US
    fallbackLng: 'en',
    debug: (process.env.NODE_ENV !== "production"),

    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.{{lng}}.json',
    },

    react: {
      useSuspense: true,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'a'],
    },

    detection: {
      order: [ 'navigator' ]
    }
  })

export default i18n;
