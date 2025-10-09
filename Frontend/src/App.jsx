import { useState, useEffect } from 'react'; // Import useEffect for scroll logic
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation for scroll logic
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Component Imports
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/Footer'; // 👈 ADDED: Import the Footer
import WhatsappFloatingButton from './components/common/WhatsappFloatingButton';

// Page Imports
import Home from '@/pages/Home';
import Authenticator from '@/pages/Authenticator';
import About from '@/components/about/About'; // Note: This should ideally be '@/pages/About' for consistency
import TrendingSupplement from '@/pages/TrendingSupplement';
import WellnessPage from '@/pages/Wellness';
import MostLovedBestsellersPage from '@/pages/MostLovedBestsellers';
import ApparelandAccessoriesPage from '@/pages/ApparelandAccessories';
import Blogs from "./pages/Blogs";
import TrackOrder from "./pages/TrackOrder";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Custom Hook for Scroll-to-Top functionality (Inline to avoid a new file)
const useScrollToTop = () => {
    // Gets the current route path
    const { pathname } = useLocation();

    useEffect(() => {
        // Scrolls the window to the top (0, 0) whenever the pathname changes
        window.scrollTo(0, 0);
    }, [pathname]); // Re-run effect only when 'pathname' changes
    
    return null;
};


function App() {
  const [count, setCount] = useState(0);

  // 1. 💥 CALL THE SCROLL HOOK HERE 💥
  // This must be inside the component function but outside the JSX return block.
  useScrollToTop(); 

  return (
    // You should wrap everything in <BrowserRouter> in your index.js, 
    // but the layout below is correct for the App component.
    <>
      <Navbar />
      
      {/* Main content area */}
      <main className='min-h-[80vh]'> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authenticator" element={<Authenticator />} />
          <Route path="/about" element={<About />} />
          <Route path="/trending" element={<TrendingSupplement />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/most-loved-bestsellers" element={<MostLovedBestsellersPage />} />
          <Route path="/apparel-accessories" element={<ApparelandAccessoriesPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </main>
      
      

      <WhatsappFloatingButton />
    </>
  )
}

export default App