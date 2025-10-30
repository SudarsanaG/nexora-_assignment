import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const count = useCartStore((s) => s.count);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const currentCat = new URLSearchParams(search).get('cat');

  function goToCategory(cat: 'men' | 'women' | 'children') {
    const params = new URLSearchParams(search);
    params.set('cat', cat);
    navigate(`${pathname}?${params.toString()}`);
    setOpen(false);
  }
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto p-4">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <button aria-label="Menu" className="p-2 rounded hover:bg-gray-100">
            <Menu className="h-5 w-5 text-gray-700" />
          </button>

          <Link to="/" className="font-semibold lg:text-3xl md:text-2xl sm:text-xl">
            Nexora
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link to="#" className="hover:text-gray-900 text-gray-700">About</Link>
            <Link to="#" className="hover:text-gray-900 text-gray-700">FAQs</Link>
            <Link to="/cart" aria-label="Cart" className="relative p-2 rounded hover:bg-gray-100">
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <button
                className="inline-flex items-center gap-2 rounded-full bg-gray-50 border px-4 py-2 text-gray-700"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
              >
                <span>Categories</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              {open && (
                <div className="absolute z-40 mt-2 w-44 rounded-xl border bg-white shadow-lg overflow-hidden">
                  <button onClick={() => goToCategory('men')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Men</button>
                  <button onClick={() => goToCategory('women')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Women</button>
                  <button onClick={() => goToCategory('children')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Children</button>
                </div>
              )}
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-gray-50 border px-4 py-2 text-gray-700">
              <span>New Product</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            <div className="flex-1">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto">
            <button
              onClick={() => goToCategory('men')}
              className={
                'rounded-full border px-4 py-2 ' +
                (currentCat === 'men' ? 'bg-black text-white border-black' : 'bg-white')
              }
            >
              Men
            </button>
            <button
              onClick={() => goToCategory('women')}
              className={
                'rounded-full border px-4 py-2 ' +
                (currentCat === 'women' ? 'bg-black text-white border-black' : 'bg-white')
              }
            >
              Women
            </button>
            <button
              onClick={() => goToCategory('children')}
              className={
                'rounded-full border px-4 py-2 ' +
                (currentCat === 'children' ? 'bg-black text-white border-black' : 'bg-white')
              }
            >
              Children
            </button>
            <button className="rounded-full border px-4 py-2 bg-white">Brands</button>
          </div>
        </div>
      </div>
    </nav>
  );
}


