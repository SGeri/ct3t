import "../styles/globals.css";
import type { AppType } from "next/app";

import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default api.withTRPC(MyApp);
