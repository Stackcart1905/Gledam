import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/Footer';
import WhatsappFloatingButton from './components/common/WhatsappFloatingButton';
import Chatbot from './components/common/Chatbot';

// Pages
import Home from '@/pages/Home';
import Authenticator from '@/pages/Authenticator';
import About from '@/components/about/About';
import TrendingSupplement from '@/pages/TrendingSupplement';
import WellnessPage from '@/pages/Wellness';
import MostLovedBestsellersPage from '@/pages/MostLovedBestsellers';
import ApparelandAccessoriesPage from '@/pages/ApparelandAccessories';
import Blogs from "./pages/Blogs";
import TrackOrder from "./pages/TrackOrder";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import GledamCash from './pages/GledamCash';
import ReferAndEarn from './pages/ReferAndEarn';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import CategoryProducts from './pages/CategoryProducts';
import AuthTest from './pages/AuthTest';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetails from './pages/OrderDetails';
import SearchResults from './pages/SearchResults';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TestProducts from "./TestProducts";

// 👇 Custom hook to scroll to top on route change
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function App() {
  useScrollToTop();

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authenticator" element={<Authenticator />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/trending" element={<TrendingSupplement />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/most-loved-bestsellers" element={<MostLovedBestsellersPage />} />
          <Route path="/apparel-accessories" element={<ApparelandAccessoriesPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/gledam-cash" element={<GledamCash />} />
          <Route path="/refer-earn" element={<ReferAndEarn />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/auth-test" element={<AuthTest />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/creatine" element={<CategoryProducts category="Creatine" />} />
          <Route path="/protein" element={<CategoryProducts category="Protein Powder" />} />
          <Route path="/massgainer" element={<CategoryProducts category="Mass Gainer" />} />
          <Route path="/multivitamins" element={<CategoryProducts category="Multivitamins" />} />
          <Route path="/bcaa" element={<CategoryProducts category="BCAA" />} />
          <Route path="/peanutbutter" element={<CategoryProducts category="Peanut Butter" />} />
             <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/test-products" element={<TestProducts />} />
        </Routes>
      </main>

      <Footer />
      <WhatsappFloatingButton />
      <Chatbot />
    </>
  );
}

export default App;