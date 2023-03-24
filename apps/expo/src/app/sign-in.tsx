import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn } = useSignIn();

  const handleSignInPress = async () => {
    await signIn?.create({
      identifier: "email",
      password: "password",
    });
  };

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Text>Sign-in</Text>
    </SafeAreaView>
  );
};

export default SignIn;
