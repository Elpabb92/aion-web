"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const cars = [
  {
    id: "ut",
    name: "AION UT",
    tagline: "Compact EV untuk Keluarga",
    price: "Mulai Rp 199 juta",
    specs: {
      range: "310 km",
      battery: "31.7 kWh",
      torque: "176 Nm",
      charging: "30-80% dalam 24 menit",
    },
    colors: ["#FFD700", "#C0C0C0", "#1a1a1a"],
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1920&q=80",
    accent: "from-yellow-400 to-orange-500",
  },
  {
    id: "y-plus",
    name: "AION Y Plus",
    tagline: "SUV Elektrik Masa Depan",
    price: "Mulai Rp 299 juta",
    specs: {
      range: "430 km (WLTP)",
      acceleration: "0-100 km/h 7.6s",
      boot: "405 L",
      power: "201 HP",
    },
    colors: ["#4169E1", "#C0C0C0", "#1a1a1a"],
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1920&q=80",
    accent: "from-blue-400 to-cyan-300",
  },
  {
    id: "v",
    name: "AION V",
    tagline: "Premium SUV 600km+ Range",
    price: "Mulai Rp 459 juta",
    specs: {
      range: "600 km",
      power: "224 HP",
      torque: "350 Nm",
      battery: "75 kWh",
    },
    colors: ["#8B4513", "#C0C0C0", "#1a1a1a"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80",
    accent: "from-purple-400 to-pink-400",
  },
  {
    id: "hyptec-ht",
    name: "HYPTEC HT",
    tagline: "Luxury EV with Gullwing Doors",
    price: "Mulai Rp 699 juta",
    specs: {
      range: "600 km+",
      power: "340 HP",
      doors: "Gullwing Doors",
      seats: "First Class Seat",
    },
    colors: ["#C0C0C0", "#1a1a1a", "#000080"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80",
    accent: "from-slate-400 to-zinc-300",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedColor, setSelectedColor] = useState<Record<string, number>>({});
  const [activeModel, setActiveModel] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modelCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % cars.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((activeSlide + 1) % cars.length);
  };

  const prevSlide = () => {
    goToSlide((activeSlide - 1 + cars.length) % cars.length);
  };

  const scrollToModel = (index: number) => {
    if (modelCarouselRef.current) {
      const container = modelCarouselRef.current;
      const cardWidth = container.querySelector('.model-card')?.clientWidth || 400;
      const gap = 24;
      const scrollPos = (cardWidth + gap) * index - (container.clientWidth - cardWidth) / 2;
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
      setActiveModel(index);
    }
  };

  const handleModelScroll = () => {
    if (modelCarouselRef.current) {
      const container = modelCarouselRef.current;
      const cardWidth = container.querySelector('.model-card')?.clientWidth || 400;
      const gap = 24;
      const scrollPos = container.scrollLeft;
      const newIndex = Math.round(scrollPos / (cardWidth + gap));
      if (newIndex !== activeModel && newIndex >= 0 && newIndex < cars.length) {
        setActiveModel(newIndex);
      }
    }
  };

  const nextModel = () => {
    const next = (activeModel + 1) % cars.length;
    scrollToModel(next);
  };

  const prevModel = () => {
    const prev = (activeModel - 1 + cars.length) % cars.length;
    scrollToModel(prev);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-[0.3em]">AION</div>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToModel(0)} className="text-sm hover:text-white/70 transition">Models</button>
            <a href="#benefits" className="text-sm text-white/60 hover:text-white transition">Benefits</a>
            <a href="#promotions" className="text-sm text-white/60 hover:text-white transition">Promotions</a>
          </nav>
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
            Hubungi Kami
          </button>
        </div>
      </header>

      {/* Hero / Models Carousel */}
      <section className="relative h-screen" ref={carouselRef}>
        {cars.map((car, index) => (
          <div
            key={car.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={car.image}
                alt={car.name}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Car Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Car Info */}
                <div className="space-y-6 pt-20 md:pt-0">
                  <div className="space-y-2">
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tight">{car.name}</h2>
                    <p className="text-xl text-white/80">{car.tagline}</p>
                    <p className="text-2xl font-semibold text-blue-400">{car.price}</p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 py-6">
                    {Object.entries(car.specs).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{key}</div>
                        <div className="font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Color Options */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white/60">Warna:</span>
                    <div className="flex gap-2">
                      {car.colors.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor({ ...selectedColor, [car.id]: i })}
                          className={`w-8 h-8 rounded-full border-2 transition ${
                            (selectedColor[car.id] ?? 0) === i ? "border-white scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-4 pt-4">
                    <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                      Learn More
                    </button>
                    <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                      Order Now
                    </button>
                  </div>
                </div>

                {/* Right: Spacer for image focus */}
                <div className="hidden md:block" />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {cars.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === activeSlide ? "w-12 bg-white" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-30 hidden md:flex items-center gap-2 text-white/50 text-sm animate-bounce">
          <span>Scroll untuk lihat lebih banyak</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Tesla-Style Model Selector Carousel */}
      <section id="models" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Model Kami</h2>
          <p className="text-gray-400 text-center mb-12">Pilih mobil listrik yang sesuai dengan kebutuhan Anda</p>
          
          {/* Tesla-Style Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevModel}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition hidden md:flex"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextModel}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition hidden md:flex"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Track */}
            <div 
              ref={modelCarouselRef}
              onScroll={handleModelScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 px-4 md:px-16 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cars.map((car, index) => (
                <div
                  key={car.id}
                  className={`model-card flex-shrink-0 snap-center transition-all duration-500 ${
                    index === activeModel ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-60'
                  }`}
                  style={{ width: '100%', maxWidth: '400px' }}
                >
                  <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-800">
                    {/* Car Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    </div>
                    
                    {/* Car Info */}
                    <div className="p-6 -mt-20 relative z-10">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                        {index === 0 ? 'Compact EV' : index === 1 ? 'SUV' : index === 2 ? 'Premium SUV' : 'Luxury SUV'}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-1">{car.name}</h3>
                      <p className="text-blue-400 font-semibold text-lg mb-4">{car.price}</p>
                      
                      {/* Quick Specs */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {Object.entries(car.specs).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{key}</div>
                            <div className="font-semibold text-white text-sm">{value}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                          Learn More
                        </button>
                        <button className="flex-1 border border-white/30 text-white py-3 rounded-full font-semibold hover:bg-white/10 transition">
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {cars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToModel(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeModel ? "w-12 bg-white" : "w-3 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">Mengapa Memilih EV?</h2>
          <p className="text-gray-500 text-center mb-16">Keuntungan memiliki mobil listrik AION</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Hemat Energi", desc: "Biaya operasional lebih rendah dari mobil bensin" },
              { icon: "🌱", title: "Ramah Lingkungan", desc: "Zero emisi, kontribusi untuk bumi yang lebih baik" },
              { icon: "🚀", title: "Canggih", desc: "Teknologi AI dan fitur-fitur mutakhir" },
              { icon: "🛡️", title: "Garansi Panjang", desc: "8 tahun garansi baterai dan kendaraan" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promotions" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Promosi Terbaik</h2>
          <p className="text-gray-400 text-center mb-16">Dapatkan penawaran eksklusif dari AION</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Lifetime Warranty", desc: "Garansi seumur hidup untuk baterai, motor, dan kontroler elektrik" },
              { title: "Free Charger", desc: "Instalasi charger dinding gratis 7kW" },
              { title: "Free Service", desc: "Gratis perawatan hingga 5 tahun" },
              { title: "ERA 24/7", desc: "Bantuan darurat 24 jam" },
            ].map((promo, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">{promo.title}</h3>
                <p className="text-gray-400 text-sm">{promo.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-medium transition">
              Booking Test Drive
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4 tracking-[0.3em]">AION</div>
          <p className="text-gray-400 text-sm mb-8">Electric Vehicle Masa Depan</p>
          <div className="text-gray-500 text-xs">© 2026 AION Indonesia. All rights reserved.</div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur border-t border-white/10 p-4 flex items-center justify-between z-40">
        <button onClick={prevSlide} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm">{activeSlide + 1} / {cars.length}</span>
        <button onClick={nextSlide} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}