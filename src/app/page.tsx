"use client";

import { useState } from "react";
import Image from "next/image";

const cars = [
  {
    id: "ut",
    name: "AION UT",
    tagline: "Compact EV untuk Keluarga",
    price: "Mulai Rp 199 juta",
    specs: {
      torque: "176 Nm",
      battery: "31.7 kWh",
      range: "310 km",
      charging: "30-80% dalam 24 menit",
    },
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "y-plus",
    name: "AION Y Plus",
    tagline: "SUV Elektrik Masa Depan",
    price: "Mulai Rp 299 juta",
    specs: {
      acceleration: "0-100 km/h 7.6s",
      range: "430 km (WLTP)",
      boot: "405 L",
    },
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80",
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: "v",
    name: "AION V",
    tagline: "Premium SUV 600km+ Range",
    price: "Mulai Rp 459 juta",
    specs: {
      power: "224 HP",
      torque: "350 Nm",
      battery: "75 kWh",
      range: "600 km",
    },
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: "hyptec-ht",
    name: "HYPTEC HT",
    tagline: "Luxury EV with Gullwing Doors",
    price: "Mulai Rp 699 juta",
    specs: {
      power: "340 HP",
      range: "600 km+",
      seats: "First Class Seat",
      doors: "Gullwing Doors",
    },
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    color: "from-slate-400 to-zinc-300",
  },
];

const benefits = [
  {
    icon: "⚡",
    title: "Hemat Energi",
    desc: "Biaya operasional lebih rendah dari mobil bensin",
  },
  {
    icon: "🌱",
    title: "Ramah Lingkungan",
    desc: "Zero emisi, kontribusi untuk bumi yang lebih baik",
  },
  {
    icon: "🚀",
    title: "Canggih",
    desc: "Teknologi AI dan fitur-fitur mutakhir",
  },
  {
    icon: "🛡️",
    title: "Garansi Panjang",
    desc: "8 tahun garansi baterai dan kendaraan",
  },
];

const promotions = [
  {
    title: "Lifetime Warranty",
    desc: "Garansi seumur hidup untuk baterai, motor, dan kontroler elektrik",
  },
  {
    title: "Free Charger",
    desc: "Instalasi charger dinding gratis 7kW",
  },
  {
    title: "Free Service",
    desc: "Gratis perawatan hingga 5 tahun",
  },
  {
    title: "ERA 24/7",
    desc: "Bantuan darurat 24 jam",
  },
];

export default function Home() {
  const [activeCar, setActiveCar] = useState(0);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-white font-bold text-xl tracking-wider">AION</div>
          <nav className="hidden md:flex gap-6">
            <a href="#models" className="text-white/80 hover:text-white text-sm">Models</a>
            <a href="#benefits" className="text-white/80 hover:text-white text-sm">Benefits</a>
            <a href="#promotions" className="text-white/80 hover:text-white text-sm">Promotions</a>
          </nav>
          <button
            onClick={() => setShowContact(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium transition"
          >
            Hubungi Kami
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-end justify-center pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80"
          alt="AION Hero"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">AION</h1>
          <p className="text-xl md:text-2xl font-light mb-8">Electric Vehicle Masa Depan</p>
          <div className="flex gap-4 justify-center">
            <a
              href="#models"
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition"
            >
              Explore
            </a>
            <a
              href="#promotions"
              className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition"
            >
              Promo
            </a>
          </div>
        </div>
      </section>

      {/* Models Section - Tesla Carousel Style */}
      <section id="models" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Model Kami</h2>
          <p className="text-gray-500 text-center mb-12">Pilih mobil listrik yang sesuai dengan kebutuhan Anda</p>

          {/* Carousel for Mobile, Grid for Desktop */}
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car, index) => (
              <div
                key={car.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${car.color} opacity-20`} />
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{car.tagline}</p>
                  <p className="text-blue-600 font-semibold mb-4">{car.price}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    {Object.entries(car.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Mengapa Memilih EV?</h2>
          <p className="text-gray-500 text-center mb-12">Keuntungan memiliki mobil listrik AION</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promotions" className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Promosi Terbaik</h2>
          <p className="text-gray-400 text-center mb-12">Dapatkan penawaran eksklusif dari AION</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-400">{promo.title}</h3>
                <p className="text-gray-400 text-sm">{promo.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowContact(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-medium transition"
            >
              Booking Test Drive
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowContact(false)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6">Hubungi Kami</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nama"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Nomor HP"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                <option>Pilih Model</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>{car.name}</option>
                ))}
              </select>
              <textarea
                placeholder="Pesan"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">AION</div>
          <p className="text-gray-400 text-sm mb-8">Electric Vehicle Masa Depan</p>
          <div className="text-gray-500 text-xs">
            © 2026 AION Indonesia. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-40">
        <button className="p-2">
          <span className="text-2xl">💬</span>
        </button>
        <button
          onClick={() => setShowContact(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex-1 ml-4"
        >
          Schedule a Drive Today
        </button>
      </div>
    </div>
  );
}