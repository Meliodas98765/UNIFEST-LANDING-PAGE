import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    hashtag: '#LaunchDayVibes',
    title: 'Launch Day Vibes',
    subtitle: 'iPhone 17 Pro',
    image: '/gallery-launch-day.jpg',
  },
  {
    id: 2,
    hashtag: '#HappyCustomers',
    title: 'Happy Customers',
    subtitle: 'MacBook Air M4',
    image: '/gallery-happy-customers.jpg',
  },
  {
    id: 3,
    hashtag: '#AppleMoments',
    title: 'Apple Moments',
    subtitle: 'iPad Pro',
    image: '/gallery-apple-moments.jpg',
  },
  {
    id: 4,
    hashtag: '#PreBookedPickedUp',
    title: 'Pre-Booked. Picked Up.',
    subtitle: 'iPhone 16 Series',
    image: '/gallery-prebooked.jpg',
  },
];

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-dark mb-4">
            Real People. Real Apple Moments.
          </h2>
          <p className="text-lg text-slate-500">
            Experience the excitement at our stores.
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors hidden md:flex"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Hashtag Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      {item.hashtag}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
