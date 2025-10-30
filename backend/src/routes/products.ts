import { Router } from 'express';
import { fetchProducts } from '../services/products';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const raw = req.query.limit;
    const limit = typeof raw === 'string' ? Math.max(1, Math.min(50, parseInt(raw, 10) || 20)) : 20;
    const products = await fetchProducts(limit);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

export default router;


