import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const params = new URLSearchParams(search);
  const currentQ = params.get('q') || '';
  const [query, setQuery] = useState(currentQ);

  useEffect(() => {
    setQuery(currentQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = new URLSearchParams(search);
    if (query.trim()) {
      next.set('q', query.trim());
    } else {
      next.delete('q');
    }
    navigate(`${pathname}?${next.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 max-w-xl mx-4">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border px-3 py-2 pr-9 bg-white placeholder-gray-400"
        />
        <Search aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </form>
  );
}


