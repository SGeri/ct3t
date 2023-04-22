import { Role } from "@packages/db";
import { api } from "~/utils/api";
import { ProtectedPage, requireAuth } from "~/utils/auth";

const Files: ProtectedPage = ({ user }) => {
  //const { data: files } = api.file.getFilesByUser.useQuery(user.id);
  const { mutateAsync: attachFile } = api.file.attachFileToUser.useMutation();

  const handleSubmit = async () => {
    const { key, presignedUrl } = await attachFile({
      objectKey: "teszt.jpeg",
      contentType: "image/jpeg",
      userId: user.id,
    });

    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: "teszt",
    });
  };

  return (
    <>
      <h1>Your files:</h1>
      <button onClick={handleSubmit} className="h-10 w-40 bg-red-200">
        Upload
      </button>
    </>
  );
};

export const getServerSideProps = requireAuth(Role.ADMIN);

export default Files;
