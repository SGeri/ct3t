import { prisma, redis } from "@packages/db";
import { SES } from "@packages/services";

class EmailService {
  readonly redis = redis;
  readonly prisma = prisma;
  readonly ses = SES;
}

export const emailService = new EmailService();
