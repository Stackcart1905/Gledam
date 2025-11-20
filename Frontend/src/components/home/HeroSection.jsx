import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 0,
    title: 'Gledam Protein',
    subtitle: 'Premium Whey Isolate',
    tag: 'New Launch • Limited Time Offer',
    specs: ['24g Protein', '5.5g BCAA', 'Low Sugar', 'Zero Artificial Sweeteners'],
    bg: 'from-red-600 via-red-500 to-red-600',
    image: 'https://media.istockphoto.com/id/609625242/photo/whey-protein-container-and-fitness-dumbbells.jpg?s=612x612&w=0&k=20&c=C-Mgptq8LkAPJNEMtarAfbpEXt_DtFZtbro-VgnQgeA=',
    cta: 'New Launch',
    discount: '25% OFF'
  },
  {
    id: 1,
    title: 'Gledam Creatine',
    subtitle: 'Micronized Monohydrate',
    tag: 'Buy 3 Get 1 Free',
    specs: ['Fast Absorption', 'Pure Formula', 'Enhanced Performance', 'Lab Tested'],
    bg: 'from-slate-800 via-slate-700 to-slate-800',
    image: 'https://images.unsplash.com/photo-1693996046514-0406d0773a7d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    cta: 'Best Seller',
    discount: 'BUY 3 GET 1 FREE'
  },
  {
    id: 2,
    title: 'Gledam Pre-Workout',
    subtitle: 'Explosive Energy',
    tag: 'New Formula • Enhanced Focus',
    specs: ['Caffeine Boost', 'Pump Enhancer', 'Zero Crash', 'Fruit Punch Flavor'],
    bg: 'from-blue-600 via-blue-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1704650311981-419f841421cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
    cta: 'Experience Power',
    discount: '30% OFF'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full text-white select-none">
      <div className="relative overflow-hidden bg-gray-800 rounded-2xl mx-4 my-6 shadow-2xl ">
        {/* Main slider container */}
        <div className="min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[460px] w-full">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0">
                <div className={`h-full w-full bg-gradient-to-r ${slide.bg} flex flex-col md:flex-row items-center justify-between p-6 md:p-12`}>
                  {/* Text content */}
                  <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-semibold inline-block mb-4">
                      {slide.tag}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">{slide.title}</h1>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white/90">{slide.subtitle}</h2>
                    
                    {/* Discount badge */}
                    <div className="bg-yellow-500 text-black font-bold rounded-full px-4 py-2 inline-block mb-6 animate-pulse">
                      {slide.discount}
                    </div>
                    
                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {slide.specs.map((spec, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-sm md:text-base">{spec}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {slide.cta}
                    </button>
                  </div>
                  
                  {/* Image */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 transform rotate-6 hover:rotate-3 transition-transform duration-500">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-xl"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-black/30 backdrop-blur-sm rounded-full p-4 animate-bounce">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full p-1 hover:bg-black/50 transition-all"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full p-1 hover:bg-black/50 transition-all"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-3 w-3 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;