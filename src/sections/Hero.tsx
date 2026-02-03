import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStoreConfig } from '@/hooks/use-store-config';

export function Hero() {
  const storeConfig = useStoreConfig();
  
  const scrollToForm = () => {
    const formSection = document.getElementById('prebooking-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format address for display
  const formattedAddress = [
    storeConfig.address.line1,
    storeConfig.address.line2,
    storeConfig.address.line3,
    `${storeConfig.address.city}, ${storeConfig.address.state} ${storeConfig.address.pincode}`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <section className="relative w-full bg-white pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-dark tracking-tight mb-4 animate-slide-up">
          Grand Store Launch
        </h1>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-slate tracking-tight mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Pre-Book for Exclusive Benefits
        </h2>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <MapPin className="w-5 h-5 text-brand-slate" />
          <span className="text-base md:text-lg">
            {storeConfig.name}
          </span>
        </div>
        
        <p className="text-slate-500 text-sm md:text-base mb-8 animate-slide-up" style={{ animationDelay: '0.25s' }}>
          {formattedAddress}
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Pay just <span className="font-semibold text-brand-dark">₹499*</span> today to unlock special discounts, free accessories, and priority purchase on launch day.
        </p>

        {/* Disclaimer */}
        <p className="text-sm text-slate-500 mb-2 animate-slide-up" style={{ animationDelay: '0.35s' }}>
          ₹499 is fully redeemable at the store. *T&C apply.
        </p>
        <p className="text-sm text-red-500 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {storeConfig.disclaimer}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.45s' }}>
          <Button 
            onClick={scrollToForm}
            className="bg-brand-green hover:bg-[#5fa038] text-white px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Pre-Book Now for ₹499*
          </Button>
          <button 
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 text-brand-slate hover:text-brand-dark font-medium transition-colors"
          >
            View Launch Offers
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
