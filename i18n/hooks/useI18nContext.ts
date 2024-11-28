import { createContext, useContext } from "react";
import { SupportLanguage } from "@/i18n/types";
import { DEFAULT_LANGUAGE } from "@/i18n/constants/locale";

const I18nStoreContext = createContext<SupportLanguage>(DEFAULT_LANGUAGE);

export const I18nStoreContextProvider = I18nStoreContext.Provider;

export const useI18nContext = () => {
  const i18nStore = useContext(I18nStoreContext);

  if (!i18nStore) {
    throw new Error(
      "useI18nStoreContext must be used within a I18nStoreContextProvider"
    );
  }

  return i18nStore;
};
