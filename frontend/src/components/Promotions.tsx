import { Link } from 'react-router-dom';

function PromoCard({
  title,
  image,
  align,
}: {
  title: string;
  image: string;
  align?: 'left' | 'right';
}) {
  return (
    <div className="relative h-44 sm:h-52 lg:h-56 rounded-3xl overflow-hidden bg-gray-100">
      <img src={image} alt="Promo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={
          'relative z-10 h-full flex items-center ' +
          (align === 'right' ? 'justify-end pr-6 sm:pr-8' : 'justify-start pl-6 sm:pl-8')
        }
      >
        <div className={(align === 'right' ? 'text-right' : 'text-left') + ' max-w-xs'}>
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            {title}
          </h3>
          <Link
            to="/"
            className="mt-4 inline-block rounded-full bg-white text-gray-900 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Promotions() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <PromoCard
          title="Where dreams meet couture"
          image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3"
          align="left"
        />
        <PromoCard
          title="Enchanting styles for all"
          image="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3"
          align="right"
        />
      </div>
    </section>
  );
}


