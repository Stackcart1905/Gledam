import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/navbar'
import WhatsappFloatingButton from './components/common/WhatsappFloatingButton';
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Authenticator from '@/pages/Authenticator'
import About from '@/components/about/About';
import TrendingSupplement from '@/pages/TrendingSupplement';
import WellnessPage from '@/pages/Wellness';
import MostLovedBestsellersPage from '@/pages/MostLovedBestsellers';
import ApparelandAccessoriesPage from '@/pages/ApparelandAccessories';
import Blogs from "./pages/Blogs";
import TrackOrder from "./pages/TrackOrder";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
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
      </Routes>
      <WhatsappFloatingButton />
    </>
  )
}

export default App
