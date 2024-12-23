import { API_URL } from "../common/contants/api";

export const getProductImage = (productId: number) => {
  return `${API_URL}/images/products/${productId}.jpg`;
};
