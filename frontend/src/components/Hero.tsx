import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const imageUrl =
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3';

  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="relative h-[360px] sm:h-[440px] lg:h-[520px] overflow-hidden rounded-3xl">
        <img
          src={imageUrl}
          alt="Summer fashion collection"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            New Season, New Essentials
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-white/90">
            Refresh your wardrobe with pieces crafted for all‑day comfort and effortless style.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-6 py-3 font-semibold shadow-sm hover:bg-gray-100"
          >
            Shop the Collection
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}


