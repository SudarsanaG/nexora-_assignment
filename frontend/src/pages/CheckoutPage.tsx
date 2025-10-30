import { FormEvent, useEffect, useState } from 'react';
import { checkout, getCart } from '../api/client';
import { Cart, Receipt } from '../types';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const c = await getCart();
      setCart(c);
    })();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!cart) return;
    setError(null);
    try {
      const r = await checkout({
        name,
        email,
        items: cart.items.map((i) => ({ productId: i.productId, qty: i.qty })),
      });
      setReceipt(r);
    } catch (e: any) {
      setError(e?.message || 'Checkout failed');
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Link to="/cart" className="border rounded px-3 py-2">Back to Cart</Link>
      </header>

      {receipt ? (
        <div className="rounded border bg-white p-4">
          <div className="text-lg font-semibold mb-2">Receipt</div>
          <div>Order: {receipt.orderId}</div>
          <div>Total: ₹{receipt.total.toFixed(2)}</div>
          <div className="text-sm text-gray-500">{new Date(receipt.timestamp).toLocaleString()}</div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded border px-3 py-2" required />
          </div>
          {cart && (
            <div className="text-sm text-gray-600">Payable: ₹{cart.total.toFixed(2)}</div>
          )}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      )}
    </div>
  );
}


