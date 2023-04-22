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
        objectKey: zod.string(),
        contentType: zod.enum(contentTypes),
      }),
    )
    .mutation(async ({ ctx, input: { objectKey, contentType, userId } }) => {
      try {
        const presignedUrl = await fileService.createPresignedUrl(
          objectKey,
          contentType,
          20,
        );

        const type = fileService.getFileType(contentType);

        const document = await ctx.prisma.document.create({
          data: {
            hash: objectKey,
            ownerId: ctx.user.id,
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

        return {
          key: objectKey,
          presignedUrl,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
