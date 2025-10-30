import { Router, Request } from 'express';
import { z } from 'zod';
import { getCart } from '../services/cart';
import { Receipt } from '../types';

const router = Router();

function getUserId(req: Request): string {
  const header = (req.header('x-user-id') || '').trim();
  return header || 'demo-user';
}

const checkoutSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  items: z.array(
    z.object({
      productId: z.number(),
      qty: z.number().int().min(1),
    })
  ),
});

router.post('/', (req, res, next) => {
  try {
    const parsed = checkoutSchema.parse(req.body);
    const userId = getUserId(req);
    const cart = getCart(userId);

    // Simple validation: ensure items match current cart contents
    const requestedTotal = parsed.items.reduce((sum, it) => {
      const match = cart.items.find((ci) => ci.productId === it.productId);
      if (!match) return sum;
      return sum + match.unitPrice * Math.min(match.qty, it.qty);
    }, 0);

    const receipt: Receipt = {
      orderId: `ORD-${Date.now()}`,
      total: Number(requestedTotal.toFixed(2)),
      timestamp: new Date().toISOString(),
    };

    // Clear the user's cart after successful checkout
    cart.items = [];
    cart.total = 0;

    res.status(201).json(receipt);
  } catch (err) {
    next(err);
  }
});

export default router;


