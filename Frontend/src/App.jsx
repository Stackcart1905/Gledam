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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticator" element={<Authenticator />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <WhatsappFloatingButton />
    </>
  )
}

export default App
