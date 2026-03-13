import { HeroGlobal } from '@/components/sections/HeroGlobal';
import { ScrollVideo } from '@/components/sections/ScrollVideo';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { SavingsPreview } from '@/components/sections/SavingsPreview';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { RolesGrid } from '@/components/sections/RolesGrid';
import { AIShowcase } from '@/components/sections/AIShowcase';
import { VettingProcess } from '@/components/sections/VettingProcess';
import { Stats } from '@/components/sections/Stats';
import { Guarantee } from '@/components/sections/Guarantee';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <main>
      <HeroGlobal />
      <ScrollVideo />
      <Stats />
      <HowItWorks />
      <SavingsPreview />
      <ServicesOverview />
      <AIShowcase />
      <RolesGrid />
      <VettingProcess />
      <Guarantee />
      <FinalCTA />
    </main>
  );
}
