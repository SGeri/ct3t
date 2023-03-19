import { type NextPage } from "next";
import Link from "next/link";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isSignedIn, userId } = useAuth();
  const test = api.example.test.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Authentication Playground
        </h1>

        <p className="text-2xl text-white">
          This is a playground for authentication and authorization.
        </p>

        <p className="text-base text-white">
          Test data: {test.data ? test.data.message : "Loading..."}
        </p>

        <p className="text-base text-white">
          {isSignedIn ? (
            <>
              <span className="font-bold">User ID:</span> {userId}
              <SignOutButton>
                <span className="rounded-md border-2 border-red-200 p-4 text-white">
                  Sign Out
                </span>
              </SignOutButton>
            </>
          ) : (
            <Link href="sign-in">
              <span className="rounded-md border-2 border-red-200 p-4 text-white">
                Sign In
              </span>
            </Link>
          )}
        </p>
      </div>
    </main>
  );
};

export default Home;
