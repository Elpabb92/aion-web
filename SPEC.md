# AION Website - Tesla-Inspired Redesign

## Objective
Redesign AION website to match Tesla's immersive, full-screen carousel experience.

## Current Issues (to fix)
1. Carousel not working properly
2. UI feels "template-y" - not premium enough
3. Not matching Tesla's clean, immersive aesthetic

---

## Tesla-Inspired Design

### Reference: tesla.com
- Full-screen hero slides with minimal UI
- Large typography, centered or left-aligned
- Specs overlay on the image (not in separate boxes)
- Subtle gradients, not heavy overlays
- Smooth crossfade transitions
- Minimal navigation during scroll
- CTA buttons are clean, rounded

---

## Cars Data (from aionjakarta.com)

### 1. AION UT
- **Price:** Mulai Rp 199 juta (OTR Jakarta)
- **Range:** 310 km
- **Battery:** 31.7 kWh
- **Torque:** 176 Nm
- **Charging:** 30-80% dalam 24 menit
- **Features:** Butterfly seat, European design, owl-eye headlamp
- **Tagline:** Compact EV untuk Keluarga

### 2. AION Y Plus
- **Price:** Mulai Rp 299 juta (OTR Jakarta)
- **Range:** 430 km (WLTP)
- **Acceleration:** 0-100 km/h dalam 7.6 detik
- **Boot:** 405 L
- **Power:** 201 HP
- **Features:** Modern aerodynamic, CATARC certified, 8-year warranty
- **Tagline:** SUV Elektrik Masa Depan

### 3. AION V
- **Price:** Mulai Rp 459 juta (OTR Jakarta)
- **Range:** 600 km+
- **Power:** 224 HP
- **Torque:** 350 Nm
- **Battery:** 75 kWh
- **Features:** Magazine Battery, Fast Charging, mini fridge, multilingual AI
- **Tagline:** Premium SUV 600km+ Range

### 4. HYPTEC HT
- **Price:** Mulai Rp 699 juta (OTR Jakarta)
- **Range:** 600 km+
- **Power:** 340 HP
- **Features:** First class seat, gullwing doors, luxury SUV
- **Tagline:** Luxury EV with Gullwing Doors

---

## Redesign Specs

### 1. Hero/Carousel Section
- **Full-screen slides** (100vh each)
- **Background:** Full-bleed car image with subtle gradient overlay
- **Content:** Car name large (Tesla style), tagline, price
- **Specs:** Overlay directly on image (bottom-left or right), minimal boxes
- **Navigation:** Bottom progress dots, side arrows on hover
- **Transition:** Smooth crossfade (1s ease)
- **Auto-play:** 6 seconds per slide

### 2. Visual Style
- **Background:** Pure black (#000)
- **Text:** White (#fff), subtle grays for secondary
- **Typography:** Bold, clean sans-serif (Inter or similar)
- **Accent:** Electric blue (#3b82f6) for CTAs and highlights
- **Buttons:** White rounded pills (Tesla style), no borders
- **Gradients:** Subtle linear gradient on images (darken bottom for text readability)

### 3. Each Slide Layout
```
┌─────────────────────────────────────────────────────────┐
│ [Logo Left]                              [Nav] [CTA]    │
│                                                         │
│                                                         │
│                    CAR IMAGE                           │
│                    (full bleed)                        │
│                                                         │
│    ┌──────────────────┐                                │
│    │ AION Y PLUS      │                                │
│    │ SUV Elektrik     │         [Learn More]           │
│    │ Masa Depan       │         [Order Now]            │
│    │                   │                               │
│    │ 430km    7.6s    │                               │
│    │ Range    0-100   │                               │
│    │                   │                               │
│    │ Mulai Rp 299jt   │                               │
│    └──────────────────┘                               │
│                                                         │
│    ● ○ ○ ○  (progress dots)                           │
└─────────────────────────────────────────────────────────┘
```

### 4. Mobile
- Touch swipe enabled
- Bottom sheet for specs on mobile
- Simplified UI - specs as overlay on image

### 5. Animations
- Slide transition: opacity fade (800ms)
- Content stagger: slide up + fade in after image
- Hover on buttons: scale 1.02

---

## Acceptance Criteria
- [ ] Full-screen carousel works smooth on desktop & mobile
- [ ] Tesla-inspired aesthetic (clean, immersive, minimal)
- [ ] All 4 cars with correct specs from aionjakarta.com
- [ ] Auto-play with manual override
- [ ] Touch swipe on mobile
- [ ] Fast loading (optimized images)
- [ ] No scroll jank