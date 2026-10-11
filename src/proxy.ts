import createMiddleware from "next-intl/middleware";
import { routing } from "@/modules/cores/i18n/src/config/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
