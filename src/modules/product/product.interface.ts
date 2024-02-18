export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: string;
  manufacturer: string;
  size: string;
  material: string;
  color: string;
  condition: "new" | "used";
};

export interface Filter {
  type?: string;
  manufacturer?: string;
  size?: string;
  minPrice?: string;
  maxPrice?: string;
  material?: string;
  color?: string;
  condition?: string;
}

export interface PriceFilter extends Filter {
  price?: { $gte?: number; $lte?: number };
}
