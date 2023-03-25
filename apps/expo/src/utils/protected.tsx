import { useAuth } from "@clerk/clerk-expo";
import { User } from "@packages/db";
import { api } from "./api";

export type ProtectedComponentProps = {
  loading: boolean;
  user?: User;
};

export type ProtectedComponent = React.FC<ProtectedComponentProps>;

export const requireAuth =
  (Component: React.FC<ProtectedComponentProps>) => () => {
    const { userId } = useAuth();
    const { data } = api.auth.getUser.useQuery();

    if (!userId || !data?.user) return <Component loading={true} />;

    return <Component user={data.user} loading={false} />;
  };
