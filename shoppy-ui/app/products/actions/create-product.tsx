"use server";

import { revalidateTag } from "next/cache";
import { getCookies, mutationApi } from "../../common/util/fetch";
import { API_URL } from "@/app/common/contants/api";

export default async function createProduct(formData: FormData) {
  const res = await mutationApi("products", formData);
  const productImage = formData.get("image");
  if (productImage instanceof File && !res.error) {
    await uploadProductImage(res.data.id, productImage);
  }
  revalidateTag("products");
  return res;
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const cookies = await getCookies();
  await fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    method: "POST",
    headers: { Cookie: cookies },
  });
}
