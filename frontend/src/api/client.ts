import axios from 'axios';
import type { Cart, Product, Receipt } from '../types';
import { useCartStore } from '../store/cart';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000',
});

// Hardcoded demo user id header
api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers['x-user-id'] = 'demo-user-123';
  return config;
});

export async function getProducts(limit = 20): Promise<Product[]> {
  const { data } = await api.get('/api/products', { params: { limit } });
  return data;
}

export async function getCart(): Promise<Cart> {
  const { data } = await api.get('/api/cart');
  try {
    const totalQty = data.items.reduce((sum: number, i: any) => sum + (i.qty || 0), 0);
    useCartStore.getState().setCount(totalQty);
  } catch {}
  return data;
}

export async function addToCart(productId: number, qty = 1): Promise<Cart> {
  const { data } = await api.post('/api/cart', { productId, qty });
  try {
    const totalQty = data.items.reduce((sum: number, i: any) => sum + (i.qty || 0), 0);
    useCartStore.getState().setCount(totalQty);
  } catch {}
  return data;
}

export async function removeFromCart(id: string): Promise<Cart> {
  const { data } = await api.delete(`/api/cart/${id}`);
  try {
    const totalQty = data.items.reduce((sum: number, i: any) => sum + (i.qty || 0), 0);
    useCartStore.getState().setCount(totalQty);
  } catch {}
  return data;
}

export async function updateCartItemQty(id: string, qty: number): Promise<Cart> {
  const { data } = await api.patch(`/api/cart/${id}`, { qty });
  try {
    const totalQty = data.items.reduce((sum: number, i: any) => sum + (i.qty || 0), 0);
    useCartStore.getState().setCount(totalQty);
  } catch {}
  return data;
}

export async function checkout(input: {
  name: string;
  email: string;
  items: { productId: number; qty: number }[];
}): Promise<Receipt> {
  const { data } = await api.post('/api/checkout', input);
  return data;
}


