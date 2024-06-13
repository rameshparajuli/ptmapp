import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./sources/en.json";
import np from "./sources/np.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: {
      translation: en,
    },
    np: {
      translation: np,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
