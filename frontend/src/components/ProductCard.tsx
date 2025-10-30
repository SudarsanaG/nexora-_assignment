import { useState } from 'react';
import { Product } from '../types';

type Props = {
  product: Product;
  onAdd: (productId: number) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  const [justAdded, setJustAdded] = useState(false);

  async function handleAdd() {
    await onAdd(product.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="relative rounded-xl border bg-white shadow-sm p-4 flex flex-col">
      {justAdded && (
        <div
          className="absolute -top-2 right-2 translate-y-[-50%] rounded-md bg-green-600 text-white text-xs px-2 py-1 shadow"
          role="status"
          aria-live="polite"
        >
          Added to cart
        </div>
      )}
      <img src={product.image} alt={product.name} className="h-40 object-contain mb-3" />
      <div className="font-medium line-clamp-2 min-h-[3.25rem]">{product.name}</div>
      <div className="mt-2 text-sm text-gray-500">{product.category}</div>
      <div className="mt-auto flex items-center justify-between pt-4">
        <div className="text-lg font-semibold">₹{product.price.toFixed(2)}</div>
        <button
          className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
          onClick={handleAdd}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


