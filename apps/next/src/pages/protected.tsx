import { Role } from "@packages/db";
import { api } from "~/utils/api";
import { requireAuth, type ProtectedPage } from "~/utils/auth";

const ProtectedPage: ProtectedPage = ({ user }) => {
  const { mutateAsync: checkNumber } = api.example.checkNumber.useMutation();

  const handleCreate = async () => {
    const { message } = await checkNumber({
      number: 2,
    });

    console.log("success", message);
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{JSON.stringify(user)}</p>

      <button onClick={handleCreate}>Creator</button>
    </div>
  );
};

export const getServerSideProps = requireAuth(Role.ADMIN);

export default ProtectedPage;
