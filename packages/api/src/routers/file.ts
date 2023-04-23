import { TRPCError } from "@trpc/server";
import zod from "zod";
import { fileService } from "../services/file.service";
import { contentTypes } from "../services/file.types";
import { adminProcedure, createRouter } from "../trpc";

export const fileRouter = createRouter({
  attachFileToUser: adminProcedure
    .input(
      zod.object({
        userId: zod.string(),
        fileName: zod.string(),
        contentType: zod.enum(contentTypes),
      }),
    )
    .mutation(async ({ ctx, input: { fileName, contentType, userId } }) => {
      try {
        const { url: presignedUrl, objectKey } =
          await fileService.createPresignedUrl(fileName, contentType, 20);

        const type = fileService.getFileType(contentType);

        const document = await ctx.prisma.document.create({
          data: {
            hash: objectKey,
            owner: {
              connect: {
                id: userId,
              },
            },
            type,
          },
        });

        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            documents: {
              connect: {
                id: document.id,
              },
            },
          },
          include: {
            documents: true,
          },
        });

        return { key: objectKey, presignedUrl };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong: " + error,
        });
      }
    }),
});
