import Toast from "react-native-toast-message";
import { TRPCClientError } from "@trpc/client";
import { type AppRouter } from "@packages/api";

export const handleAPIError = (err: unknown) => {
  console.log("global err", err);

  if (err instanceof TRPCClientError) {
    const trpcError = err as TRPCClientError<AppRouter>;

    if (
      trpcError.data?.code == "UNAUTHORIZED" ||
      trpcError.data?.code == "FORBIDDEN"
    ) {
      return Toast.show({
        type: "error",
        text1: "Permission Denied",
        text2:
          "You do not have permission to perform this action. Please contact support if you believe this is an error",
      });
    }

    console.error("TRPC API Error", trpcError);

    return Toast.show({
      type: "error",
      text1: "An error occurred",
      text2: trpcError.message,
    });
  }

  console.error("Non-TRPC related API Error", err);

  return Toast.show({
    type: "error",
    text1: "An error occurred",
    text2: "Please try again later & contact support if the problem persists",
  });
};
