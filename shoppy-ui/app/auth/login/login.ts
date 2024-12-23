"use server";

import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { API_URL } from "@/app/common/contants/api";
import { getErrorMessage } from "@/app/common/util/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

//login action in server side which will be executed on server side

export default async function login(
  _prevState: FormResponse,
  formData: FormData
) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  console.log("res ", res);

  const parsedRes = await res.json();
  if (!res.ok) {
    console.log("alo ", parsedRes);
    return { error: getErrorMessage(parsedRes) };
  }
  const status = await setAuthCookie(res);
  if (status) {
    redirect("/");
  }
  return { error: "" };
}

const setAuthCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get("Set-cookie");
  if (setCookieHeader) {
    const cookieStore = await cookies();
    const token = setCookieHeader.split(";")[0].split("=")[1];

    if (cookieStore) {
      cookieStore.set({
        name: AUTHENTICATION_COOKIE,
        value: token,
        secure: true,
        httpOnly: true,
        expires: new Date(jwtDecode(token).exp! * 1000),
      });
      return true;
    }
  }
};
