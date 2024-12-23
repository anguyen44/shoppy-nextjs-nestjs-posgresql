"use server";

import { cookies } from "next/headers";
import { API_URL } from "../contants/api";
import { getErrorMessage } from "./errors";

export const getCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const mutationApi = async (
  path: string,
  formData: FormData,
  method: string = "POST"
) => {
  const cookies = await getCookies();
  const res = await fetch(`${API_URL}/${path}`, {
    method: method,
    headers: { "Content-Type": "application/json", Cookie: cookies },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const parsedRes = await res.json();
  if (!res.ok) {
    console.log(parsedRes);
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};

export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams
) => {
  const cookies = await getCookies();
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
  const res = await fetch(url, {
    headers: { Cookie: cookies },
    next: { tags },
  });
  return res.json() as T;
};

export const deleteOperation = async <T>(path: string) => {
  const cookies = await getCookies();
  const res = await fetch(`${API_URL}/${path}`, {
    method: "DELETE",
    headers: { Cookie: cookies },
  });
  return res.json() as T;
};
