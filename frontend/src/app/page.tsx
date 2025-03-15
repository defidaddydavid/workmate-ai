import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TranscriptionSection from '@/components/sections/TranscriptionSection';
import SchedulingSection from '@/components/sections/SchedulingSection';
import TaskSection from '@/components/sections/TaskSection';
import CTASection from '@/components/sections/CTASection';
import IntegrationsSection from '@/components/sections/IntegrationsSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <HeroSection />
        <IntegrationsSection />
        <TranscriptionSection />
        <SchedulingSection />
        <TaskSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
