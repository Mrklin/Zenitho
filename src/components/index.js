import { createI18n } from 'vue-i18n'

const savedLocale = localStorage.getItem('user-language') || 'en'


const i18n = createI18n({
  legacy: false,
  locale: savedLocale, 
  fallbackLocale: 'en',
  messages: {
    en: {
    Search: 'Search',
    'About Us': 'About Us',
    Contact: 'Contact',
    Policy: 'Policy',
    Faqs: 'FAQs',
    copyright: '© 2026 lezada. All Rights Reserved',
    language: 'Language'
  },
  es: {
    Search: 'Buscar',
    'About Us': 'Sobre nosotros',
    Contact: 'Contacto',
    Policy: 'Política',
    Faqs: 'Preguntas frecuentes',
    copyright: '© 2026 lezada. Todos los derechos reservados',
    language: 'Idioma'
  },
   fr: {
    Search: 'Rechercher',
    'About Us': 'À propos de nous',
    Contact: 'Contact',
    Policy: 'Politique de confidentialité',
    Faqs: 'FAQ',
    copyright: '© 2026 lezada. Tous droits réservés',
    language: 'Langue'
  }
}
});

// const messages = {
//   en: {
//     welcome: 'Welcome to our app',
//     description: 'Select your preferred language below.',
//     logout: 'Logout'
//   },
//   es: {
//     welcome: 'Bienvenido a nuestra aplicación',
//     description: 'Seleccione su idioma preferido a continuación.',
//     logout: 'Cerrar sesión'
//   },
//   fr: {
//     welcome: 'Bienvenue dans notre application',
//     description: 'Sélectionnez votre langue préférée ci-dessous.',
//     logout: 'Se déconnecter'
//   }
// }

// const i18n = createI18n({
//   legacy: false, // Set to false to use Composition API
//   locale: 'en',  // Default language
//   fallbackLocale: 'en', // If a translation is missing, use English
//   messages,
// })

export default i18n