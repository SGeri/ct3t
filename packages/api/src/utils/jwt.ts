import jwt, { SignOptions } from "jsonwebtoken";

import { User } from "@packages/db";

const config = {
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,

  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
};

export const signJwt = async (
  payload: Object,
  key: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: SignOptions = {},
) => {
  const privateKey = Buffer.from(config[key], "base64").toString("ascii");

  return await jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = async <T>(
  token: string,
  key: "accessTokenPublicKey" | "refreshTokenPublicKey",
): Promise<T | null> => {
  try {
    const publicKey = Buffer.from(config[key], "base64").toString("ascii");

    return (await jwt.verify(token, publicKey)) as T;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const signTokens = async (user: User) => {
  const accessToken = await signJwt({ sub: user.id }, "accessTokenPrivateKey", {
    expiresIn: `${config.accessTokenExpiresIn}m`,
  });

  const refreshToken = await signJwt(
    { sub: user.id },
    "refreshTokenPrivateKey",
    {
      expiresIn: `${config.refreshTokenExpiresIn}m`,
    },
  );

  return { accessToken, refreshToken };
};
