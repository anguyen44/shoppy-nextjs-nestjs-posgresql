"use server"; //only when we try to provide a server action to a client component, we need to explicitly mark server action with "use server"
//orthewise, we leave it blank that just means we can only use it in server component

import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "./auth-cookie";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTHENTICATION_COOKIE);
  redirect("/auth/login");
}
