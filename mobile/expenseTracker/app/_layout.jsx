import { Slot, Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

import SafeScreen from "../components/SafeScreen"
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded,error] = useFonts({
    ...Ionicons.font,
  }
  );

    useEffect(() => {
    if (error) {
        console.error("Font loading error:", error);
        throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // hardcoded for testing --> crashing on android 
    // <ClerkProvider tokenCache={tokenCache} 
    // publishableKey={"pk_test_c2423k"}   - demo 
    // >
     <ClerkProvider tokenCache={tokenCache} 
    >
 <SafeScreen>
   <Slot/> 
 </SafeScreen>
 </ClerkProvider>
  )
}
