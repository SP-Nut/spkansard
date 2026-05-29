import { EstimateCalculator } from "./components/EstimateCalculator";
import { EstimateFAQ } from "./components/EstimateFAQ";
import { EstimateHero } from "./components/EstimateHero";
import { TrustSection } from "./components/TrustSection";

export default function EstimatePage() {
  return (
    <main className="min-h-screen bg-[#f4fbff] text-slate-950">
      <EstimateHero />
      <EstimateCalculator />
      <TrustSection />
      <EstimateFAQ />
    </main>
  );
}
