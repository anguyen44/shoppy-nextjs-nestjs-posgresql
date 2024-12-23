"use server";

import { cookies } from "next/headers";
import { API_URL } from "./common/contants/api";

export default async function getMe() {
  try {
    const cookieStore = await cookies();
    if (cookieStore) {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { Cookie: cookieStore.toString() },
      });
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
}
