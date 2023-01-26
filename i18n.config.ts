import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { de } from "./assets/translations/translations";

const resources = {
    de: {
        translation: de
    }
}

i18next.use(initReactI18next).init({
    resources,
    fallbackLng: 'de',
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: 'v3',
})

export default i18next