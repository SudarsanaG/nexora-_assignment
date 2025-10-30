import { Router, Request } from 'express';
import { z } from 'zod';
import { addToCart, getCart, removeFromCart, setCartItemQty } from '../services/cart';

const router = Router();

function getUserId(req: Request): string {
  const header = (req.header('x-user-id') || '').trim();
  return header || 'demo-user';
}

router.get('/', (req, res) => {
  const userId = getUserId(req);
  const cart = getCart(userId);
  res.json(cart);
});

const addSchema = z.object({
  productId: z.number(),
  qty: z.number().int().min(1).default(1),
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = addSchema.parse(req.body);
    const userId = getUserId(req);
    const cart = await addToCart(userId, parsed.productId, parsed.qty);
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res) => {
  const userId = getUserId(req);
  const cart = removeFromCart(userId, req.params.id);
  res.json(cart);
});

const updateSchema = z.object({ qty: z.number().int().min(0) });
router.patch('/:id', (req, res, next) => {
  try {
    const parsed = updateSchema.parse(req.body);
    const userId = getUserId(req);
    const cart = setCartItemQty(userId, req.params.id, parsed.qty);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

export default router;


