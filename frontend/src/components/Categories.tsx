import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api/client';
import { Product } from '../types';

export default function Categories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'men' | 'women' | 'children'>('all');

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts(20);
        setProducts(data);
      } catch {
        setProducts([]);
      }
    })();
  }, []);

  // Clothing-only categories present in Fake Store
  const menCategory = "men's clothing";
  const womenCategory = "women's clothing";

  const clothingProducts = useMemo(() => {
    const includeClothing = /(shirt|t-shirt|tee|jacket|coat|jean|trouser|pant|dress|blouse|skirt|sleeve|hoodie|sweater)/i;
    const excludeAccessories = /(bag|backpack|wallet|belt|jewel|watch|shoe|sandal|ring|necklace|bracelet)/i;
    return products.filter(
      (p) =>
        (p.category === menCategory || p.category === womenCategory) &&
        includeClothing.test(p.name) &&
        !excludeAccessories.test(p.name)
    );
  }, [products]);

  // Curated Unsplash images to improve visual appeal (clothing-focused, no faces)
  const CURATED_IMAGES: Record<'men' | 'women' | 'children', string[]> = {
    men: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // folded shirts
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // jacket flatlay
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // hoodie
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // denim
    ],
    women: [
      'https://images.unsplash.com/photo-1544441893-3539a3c72edb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // dresses rack
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // knitwear
      'https://images.unsplash.com/photo-1520975941371-c0e77b2ea0f1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // tees stack
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // garment rail
    ],
    children: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // kids clothes rail
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // kids knitwear
      'https://images.unsplash.com/photo-1520975941371-c0e77b2ea0f1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // tees stack
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // neutral apparel
    ],
  };

  const filtered = useMemo(() => {
    let list: Product[];
    if (filter === 'all') list = clothingProducts;
    else if (filter === 'men') list = clothingProducts.filter((p) => p.category === menCategory);
    else if (filter === 'women') list = clothingProducts.filter((p) => p.category === womenCategory);
    else {
      // children: best-effort heuristic using keywords, fallback by price
      const keywords = /(kid|child|boy|girl|toddler|youth)/i;
      const byKeyword = clothingProducts.filter((p) => keywords.test(p.name));
      list = byKeyword.length > 0 ? byKeyword : clothingProducts.filter((p) => p.price <= 30);
    }
    return list.slice(0, 4);
  }, [filter, clothingProducts]);

  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Browse by categories</h3>
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'men', 'women', 'children'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={
                'rounded-full px-4 py-2 text-sm border whitespace-nowrap ' +
                (filter === key
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 hover:bg-gray-50')
              }
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((p, idx) => {
          const group: 'men' | 'women' | 'children' =
            p.category === menCategory ? 'men' : p.category === womenCategory ? 'women' : 'children';
          const curated = CURATED_IMAGES[group];
          const displayImage = curated[idx % curated.length] || p.image;
          return (
          <div key={p.id} className="relative h-36 sm:h-40 rounded-3xl overflow-hidden">
            <img
              referrerPolicy="no-referrer"
              src={displayImage}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== p.image) {
                  target.src = p.image; // fallback to Fake Store product image
                }
              }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <span className="absolute left-3 bottom-3 inline-block rounded-full bg-white text-gray-900 px-3 py-1 text-xs font-semibold shadow">
              {p.name.length > 16 ? p.name.slice(0, 16) + '…' : p.name}
            </span>
          </div>
        )})}
      </div>
    </section>
  );
}


