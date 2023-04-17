import { prisma, redis, type User } from "@packages/db";
import type { getUserInput } from "./user.types";

class UserService {
  redis = redis;
  prisma = prisma;

  // Always fetches the user from the database
  async getUser(input: getUserInput) {
    const user = await this.prisma.user.findUnique({ where: input });

    return user;
  }

  // Cached user will be reutrned, otherwise it will be fetched from the database
  async getUserByClerkId(clerkId: string) {
    const cachedUser: User | null = await this.redis.get(clerkId);
    if (cachedUser) return cachedUser;

    const user = await this.getUser({ clerk_id: clerkId });

    if (!user) return null;

    await this.redis.set(clerkId, user);
    return user;
  }

  // Invalidates the user cache
  async invalidateUserCache(clerkId: string) {
    await this.redis.del(clerkId);
  }
}

export const userService = new UserService();
