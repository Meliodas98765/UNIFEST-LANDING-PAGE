import { Button } from '@/components/ui/button';

export function CTA() {
  const scrollToForm = () => {
    const formSection = document.getElementById('prebooking-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-brand-dark mb-8">
          Don't Miss Launch-Day Benefits
        </h2>
        <Button
          onClick={scrollToForm}
          className="bg-brand-green hover:bg-[#5fa038] text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Pre-Book Now for ₹499*
        </Button>
      </div>
    </section>
  );
}
