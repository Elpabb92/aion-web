# AION Website Improvement Spec

## Objective
Improve AION website with Tesla-inspired carousel and enhanced UI/UX

## Target URL
https://aion-web-opal.vercel.app/

## Inspiration
- Tesla.com - clean, immersive, full-screen imagery, smooth animations
- AION Jakarta - real data, pictures, specs

---

## Current Issues
1. Models section uses basic grid (not carousel)
2. Static images, no video/preview on hover
3. Limited interactivity
4. UI feels "template-y"

---

## Improvement Specs

### 1. Hero Section
- Full-width hero with video capability
- Large typography (Tesla style)
- Minimal navigation
- Strong CTA

### 2. Models Section - CAROUSEL (PRIORITY)
- Full-width horizontal carousel
- Each slide = one car with full-screen image
- Specs overlay on side
- Navigation: swipe (mobile) / arrows (desktop)
- Smooth transitions between slides
- Auto-play option
- Progress indicator

### 3. Car Details Per Slide
- Large hero image
- Car name & tagline
- Key specs (range, acceleration, price)
- "Learn More" / "Order Now" CTAs
- Color options dots

### 4. Visual Style
- Dark mode or high contrast
- Lots of white space
- Bold typography
- Minimal UI elements
- Smooth animations (fade, slide)

### 5. Mobile Responsiveness
- Touch swipe carousel
- Bottom sheet for specs on mobile
- Optimized images

---

## Data Sources

### Cars to Feature:
1. **AION UT** - Rp 199jt, 310km range, 176Nm
2. **AION Y Plus** - Rp 299jt, 430km range
3. **AION V** - Rp 459jt, 600km range
4. **HYPTEC HT** - Rp 699jt, luxury, gullwing doors

### Images
- Use high-quality images from AION Jakarta or Unsplash (EV/car images as placeholder)
- Full-bleed images for carousel

---

## Technical
- Framework: Next.js + Tailwind
- Carousel: Swiper.js or custom CSS
- Animations: Framer Motion or CSS transitions

---

## Acceptance Criteria
- [ ] Carousel works smooth on desktop & mobile
- [ ] Tesla-inspired aesthetic (clean, immersive)
- [ ] All 4 cars displayed with correct specs
- [ ] Responsive design
- [ ] Fast loading (optimize images)