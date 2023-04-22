import S3Client from "aws-sdk/clients/s3";
import {
  prisma,
  redis,
  type DocumentType as DBDocumentType,
} from "@packages/db";
import {
  DocumentType,
  ImageType,
  documentTypes,
  imageTypes,
  type ContentType,
} from "./file.types";

const isProd = process.env.NODE_ENV === "production";

const S3 = isProd
  ? new S3Client({
      region: "eu-central-1",
      accessKeyId: process.env.SERVER_AWS_ACCESS_KEY,
      secretAccessKey: process.env.SERVER_AWS_SECRET_KEY,
    })
  : new S3Client({
      accessKeyId: "access-key",
      secretAccessKey: "secret-key",
      endpoint: "http://localhost:4566",
    });

class FileService {
  readonly redis = redis;
  readonly prisma = prisma;
  readonly s3 = S3;

  async createPresignedUrl(
    key: string,
    contentType: ContentType,
    expirationInSeconds: number,
  ) {
    return new Promise((resolve: (value: string) => void, reject) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        ContentType: contentType,
        Expires: expirationInSeconds,
      };

      this.s3.getSignedUrl("putObject", params, (err, url) => {
        if (err) return reject(err);

        resolve(url);
      });
    });
  }

  getFileType(file: string): DBDocumentType {
    if (imageTypes.includes(file as ImageType)) return "IMAGE";
    if (documentTypes.includes(file as DocumentType)) return "DOCUMENT";

    throw new Error("Invalid file type");
  }

  getFileContentType() {}
}

export const fileService = new FileService();
