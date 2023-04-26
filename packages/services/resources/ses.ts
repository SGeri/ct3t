import SESClient from "aws-sdk/clients/ses";

const SES = new SESClient({
  region: "eu-central-1",
  accessKeyId: process.env.SERVER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.SERVER_AWS_SECRET_KEY,
  endpoint: process.env.LOCAL_AWS_S3_ENDPOINT ?? undefined, // add ses endpoint for localstack here
});

export { SES };
