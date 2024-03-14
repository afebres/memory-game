import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en, es } from '../locales'


const locale =
  (navigator.languages && navigator.languages[0].substring(0, 2)) ||
  navigator.language

// Configura i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: locale,

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
