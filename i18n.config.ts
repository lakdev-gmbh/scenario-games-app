import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { de, en } from "./assets/translations/translations";
import { Platform, NativeModules } from 'react-native'

const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

const language = deviceLanguage.slice(0, 2)

const resources = {
    de: {
        translation: de
    },
    en: {
        translation: en
    }
}

i18next.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: 'v3',
})

export default i18next