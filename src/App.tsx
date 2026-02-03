import { useEffect } from 'react';
import { Header } from '@/sections/Header';
import { PromotionalBanner } from '@/sections/PromotionalBanner';
import { Hero } from '@/sections/Hero';
import { TrustBadges } from '@/sections/TrustBadges';
import { PrebookingForm } from '@/sections/PrebookingForm';
import { Gallery } from '@/sections/Gallery';
import { HowItWorks } from '@/sections/HowItWorks';
import { FAQ } from '@/sections/FAQ';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { useStoreConfig } from '@/hooks/use-store-config';

function App() {
  const storeConfig = useStoreConfig();

  useEffect(() => {
    document.title = storeConfig.pageTitle;
  }, [storeConfig.pageTitle]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PromotionalBanner />
      <TrustBadges />
      <Hero />
      <PrebookingForm />
      <Gallery />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;
