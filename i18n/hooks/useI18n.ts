import EN_TRANS from "@/i18n/translations/en.json";
import { useI18nContext } from "@/i18n/hooks/useI18nContext";
import { useMemo } from "react";
import { getTranslateFiles } from "@/i18n/utils/translateFiles";

const useI18n = () => {
  const locale = useI18nContext();
  const translationFile = useMemo(() => getTranslateFiles(locale), [locale]);

  const t = (key: keyof typeof EN_TRANS) => {
    return translationFile[key];
  };

  return { t };
};

export default useI18n;
