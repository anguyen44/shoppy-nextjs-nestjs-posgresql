"use server"; // have to add "use server" or else there will have error Error: Invariant: static generation store missing in revalidateTag_[hash-here]

import { mutationApi } from "@/app/common/util/fetch";
import { revalidateTag } from "next/cache";

export default async function updateProduct(
  productId: number,
  formData: FormData
) {
  const res = await mutationApi(`products/${productId}`, formData, "PATCH");
  revalidateTag("products");
  return res;
}
