import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const galleryImages = [

  '/gallery-prebooked.jpg',
  '/gallery-launch-day.jpg', // Add more images - replace with actual image paths
  '/gallery-happy-customers.jpg',
  '/gallery-apple-moments.jpg',
  '/gallery-prebooked.jpg',
  '/images.jpg',
];

const IMAGES_PER_VIEW_DESKTOP = 4;
const IMAGES_PER_VIEW_MOBILE = 1;

export function Gallery() {
  const isMobile = useIsMobile();
  const [startIndex, setStartIndex] = useState(0);

  const imagesPerView = isMobile ? IMAGES_PER_VIEW_MOBILE : IMAGES_PER_VIEW_DESKTOP;
  const visibleImages = galleryImages.slice(startIndex, startIndex + imagesPerView);

  const goToPrevious = () => {
    setStartIndex((prevIndex) => {
      if (isMobile) {
        // On mobile, go to previous single image
        return prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1;
      } else {
        // On desktop, slide one image at a time
        return prevIndex === 0 ? galleryImages.length - imagesPerView : prevIndex - 1;
      }
    });
  };

  const goToNext = () => {
    setStartIndex((prevIndex) => {
      if (isMobile) {
        // On mobile, go to next single image
        return prevIndex >= galleryImages.length - 1 ? 0 : prevIndex + 1;
      } else {
        // On desktop, slide one image at a time
        const maxStartIndex = galleryImages.length - imagesPerView;
        return prevIndex >= maxStartIndex ? 0 : prevIndex + 1;
      }
    });
  };

  const canGoPrevious = isMobile ? startIndex > 0 : startIndex > 0;
  const canGoNext = isMobile
    ? startIndex < galleryImages.length - 1
    : startIndex < galleryImages.length - imagesPerView;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {/* Always show arrows on both sides */}
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center transition-colors ${isMobile
              ? 'translate-x-2'
              : '-translate-x-4'
              } ${canGoPrevious
                ? 'hover:bg-slate-50 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
              }`}
            aria-label="Previous images"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center transition-colors ${isMobile
              ? '-translate-x-2'
              : 'translate-x-4'
              } ${canGoNext
                ? 'hover:bg-slate-50 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
              }`}
            aria-label="Next images"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>

          {/* Images Grid */}
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'}`}>
            {visibleImages.map((image, index) => (
              <div
                key={startIndex + index}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Gallery image ${startIndex + index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
