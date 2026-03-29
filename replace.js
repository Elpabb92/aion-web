const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// State block replacement
const oldStateBlock = `export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedColor, setSelectedColor] = useState<Record<string, number>>({});
  const carouselRef = useRef<HTMLDivElement>(null);

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
  };`;

const newStateBlock = `export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState<Record<string, number>>({});`;

// Replace state block
content = content.replace(oldStateBlock, newStateBlock);

// Carousel section replacement
const oldCarouselSection = `      {/* Hero / Models Carousel */}
      <section className="relative h-screen" ref={carouselRef}>
        {cars.map((car, index) => (
          <div
            key={car.id}
            className={\`absolute inset-0 transition-all duration-1000 ease-in-out \${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }\`}
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
                          className={\`w-8 h-8 rounded-full border-2 transition \${
                            (selectedColor[car.id] ?? 0) === i ? "border-white scale-110" : "border-transparent"
                          }\`}
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
              className={\`h-1 rounded-full transition-all duration-500 \${
                index === activeSlide ? "w-12 bg-white" : "w-4 bg-white/30"
              }\`}
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
      </section>`;

const newCarouselSection = `      {/* Hero / Models Carousel */}
      <section className="relative h-screen">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="h-full"
        >
          {cars.map((car, index) => (
            <SwiperSlide key={car.id}>
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
                            className={\`w-8 h-8 rounded-full border-2 transition \${
                              (selectedColor[car.id] ?? 0) === i ? "border-white scale-110" : "border-transparent"
                            }\`}
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Custom Pagination */}
        <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3" />

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-30 hidden md:flex items-center gap-2 text-white/50 text-sm animate-bounce">
          <span>Scroll untuk lihat lebih banyak</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>`;

// Replace carousel section
content = content.replace(oldCarouselSection, newCarouselSection);

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Page updated successfully');