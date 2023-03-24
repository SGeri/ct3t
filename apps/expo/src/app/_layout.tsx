import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import { TRPCProvider } from "../utils/api";
import tokenCache from "../utils/tokenCache";

// make .env available in the expo application
const publishableKey = "pk_test_Z2FtZS1vd2wtODUuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Equivalent to the Root Layout (_app.tsx) in Next.js
const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
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
