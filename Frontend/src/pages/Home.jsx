import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TalkOfTheTown from '@/components/home/TalkOfTheTown';
import Wellness from '@/components/home/Wellness';
import MostLovedBestsellers from '@/components/home/MostLovedBestsellers';
import ShopByFlavours from '@/components/home/ShopByFlavours';
import LearningFlexing from '@/components/home/LearningFlexing';
import BeastStories from '@/components/home/BeastStories';
import ApparelAccessories from '@/components/home/ApparelAccessories';
import SuperSaverCombos from '@/components/home/SuperSaverCombos';
import SuperSaverCombosSlider from '@/components/home/SuperSaverCombosSlider';
import ShopByCategory from '@/components/home/ShopByCategory';
import Testimonials from '@/components/home/Testimonials';
import BrandMarqueeStrip from '@/components/home/BrandMarqueeStrip';
import Gledamgram from '@/components/home/Gledamgram';

const Home = () => {
  // const [chatOpen, setChatOpen] = useState(false);
  return (
  <>
      <HeroSection />
      <TalkOfTheTown />
      <Wellness />
      <MostLovedBestsellers />
      <ShopByFlavours />
      <LearningFlexing />
      <BeastStories />
      <ApparelAccessories />
      <SuperSaverCombos />
      <SuperSaverCombosSlider />
      <ShopByCategory />
      <Testimonials />
      <BrandMarqueeStrip />
      <Gledamgram />
  
  {/* <ChatbotFloatingLogo onClick={() => setChatOpen(true)} /> */}
  {/* <ChatbotPanel open={chatOpen} onClose={() => setChatOpen(false)} /> */}
    </>
  );
};

export default Home;
