import S3Client from "aws-sdk/clients/s3";

const S3 = new S3Client({
  region: "eu-central-1",
  accessKeyId: process.env.SERVER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.SERVER_AWS_SECRET_KEY,
  endpoint: process.env.LOCAL_AWS_S3_ENDPOINT ?? undefined,
});

export { S3 };
