import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";

import { Role, prisma } from "@packages/db";

/**
 * @param {Role} requiredAuthRole the required auth role for the user to be authorized for the page
 * @param {GetServerSideProps} getServerSideProps an optional callback to extend the getServerSideProps function (called after the auth check)
 * requiredAuthRole can be a single Role or an array of Roles
 * @example const getServerSideProps = requireAuth(Role.ADMIN);
 * @example const getServerSideProps = requireAuth([Role.EMPLOYEE, Role.ADMIN]);
 * @an optional callback can be passed
 * @example const getServerSideProps = requireAuth(Role.ADMIN, async (ctx) => { ... });
 */
const requireAuth = (
  requiredAuthRole: Role | Role[], // todo single Role or array of Roles
  getServerSideProps?: GetServerSideProps,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { userId } = getAuth(ctx.req);

    if (!userId) return redirect(ctx);

    const user = await prisma.user.findUnique({
      where: { clerk_id: userId },
    });

    if (!user) return redirect(ctx);

    const eligibleToVisit = Array.isArray(requiredAuthRole)
      ? requiredAuthRole.includes(user.role)
      : user.role === requiredAuthRole;

    if (!eligibleToVisit) return redirect(ctx);

    const additionalProps = getServerSideProps
      ? await getServerSideProps(ctx)
      : {};

    return {
      ...additionalProps,
      props: {
        user,
        ...buildClerkProps(ctx.req),
      },
    };
  };
};

const redirect = (ctx: GetServerSidePropsContext) => ({
  props: buildClerkProps(ctx.req),
  redirect: {
    permanent: false,
    destination: "/sign-in?redirectUrl=" + encodeURIComponent(ctx.resolvedUrl), // todo fix this because it can redirect to external sites - security issue
  },
});

export default requireAuth;
