import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import CampusesSection from '../components/sections/CampusesSection';
import AcademicsSection from '../components/sections/AcademicsSection';
import ActivitiesSection from '../components/sections/ActivitiesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import NewsSection from '../components/sections/NewsSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CampusesSection />
      <AcademicsSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <NewsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
