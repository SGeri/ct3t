import { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const router = useRouter();
  const { signIn, setSession, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignInPress = async () => {
    if (!signIn || !isLoaded) return;

    setEmailError("");
    setPasswordError("");

    let emailError = "";
    let passwordError = "";

    if (!email) emailError = "Email is required";
    if (!password) passwordError = "Password is required";

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    try {
      const { createdSessionId } = await signIn.create({
        identifier: email,
        password: password,
      });

      await setSession(createdSessionId);

      router.replace("/");
    } catch (err: any) {
      console.error(
        "Error during login:",
        err?.errors ? err?.errors[0].message : err,
      );
    }
  };

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Sign in" }} />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-2xl font-bold text-white">
          Sign in with your credentials
        </Text>

        <Input
          text="Email"
          error={emailError}
          value={email}
          onChangeText={(v) => setEmail(v)}
          placeholder="hello@email.com"
          autoCapitalize="none"
        />
        <Input
          text="Password"
          error={passwordError}
          value={password}
          onChangeText={(v) => setPassword(v)}
          placeholder="*****"
          secureTextEntry
        />

        <TouchableOpacity
          className="mx-auto mt-4 rounded-2xl border bg-slate-500 px-5 py-3"
          activeOpacity={0.8}
          onPress={handleSignInPress}
        >
          <Text className="text-center text-lg text-white">Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Input = ({
  text,
  error,
  ...props
}: TextInputProps & { text: string; error: string }) => {
  return (
    <View className="m-4">
      <Text className="text-md m-2 font-bold text-gray-200">{text}</Text>
      <TextInput
        className="h-auto w-full rounded-2xl bg-cyan-100 p-2 px-4"
        placeholderTextColor="#000"
        {...props}
      />
      {error && (
        <Text className="ml-2 mt-2 text-sm font-bold text-red-400">
          {error}
        </Text>
      )}
    </View>
  );
};

export default SignIn;
