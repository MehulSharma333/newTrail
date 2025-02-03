import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'


const resources = {
    en: require('../utils/translations/english.json'),
    es: require('../utils/translations/spanish.json'),
    fr: require('../utils/translations/french.json'),
    it: require('../utils/translations/italian.json'),
    de: require('../utils/translations/german.json'),
    bn: require('../utils/translations/bangla.json'),
    pt: require('../utils/translations/portuguese.json'),
    ko: require('../utils/translations/korean.json'),
    hi: require('../utils/translations/hindi.json'),
    ru: require('../utils/translations/russian.json'),
    ta: require('../utils/translations/tamil.json'),
  ml: require('../utils/translations/malayalam.json'),
  ja: require('../utils/translations/japanese.json'),
  ar: require('../utils/translations/arabic.json'),
  };

  i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;


// arabic, bangla, english, french, german, hindi, italian, japanese, korean, malayalam, portuguese, russian, spanish, tamil