import { IProduct } from "@/models/product";
import { ProductService } from "@/service/productService";
import { FC, createContext, useContext, useEffect, useState } from "react";

export interface ProductContextProps {
  products: IProduct[];
}

export const ProductContext = createContext<ProductContextProps | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "ProductContext has to be used within <ProductContext.Provider>"
    );
  }
  return context;
};

export const ProductProvider: FC = ({ children }: any) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await ProductService.getProducts();
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
