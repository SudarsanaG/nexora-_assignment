import { Cart, CartItem } from '../types';
import { getProductById } from './products';

// Simple in-memory cart store keyed by user id
const userIdToCart: Map<string, Cart> = new Map();

function getOrCreateCart(userId: string): Cart {
  const existing = userIdToCart.get(userId);
  if (existing) return existing;
  const cart: Cart = { items: [], total: 0 };
  userIdToCart.set(userId, cart);
  return cart;
}

function recalcTotal(cart: Cart): void {
  cart.total = Number(
    cart.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0).toFixed(2)
  );
}

export function getCart(userId: string): Cart {
  const cart = getOrCreateCart(userId);
  recalcTotal(cart);
  return cart;
}

export async function addToCart(
  userId: string,
  productId: number,
  qty: number
): Promise<Cart> {
  const cart = getOrCreateCart(userId);
  const clampedQty = Math.max(1, Math.floor(qty));

  const product = await getProductById(productId);
  if (!product) {
    throw Object.assign(new Error('Product not found'), { status: 404 });
  }

  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    existing.qty += clampedQty;
  } else {
    const item: CartItem = {
      id: `${productId}-${Date.now()}`,
      productId,
      name: product.name,
      unitPrice: product.price,
      qty: clampedQty,
    };
    cart.items.push(item);
  }

  recalcTotal(cart);
  return cart;
}

export function removeFromCart(userId: string, cartItemId: string): Cart {
  const cart = getOrCreateCart(userId);
  cart.items = cart.items.filter((i) => i.id !== cartItemId);
  recalcTotal(cart);
  return cart;
}

export function setCartItemQty(userId: string, cartItemId: string, qty: number): Cart {
  const cart = getOrCreateCart(userId);
  const clamped = Math.max(0, Math.floor(qty));
  const item = cart.items.find((i) => i.id === cartItemId);
  if (!item) return cart;
  if (clamped <= 0) {
    cart.items = cart.items.filter((i) => i.id !== cartItemId);
  } else {
    item.qty = clamped;
  }
  recalcTotal(cart);
  return cart;
}


