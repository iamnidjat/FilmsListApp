import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from './locale/en.json'
import ruJSON from './locale/ru.json'
import azJSON from './locale/az.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    ru: { ...ruJSON },
    az: { ...azJSON },
  },
  lng: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
});