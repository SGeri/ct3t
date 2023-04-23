import { ChangeEventHandler, useState } from "react";
import { ContentType } from "@packages/api/src/services/file.types";
import { Role } from "@packages/db";
import { api } from "~/utils/api";
import { ProtectedPage, requireAuth } from "~/utils/auth";

const Files: ProtectedPage = ({ user }) => {
  //const { data: files } = api.file.getFilesByUser.useQuery(user.id);
  const { mutateAsync: attachFileToUser } =
    api.file.attachFileToUser.useMutation();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [error, setError] = useState("");

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedFile(event.target.files ? event.target.files[0] : undefined);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return setError("Please select a file");

    // todo: selectedFile.type validation

    try {
      const { presignedUrl } = await attachFileToUser({
        fileName: selectedFile.name,
        contentType: selectedFile.type as ContentType,
        userId: user.id,
      });

      await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile.slice(),
      });
    } catch (err) {
      console.log("err", err);
      setError(String(err));
    }
  };

  return (
    <>
      <h1>Your files:</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} className="h-10 w-40 bg-red-200">
        Upload
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export const getServerSideProps = requireAuth(Role.ADMIN);

export default Files;
