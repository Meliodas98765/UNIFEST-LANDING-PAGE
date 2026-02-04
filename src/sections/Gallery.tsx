import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  '/gallery-launch-day.jpg',
  '/gallery-happy-customers.jpg',
  '/gallery-apple-moments.jpg',
  '/gallery-prebooked.jpg',
  '/gallery-launch-day.jpg', // Add more images - replace with actual image paths
  '/gallery-happy-customers.jpg',
  '/gallery-apple-moments.jpg',
  '/gallery-prebooked.jpg',
];

const IMAGES_PER_VIEW = 4;

export function Gallery() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleImages = galleryImages.slice(startIndex, startIndex + IMAGES_PER_VIEW);

  const goToPrevious = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - IMAGES_PER_VIEW : Math.max(0, prevIndex - IMAGES_PER_VIEW)
    );
  };

  const goToNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex >= galleryImages.length - IMAGES_PER_VIEW ? 0 : prevIndex + IMAGES_PER_VIEW
    );
  };

  const canGoPrevious = startIndex > 0;
  const canGoNext = startIndex < galleryImages.length - IMAGES_PER_VIEW;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {canGoPrevious && (
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors"
              aria-label="Previous images"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
          )}
          {canGoNext && (
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors"
              aria-label="Next images"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          )}

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
