import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import AskSabbPe from './AskSabbPe';
import GoLiveCurve from './GoLiveCurve';
import Hero from './Hero';
import PaymentFlow from './PaymentFlow';
import ProductsIndex from './ProductsIndex';
import StatsCard from './StatsCard';
import Testimonials from './Testimonials';
import TechStackShowcase from './TechStackShowcase';
import WhyStatement from './WhyStatement';

export default function RedesignHomePage() {
  return (
    <div className="relative min-h-screen w-full bg-white text-[#0F172A] selection:bg-[#0457F1] selection:text-white">
      <Navbar />
      <Hero />
      <TechStackShowcase />
      <WhyStatement />
      <PaymentFlow />
      <GoLiveCurve />
      <ProductsIndex />
      <StatsCard />
      <Testimonials />
      <AskSabbPe />
      <Footer />
    </div>
  );
}
