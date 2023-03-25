import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import { TRPCProvider } from "../utils/api";
import tokenCache from "../utils/tokenCache";

const clerkPublishableKey =
  Constants.expoConfig?.extra?.env?.clerkPublishableKey;

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <TRPCProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{ headerStyle: { backgroundColor: "#f472b6" } }}
          />
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
