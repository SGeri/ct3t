import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { ProtectedComponent, requireAuth } from "../utils/protected";

const Protected: ProtectedComponent = ({ loading, user }) => {
  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Protected" }} />

      {loading ? (
        <Text className="mx-auto pb-2 text-2xl font-bold text-white">
          Loading...
        </Text>
      ) : (
        <View className="h-full w-full p-4">
          <Text className="mx-auto pb-2 text-2xl font-bold text-white">
            {JSON.stringify(user)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default requireAuth(Protected);
