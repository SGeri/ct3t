import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

const Post: React.FC = () => {
  const { id } = useSearchParams();
  if (!id) throw new Error("unreachable");

  if (typeof id !== "string") {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: id }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-white">{id}</Text>
        <Text className="py-4 text-white">Description of page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Post;
