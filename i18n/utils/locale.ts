import { DEFAULT_LANGUAGE } from "@/i18n/constants/locale";
import { SupportLanguage } from "@/i18n/types";
import * as SecureStore from "expo-secure-store";

export const getLocale = async (): Promise<SupportLanguage> => {
  try {
    const locale = await SecureStore.getItemAsync("locale");
    return (locale ?? DEFAULT_LANGUAGE) as SupportLanguage;
  } catch (error) {
    console.error("Failed to get locale from SecureStore", error);
    return DEFAULT_LANGUAGE;
  }
};
