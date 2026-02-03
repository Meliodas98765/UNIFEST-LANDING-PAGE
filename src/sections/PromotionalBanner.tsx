import { useRef, useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const carouselImages = [
  '/ctc_1.webp',
  '/ctc_2.webp',
  '/ctc_3.webp',
  '/ctc_4.webp',
];

export function PromotionalBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0 basis-full">
              <div className="relative w-full flex items-center justify-center overflow-hidden">
                <img
                  src={image}
                  alt={`Promotional banner ${index + 1}`}
                  className="w-full h-auto object-contain sm:object-cover object-center"
                  loading="eager"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`rounded-full transition-all duration-300 ${current === index
              ? 'bg-slate-800 w-5 h-2 sm:w-6 sm:h-2'
              : 'bg-slate-300 hover:bg-slate-400 w-2 h-2'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
