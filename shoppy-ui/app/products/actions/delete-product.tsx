"use server";

import { deleteOperation } from "@/app/common/util/fetch";
import { Product } from "../interfaces/product.interface";
import { revalidateTag } from "next/cache";

export default async function deleleProduct(productId: number) {
  const res = await deleteOperation<Product>(`products/${productId}`);
  revalidateTag("products");
  return res;
}
