import { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../api/client';
import { Cart } from '../types';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const data = await getCart();
    setCart(data);
  }

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Link to="/" className="border rounded px-3 py-2">Continue Shopping</Link>
      </header>

      {loading && <div>Loading...</div>}
      {!loading && (!cart || cart.items.length === 0) && <div>Your cart is empty.</div>}

      {cart && cart.items.length > 0 && (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded border bg-white p-3">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">Qty: {item.qty}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">₹{(item.unitPrice * item.qty).toFixed(2)}</div>
                <button
                  className="text-red-600 border rounded px-3 py-1"
                  onClick={async () => { await removeFromCart(item.id); await refresh(); }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-lg font-semibold">₹{cart.total.toFixed(2)}</div>
          </div>

          <Link to="/checkout" className="bg-indigo-600 text-white px-4 py-2 rounded self-end inline-block">Checkout</Link>
        </div>
      )}
    </div>
  );
}


