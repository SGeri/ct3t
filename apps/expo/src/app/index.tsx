import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { api } from "../utils/api";

const App = () => {
  const router = useRouter();
  const { user: authUser } = useUser();
  const { signOut } = useAuth();

  const userId = authUser?.id;

  //const { data: user } = api.auth.getUser.useQuery();
  const { data: session } = api.auth.getSession.useQuery();

  console.log("userId, session", userId, session);

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-center text-5xl font-bold text-white">
          Authentication <Text className="text-pink-400">Playground</Text>
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Button
            onPress={() => router.push("sign-in")}
            title="Sign In"
            color={"#f472b6"}
          />
          <Button
            onPress={() => signOut()}
            title="Sign Out"
            color={"#f472b6"}
          />
        </View>

        <Text className="mt-4 text-center text-lg text-white">
          Current User: {userId}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
