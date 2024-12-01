import React, { useEffect, useState } from "react";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import { Slot, SplashScreen } from "expo-router";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { DEFAULT_LANGUAGE } from "@/i18n/constants/locale";
import { I18nStoreContextProvider } from "@/i18n/hooks/useI18nContext";
import { SupportLanguage } from "@/i18n/types";
import { getLocale } from "@/i18n/utils/locale";
import { tokenCache } from "@/utils/cache";
import { LogBox } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const InitialLayout = () => {
  const [isFontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (isFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  return <Slot />;
};

export default function RootLayout() {
  const [locale, setLocale] = useState<SupportLanguage>(DEFAULT_LANGUAGE);

  const fetchLocale = async () => {
    const locale = await getLocale();
    setLocale(locale);
  };

  useEffect(() => {
    fetchLocale();
  }, []);

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <I18nStoreContextProvider value={locale}>
            <InitialLayout />
          </I18nStoreContextProvider>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
