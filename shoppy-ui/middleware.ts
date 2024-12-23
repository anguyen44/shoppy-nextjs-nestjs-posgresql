import { NextRequest, NextResponse } from "next/server";
import { AUTHENTICATION_COOKIE } from "./app/auth/auth-cookie";
import { unauthenticatedRoutes } from "./app/common/contants/routes";
// import authenticated from "./app/auth/authenticated";

//middleware is executed on server side
export function middleware(request: NextRequest) {
  const auth = request.cookies.get(AUTHENTICATION_COOKIE)?.value;
  const isUnathorizedRoute = unauthenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.path)
  );

  if (!auth && !isUnathorizedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if (auth && isUnathorizedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

/** We can use the async action authenticated to check auth but we have to transform middleware to an async function. Middleware is a server function so that's why we can do it */
// export async function middleware(request: NextRequest) {
//   const auth = await authenticated();
//   console.log("abc ", auth);
//   const isUnathorizedRoute = unauthenticatedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route.path)
//   );

//   if (!auth && !isUnathorizedRoute) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   } else if (auth && isUnathorizedRoute) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], //base url will not apply middle ware
};
