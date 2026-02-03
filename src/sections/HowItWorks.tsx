import { Sparkles, CreditCard, Package } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    title: 'Select & Fill',
    description: 'Choose your preferred device and enter your details.',
  },
  {
    icon: CreditCard,
    title: 'Pay ₹499',
    description: 'Secure your slot and exclusive launch benefits.',
  },
  {
    icon: Package,
    title: 'Visit & Redeem',
    description: 'Come to the store, pay the rest, and pick up your device.',
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-dark mb-4">
            How Pre-Booking Works
          </h2>
          <p className="text-lg text-slate-500">
            Three simple steps to your new Apple device.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-brand-slate" />
                </div>
                {/* Step Number */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-dark text-white text-xs font-medium flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-brand-dark mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
