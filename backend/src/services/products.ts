import axios from 'axios';
import { Product } from '../types';

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

const FAKE_STORE_URL = process.env.FAKE_STORE_URL || 'https://fakestoreapi.com';

let cache: { products: Product[]; expiresAt: number; limit: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchProducts(limit = 20): Promise<Product[]> {
  const now = Date.now();
  if (cache && cache.expiresAt > now && cache.limit >= limit) {
    return cache.products;
  }

  const { data } = await axios.get<FakeStoreProduct[]>(
    `${FAKE_STORE_URL}/products?limit=${limit}`
  );

  const products: Product[] = data.map((p) => ({
    id: p.id,
    name: p.title,
    price: Number(p.price),
    image: p.image,
    category: p.category,
  }));

  cache = { products, expiresAt: now + CACHE_TTL_MS, limit };
  return products;
}

export async function getProductById(productId: number): Promise<Product | undefined> {
  const products = await fetchProducts();
  return products.find((p) => p.id === productId);
}


