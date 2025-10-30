import { useEffect, useMemo, useState } from 'react';
import { addToCart, getProducts } from '../api/client';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Link, useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Promotions from '../components/Promotions';
import Categories from '../components/Categories';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts(20);
        const onlyClothing = data.filter(
          (p) => p.category === "men's clothing" || p.category === "women's clothing"
        );
        setProducts(onlyClothing);
      } catch (e: any) {
        setError(e?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [params] = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();
  const cat = (params.get('cat') || '').toLowerCase();
  const filtered = useMemo(() => {
    let base = products;
    if (cat === 'men') base = base.filter((p) => p.category === "men's clothing");
    else if (cat === 'women') base = base.filter((p) => p.category === "women's clothing");
    else if (cat === 'children') {
      const keywords = /(kid|child|boy|girl|toddler|youth)/i;
      const byKeyword = base.filter((p) => keywords.test(p.name));
      base = byKeyword.length > 0 ? byKeyword : base.filter((p) => p.price <= 30);
    }
    if (!q) return base;
    return base.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [q, cat, products]);

  return (
    <div>
      <Hero />
      <Promotions />
      <Categories />
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold"> Popular products</h1>
        <Link to="/cart" className="border rounded px-3 py-2">View Cart</Link>
      </header>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-gray-600">No products found.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={async (id) => {
              await addToCart(id);
            }}
          />
        ))}
      </div>
      </div>
    </div>
  );
}


