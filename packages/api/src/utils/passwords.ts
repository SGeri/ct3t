import bcrypt from "bcrypt";

const saltRounds = process.env.PASSWORD_SALT_ROUNDS || 10;

export const hashPassword = async (password: string) => {
  if (!password) return null;

  return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
