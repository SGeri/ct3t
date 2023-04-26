import { useState } from "react";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { type ClerkAPIError } from "@clerk/types";
import { Loader } from "@mantine/core";

const SignInPage = () => {
  const router = useRouter();
  const { redirectUrl } = router.query;

  const { signIn, setSession, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [clerkError, setClerkError] = useState("");

  const handleSignInPress = async () => {
    if (!signIn || !isLoaded) return;

    setLoading(true);

    setEmailError("");
    setPasswordError("");
    setClerkError("");

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

      await router.replace(redirectUrl ? String(redirectUrl) : "/");
    } catch (err: unknown) {
      const clerkErr = err as {
        errors?: ClerkAPIError[];
      };

      console.error(
        "Error during login:",
        clerkErr?.errors && clerkErr?.errors?.length > 0
          ? clerkErr?.errors
          : err,
      );

      setClerkError(clerkErr.errors?.[0]?.message || String(err));
    }

    setLoading(false);
  };

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 text-center">
            <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Authentication
              </h2>

              <div className="relative mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              </div>
              <div className="relative mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => handleSignInPress()}
              >
                Login
              </button>
              <div className="my-2 flex justify-center">
                {loading && <Loader />}
                <p className="mt-1 text-sm text-red-600">{clerkError}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { userId } = getAuth(ctx.req);

  if (userId) return { redirect: { destination: "/", permanent: false } };

  return { props: {} };
};

export default SignInPage;
