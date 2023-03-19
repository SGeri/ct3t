import { notifications } from "@mantine/notifications";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "@packages/api";

export const handleAPIError = (err: unknown) => {
  if (err instanceof TRPCClientError<AppRouter>) {
    if (err.data.code == "UNAUTHORIZED" || err.data.code == "FORBIDDEN") {
      return notifications.show({
        title: "Permission Denied",
        message:
          "You do not have permission to perform this action. Please contact support if you believe this is an error",
        color: "red",
        autoClose: true,
      });
    }

    console.error("TRPC API Error", { ...err });

    return notifications.show({
      title: "An error occurred",
      message: err.message,
      color: "red",
      autoClose: true,
    });
  }

  console.error("Non-TRPC related API Error", err);

  return notifications.show({
    title: "An unknown error occurred",
    message: "Please try again later & contact support if the problem persists",
    color: "red",
    autoClose: true,
  });
};
