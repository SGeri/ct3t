import { Role } from "@packages/db";
import { api } from "~/utils/api";
import { requireAuth, type ProtectedPage } from "~/utils/auth";

const ProtectedPage: ProtectedPage = ({ user }) => {
  const { data, refetch: getName } = api.example.getName.useQuery();
  const { mutateAsync: invalidateUser } =
    api.example.invalidateUser.useMutation();

  const handleTest = async () => {
    try {
      await getName();

      console.log("success");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInvalidation = async () => {
    try {
      await invalidateUser();

      console.log("success");
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Protected Page1</h1>
      <p>{JSON.stringify(user)}</p>

      <button
        onClick={() => handleTest()}
        className="m-2 h-10 w-40 rounded-lg bg-cyan-600"
      >
        Test Query
      </button>
      <button
        onClick={() => handleInvalidation()}
        className="m-2 h-10 w-40 rounded-lg bg-cyan-600"
      >
        Test Mutation
      </button>

      <h3>Name: {data.name}</h3>
    </div>
  );
};

export const getServerSideProps = requireAuth(Role.ADMIN);

export default ProtectedPage;
