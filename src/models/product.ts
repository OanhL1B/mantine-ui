
export class Base {
  id: number;
}

export class IProduct extends Base{
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number;
}


export interface ProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}



