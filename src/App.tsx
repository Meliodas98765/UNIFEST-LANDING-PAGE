import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { PromotionalBanner } from '@/sections/PromotionalBanner';
import { Hero } from '@/sections/Hero';
import { TrustBadges } from '@/sections/TrustBadges';
import { PrebookingForm } from '@/sections/PrebookingForm';
import { Gallery } from '@/sections/Gallery';
import { Footer } from '@/sections/Footer';
import { ThankYou } from '@/pages/ThankYou';
import { useStoreConfig } from '@/hooks/use-store-config';

function HomePage() {
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
      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
