export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  id: string; // cart item id
  productId: number;
  name: string;
  unitPrice: number;
  qty: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export type CheckoutRequest = {
  name: string;
  email: string;
  items: { productId: number; qty: number }[];
};

export type Receipt = {
  orderId: string;
  total: number;
  timestamp: string;
};


