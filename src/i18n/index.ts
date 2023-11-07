import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import fr from "./translations/fr";
import { LocalstorageKeys } from "src/misc/enums/LocalStorage/LocalstorageKeys";

const resources = {
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    resources,
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupLocalStorage: LocalstorageKeys.LANGUAGE,
      lookupQuerystring: LocalstorageKeys.LANGUAGE
    },
    keySeparator: false,
    fallbackLng: "en",
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
