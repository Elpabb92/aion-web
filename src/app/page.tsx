"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const cars = [
  {
    id: "ut",
    name: "AION UT",
    tagline: "Compact EV untuk Keluarga",
    price: "Std: Rp 325jt, Prem: Rp 363jt",
    specs: {
      range: "310 km",
      battery: "31.7 kWh",
      torque: "176 Nm",
      charging: "30-80% dalam 24 menit",
    },
    colors: ["#FFD700", "#C0C0C0", "#1a1a1a"],
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1920&q=80",
    accent: "from-yellow-400 to-orange-500",
    // Data lengkap untuk modal
    variants: [
      { id: "std", name: "Standard", price: "Rp 325jt", battery: "44kWh", range: "400km NEDC", power: "134 HP", torque: "145 Nm", acceleration: "11.4s", charging: "30-80% dalam 24 menit" },
      { id: "prem", name: "Premium", price: "Rp 363jt", battery: "60kWh", range: "500km NEDC", power: "201 HP", torque: "210 Nm", acceleration: "7.3s", charging: "30-80% dalam 24 menit" },
    ],
    features: ["Owl Eyes LED", "ADAS Level 2", "V2L (Vehicle to Load)", "14.6\" infotainment", "Butterfly seat"],
  },
  {
    id: "y-plus",
    name: "AION Y Plus",
    tagline: "SUV Elektrik Masa Depan",
    price: "Excl: Rp 419jt, Prem: Rp 475jt",
    specs: {
      range: "430 km (WLTP)",
      acceleration: "0-100 km/h 7.6s",
      boot: "405 L",
      power: "201 HP",
    },
    colors: ["#4169E1", "#C0C0C0", "#1a1a1a"],
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1920&q=80",
    accent: "from-blue-400 to-cyan-300",
    variants: [
      { id: "excl", name: "Exclusive", price: "Rp 419jt", battery: "50.66kWh", range: "410km NEDC", power: "204 HP", torque: "225 Nm", acceleration: "N/A", charging: "N/A" },
      { id: "prem", name: "Premium", price: "Rp 475jt", battery: "63.2kWh", range: "490km NEDC", power: "204 HP", torque: "225 Nm", acceleration: "N/A", charging: "N/A" },
    ],
    features: ["King-size bed mode", "Panoramic sunroof", "14.6\" screen", "Karaoke system", "360° camera"],
  },
  {
    id: "v",
    name: "AION V",
    tagline: "Premium SUV 600km+ Range",
    price: "Excl: Rp 449jt, Lux: Rp 489jt",
    specs: {
      range: "600 km",
      power: "224 HP",
      torque: "350 Nm",
      battery: "75 kWh",
    },
    colors: ["#8B4513", "#C0C0C0", "#1a1a1a"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80",
    accent: "from-purple-400 to-pink-400",
    variants: [
      { id: "excl", name: "Exclusive", price: "Rp 449jt", battery: "64.5kWh", range: "505km NEDC", power: "184 HP", torque: "240 Nm", acceleration: "7.9s", charging: "30-80% dalam 16 menit" },
      { id: "lux", name: "Luxury", price: "Rp 489jt", battery: "75.3kWh", range: "602km NEDC", power: "204 HP", torque: "240 Nm", acceleration: "7.9s", charging: "30-80% dalam 16 menit" },
    ],
    features: ["Mini fridge (-15°C)", "Panoramic roof", "360° camera", "V2L (Vehicle to Load)", "ADAS Level 2"],
  },
  {
    id: "hyptec-ht",
    name: "HYPTEC HT",
    tagline: "Luxury EV with Gullwing Doors",
    price: "Prem: Rp 691jt, Ultra: Rp 843.5jt",
    specs: {
      range: "600 km+",
      power: "340 HP",
      doors: "Gullwing Doors",
      seats: "First Class Seat",
    },
    colors: ["#C0C0C0", "#1a1a1a", "#000080"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80",
    accent: "from-slate-400 to-zinc-300",
    variants: [
      { id: "prem", name: "Premium", price: "Rp 691jt", battery: "83 kWh", range: "600+ km NEDC", power: "335 HP", torque: "430 Nm", acceleration: "5.8s", charging: "N/A" },
      { id: "ultra", name: "Ultra", price: "Rp 843.5jt", battery: "83 kWh", range: "600+ km NEDC", power: "335 HP", torque: "430 Nm", acceleration: "5.8s", charging: "N/A" },
    ],
    features: ["First class seat", "Gullwing doors (Ultra)", "Dolby Atmos sound system", "Panoramic roof", "3.3kW V2L"],
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedColor, setSelectedColor] = useState<Record<string, number>>({});
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("std");
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
      const cardWidth = 340;
      const gap = 24;
      const scrollPos = (cardWidth + gap) * index - (container.clientWidth - cardWidth) / 2;
      container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
      setActiveModel(index);
    }
  };

  const handleModelScroll = () => {
    if (modelCarouselRef.current) {
      const container = modelCarouselRef.current;
      const cardWidth = 340;
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

  const openModal = (car: any) => {
    setSelectedCar(car);
    setSelectedVariant(car.variants?.[0]?.id || "std");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const getSelectedVariant = () => {
    if (!selectedCar) return null;
    return selectedCar.variants?.find((v: any) => v.id === selectedVariant) || selectedCar.variants?.[0];
  };

  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-[0.3em]">AION</div>
          <nav className="hidden md:flex gap-8">
            <a href="#models" className="text-sm hover:text-white/70 transition">Models</a>
            <a href="#benefits" className="text-sm text-white/60 hover:text-white transition">Benefits</a>
            <a href="#promotions" className="text-sm text-white/60 hover:text-white transition">Promotions</a>
          </nav>
          <div className="flex gap-4">
            <a
              href="https://wa.me/6287875906945?text=Halo,%20saya%20ingin%20booking%20test%20drive%20AION"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
            >
              Booking Test Drive
            </a>
            <a
              href="https://wa.me/6287875906945"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black text-black bg-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
            >
              Hubungi Kami
            </a>
          </div>
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
                    <button 
                      onClick={() => openModal(car)}
                      className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
                    >
                      Learn More
                    </button>
                    <a
                      href="https://wa.me/6287875906945"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition inline-block text-center"
                    >
                      Order Now
                    </a>
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

      {/* Models Grid Section */}
      <section id="models" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Model Kami</h2>
          <p className="text-gray-400 text-center mb-12">Pilih mobil listrik yang sesuai dengan kebutuhan Anda</p>
          
          {/* Tesla-Style Carousel - Horizontal Scroll Snap */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevModel}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition hidden md:flex"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextModel}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition hidden md:flex"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    index === activeModel ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                  }`}
                  style={{ width: '100%', maxWidth: '340px' }}
                >
                  <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 h-full">
                    {/* Car Image */}
                    <div className="relative h-48 overflow-hidden">
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
                    <div className="p-5 -mt-16 relative z-10">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                        {index === 0 ? 'Compact EV' : index === 1 ? 'SUV' : index === 2 ? 'Premium SUV' : 'Luxury SUV'}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{car.name}</h3>
                      <p className="text-blue-400 font-semibold mb-3">{car.price}</p>
                      
                      {/* Quick Specs */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {Object.entries(car.specs).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="bg-gray-800/50 rounded-lg p-2">
                            <div className="text-xs text-gray-500 uppercase">{key}</div>
                            <div className="font-semibold text-white text-sm">{value}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal(car)}
                          className="flex-1 bg-white text-black py-2.5 rounded-full font-semibold hover:bg-gray-200 transition text-sm"
                        >
                          Learn More
                        </button>
                        <a
                          href="https://wa.me/6287875906945"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border border-white/30 text-white py-2.5 rounded-full font-semibold hover:bg-white/10 transition text-sm text-center"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-4">
              {cars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToModel(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeModel ? "w-8 bg-white" : "w-2 bg-white/30"
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
            <a
              href="https://wa.me/6287875906945?text=Halo,%20saya%20ingin%20booking%20test%20drive%20AION"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-medium transition inline-block"
            >
              Booking Test Drive
            </a>
          </div>
        </div>
      </section>

      {/* Tesla-Style Sticky Bottom CTA Bar */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40 h-[70px] items-center justify-between px-8">
        <a
          href="https://wa.me/6287875906945?text=Halo,%20saya%20ingin%20booking%20test%20drive%20AION"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          Booking Test Drive
        </a>
        <a
          href="https://wa.me/6287875906945"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-black text-black bg-white px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition"
        >
          Hubungi Kami
        </a>
      </div>

      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4 tracking-[0.3em]">AION</div>
          <p className="text-gray-400 text-sm mb-8">Electric Vehicle Masa Depan</p>
          <div className="text-gray-500 text-xs">© 2026 AION Indonesia. All rights reserved.</div>
        </div>
      </footer>

      {/* Floating WhatsApp Button - Fixed di mobile agar tidak tertimpa Mobile Nav */}
      <a
        href="https://wa.me/6287875906945"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
        aria-label="Chat via WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-1.24-.619-2.374-1.54-3.318-2.768-.297-.396.297-.371.892-1.238.099-.173.05-.322-.025-.446-.074-.124-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.875 1.215 3.074.149.198 2.095 3.2 5.073 4.487.709.297 1.263.446 1.694.571.712.205 1.36.179 1.87.109.57-.074 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.462 7.644c-.712 0-1.415-.099-2.099-.298a9.87 9.87 0 01-3.192-1.541l-4.5 1.165 1.215-4.372A9.87 9.87 0 012.08 7.686c0-5.444 4.457-9.875 9.93-9.875 2.654 0 5.148 1.034 7.021 2.907a9.875 9.875 0 012.906 7.019c0 5.444-4.457 9.875-9.93 9.875z" />
        </svg>
      </a>

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

      {/* Product Detail Modal */}
      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-6xl bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Car Image */}
              <div className="relative h-96 lg:h-full min-h-[500px]">
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>

              {/* Right: Details */}
              <div className="p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-200px)]">
                <div className="mb-6">
                  <h2 className="text-5xl font-bold text-white mb-2">{selectedCar.name}</h2>
                  <p className="text-gray-400 text-lg">{selectedCar.tagline}</p>
                </div>

                {/* Variant Selector */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Pilih Varian</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedCar.variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantChange(variant.id)}
                        className={`px-6 py-3 rounded-full font-medium transition ${
                          selectedVariant === variant.id
                            ? 'bg-white text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Price */}
                <div className="mb-8">
                  <div className="text-3xl font-bold text-blue-400">
                    {getSelectedVariant()?.price}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Harga OTR Jakarta</p>
                </div>

                {/* Specifications */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-white mb-6">Spesifikasi Teknis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Battery</div>
                      <div className="text-lg font-semibold text-white">{getSelectedVariant()?.battery}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Range (NEDC)</div>
                      <div className="text-lg font-semibold text-white">{getSelectedVariant()?.range}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Power</div>
                      <div className="text-lg font-semibold text-white">{getSelectedVariant()?.power}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Torque</div>
                      <div className="text-lg font-semibold text-white">{getSelectedVariant()?.torque}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">0-100 km/h</div>
                      <div className="text-lg font-semibold text-white">{getSelectedVariant()?.acceleration}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Charging</div>
                      <div className="text-lg font-semibold text-white">{getSelectedVariant()?.charging}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-white mb-4">Fitur Utama</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedCar.features.map((feature: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-white">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/6287875906945"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black py-4 rounded-full font-semibold text-center hover:bg-gray-200 transition"
                  >
                    Order Now via WhatsApp
                  </a>
                  <a
                    href="https://wa.me/6287875906945?text=Halo,%20saya%20ingin%20booking%20test%20drive%20AION"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-white text-white py-4 rounded-full font-semibold text-center hover:bg-white/10 transition"
                  >
                    Booking Test Drive
                  </a>
                </div>

                {/* Back Button */}
                <button
                  onClick={closeModal}
                  className="mt-8 text-gray-400 hover:text-white transition text-center w-full"
                >
                  ← Kembali ke Model
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}