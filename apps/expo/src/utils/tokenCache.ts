import { getItemAsync, setItemAsync } from "expo-secure-store";

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
}

type Key = string;
type Token = string;

const tokenCache = {
  async getToken(key: Key) {
    try {
      return await getItemAsync(key);
    } catch (err) {
      return null;
    }
  },

  async saveToken(key: Key, value: Token) {
    try {
      await setItemAsync(key, value);
    } catch (err) {}
  },
};

export default tokenCache;
