import {
  prisma,
  redis,
  type DocumentType as DBDocumentType,
} from "@packages/db";
import { S3 } from "@packages/services";
import fixedLengthBase64 from "../utils/fixedLengthBase64";
import {
  documentTypes,
  imageTypes,
  type ContentType,
  type DocumentType,
  type ImageType,
} from "./file.types";

class FileService {
  readonly redis = redis;
  readonly prisma = prisma;
  readonly s3 = S3;

  async createPresignedUrl(
    key: string,
    contentType: ContentType,
    expirationInSeconds: number,
  ) {
    return new Promise(
      (
        resolve: (value: { url: string; objectKey: string }) => void,
        reject,
      ) => {
        const objectKey = fixedLengthBase64(`${key}-${Date.now()}`, 20);

        const params = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: objectKey,
          ContentType: contentType,
          Expires: expirationInSeconds,
        };

        this.s3.getSignedUrl("putObject", params, (err, url) => {
          if (err) return reject(err);

          resolve({ url, objectKey });
        });
      },
    );
  }

  getFileType(file: string): DBDocumentType {
    if (imageTypes.includes(file as ImageType)) return "IMAGE";
    if (documentTypes.includes(file as DocumentType)) return "DOCUMENT";

    throw new Error("Invalid file type");
  }

  //getFileContentType() {}
}

export const fileService = new FileService();
