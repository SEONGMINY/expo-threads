import { DEFAULT_LANGUAGE } from "@/i18n/constants/locale";
import { I18nStoreContextProvider } from "@/i18n/hooks/useI18nContext";
import { SupportLanguage } from "@/i18n/types";
import { getLocale } from "@/i18n/utils/locale";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot, SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const [locale, setLocale] = useState<SupportLanguage>(DEFAULT_LANGUAGE);

  const [isFontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const fetchLocale = async () => {
    const locale = await getLocale();
    setLocale(locale);
  };

  useEffect(() => {
    fetchLocale();
  }, []);

  useEffect(() => {
    if (isFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProvider client={convex}>
          <I18nStoreContextProvider value={locale}>
            <Slot />
          </I18nStoreContextProvider>
        </ConvexProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
