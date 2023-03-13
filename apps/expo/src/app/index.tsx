import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

//import { api, type RouterOutputs } from "~/utils/api";

const App = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          Create <Text className="text-pink-400">T3</Text> Turbo
        </Text>

        <Button onPress={() => {}} title="Refresh posts" color={"#f472b6"} />

        <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          estimatedItemSize={10}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item }) => (
            <View className="flex flex-row rounded-lg bg-white/10 p-4">
              <View className="flex-grow">
                <TouchableOpacity onPress={() => router.push("/post/" + item)}>
                  <Text className="text-xl font-semibold text-pink-400">
                    {item}
                  </Text>
                  <Text className="mt-2 text-white">Details</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Text className="font-bold uppercase text-pink-400">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
