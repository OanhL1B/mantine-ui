import { BaseSearch } from "@/models/product-search/product";
import { IProduct, ProductsResponse } from "@/models/product";
import { coreService } from "./core";
import { URL } from "@/constant/Url";

export const ProductService = {
  getProducts: (params?: BaseSearch) => {
    return params
      ? coreService.get<ProductsResponse>(
          `${URL.PRODUCT_BASE_PATH}?limit=${params.limit}&skip=${params.skip}`
        )
      : coreService.get<ProductsResponse>(`${URL.PRODUCT_BASE_PATH}`);
  },

  addProduct: (data: IProduct) => {
    return coreService.post(
      `${URL.PRODUCT_BASE_PATH}/${URL.ADD_PRODUCT}`,
      data
    );
  },

  updateProduct: (data: Partial<IProduct>, id: number | string) => {
    return coreService.put(`${URL.PRODUCT_BASE_PATH}/${id}`, data);
  },

  deleteProduct: (id: number) => {
    return coreService.deleteProduct(`${URL.PRODUCT_BASE_PATH}/${id}`);
  },

  getProduct: (id: number | string) => {
    return coreService.get<IProduct>(`${URL.PRODUCT_BASE_PATH}/${id}`);
  },
};
