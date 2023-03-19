import { Role } from "@packages/db";
import { requireAuth, type ProtectedPage } from "~/utils/auth";

const ProtectedPage: ProtectedPage = ({ user }) => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

export const getServerSideProps = requireAuth([Role.EMPLOYEE, Role.MANAGER]);

export default ProtectedPage;
