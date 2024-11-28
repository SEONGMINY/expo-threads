import EN_TRANS from "@/i18n/translations/en.json";
import { SupportLanguage } from "@/i18n/types";

export const getTranslateFiles = (locale: SupportLanguage) => {
  const map: Record<SupportLanguage, () => typeof EN_TRANS> = Object.freeze({
    en: () => require("@/i18n/translations/en.json"),
    ko: () => require("@/i18n/translations/ko.json"),
  });

  return map[locale]();
};
