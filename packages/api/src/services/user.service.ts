import { prisma, redis, type User } from "@packages/db";
import type { getUserInput } from "./user.types";

const isProd = process.env.NODE_ENV === "production";
const CACHE_KEY_PREFIX = "user:";

class UserService {
  readonly redis = redis;
  readonly prisma = prisma;

  // Always fetches the user from the database
  async getUser(input: getUserInput) {
    const user = await this.prisma.user.findUnique({ where: input });

    return user;
  }

  // Cached user will be reutrned, otherwise it will be fetched from the database
  async getUserByClerkId(clerkId: string) {
    const cacheKey = CACHE_KEY_PREFIX + clerkId;

    // disable user caching in dev
    const cachedUser: User | null = isProd
      ? await this.redis.get(cacheKey)
      : null;

    if (cachedUser) return cachedUser;

    const user = await this.getUser({ clerk_id: clerkId });

    if (!user) return null;

    await this.redis.set(cacheKey, user);
    return user;
  }

  // Invalidates the user cache
  async invalidateUserCache(clerkId: string) {
    const cacheKey = CACHE_KEY_PREFIX + clerkId;

    await this.redis.del(cacheKey);
  }
}

export const userService = new UserService();
