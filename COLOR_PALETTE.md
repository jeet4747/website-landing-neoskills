# Neoskills Color Palette & Design Guide

## 🎨 Complete Color System

### Primary Colors

#### Primary Blue
```
Hex: #0056D2
RGB: (0, 86, 210)
Usage: Primary buttons, headings, text accents, hover states
```

#### Accent Yellow
```
Hex: #FFC300
RGB: (255, 195, 0)
Usage: Secondary buttons, highlights, badges, emphasis
```

### Neutral Colors

#### Dark Text
```
Hex: #222222
RGB: (34, 34, 34)
Usage: Body text, dark backgrounds (footer), primary text
```

#### White
```
Hex: #ffffff
RGB: (255, 255, 255)
Usage: Main background, card backgrounds, text on dark
```

#### Light Gray
```
Hex: #f5f5f5
RGB: (245, 245, 245)
Usage: Section backgrounds, subtle backgrounds
```

#### Border Gray
```
Hex: #e0e0e0
RGB: (224, 224, 224)
Usage: Card borders, divider lines, subtle separations
```

---

## 🎯 Color Usage Guide

### Buttons

#### Primary Button (.btn-primary)
```css
Background: #0056D2
Text: white
Hover: darker shade with shadow
State: .btn-primary
```
**Used for**: Main CTAs, "Enroll Now", "Grab This Offer"

#### Outline Button (.btn-outline)
```css
Border: #0056D2
Text: #0056D2
Background: transparent
Hover: filled with #0056D2
State: .btn-outline
```
**Used for**: Secondary CTAs, "Talk to an Advisor"

#### Accent Button (.btn-accent)
```css
Background: #FFC300
Text: #222222
Hover: darker shade
State: .btn-accent
```
**Used for**: Special CTAs, "Talk to Advisor" (TopBar), "Claim Offer"

### Text Hierarchy

1. **Headings (H1-H3)**: #222222 (dark), 600-800 weight
2. **Body Text**: #222222 (dark), 400-500 weight
3. **Secondary Text**: #666666 (gray-600), 400 weight
4. **Link Text**: #0056D2 (primary), 500+ weight
5. **Muted Text**: #999999 (gray-500), 400 weight

### Backgrounds

- **Main Background**: #ffffff (white)
- **Section Backgrounds**: Alternating white and #f5f5f5 (light gray)
- **Accent Overlays**: Primary blue with 5-10% opacity
- **Card Backgrounds**: #ffffff with border #e0e0e0
- **Footer Background**: #222222 (dark)

### Badges & Accents

- **Success/Positive**: #0056D2 (primary blue)
- **Attention/Offer**: #FFC300 (yellow)
- **Borders**: #e0e0e0 (border gray)
- **Hover States**: Primary blue with shadow

---

## 📐 Layout Grid

### Section Structure

```
┌─────────────────────────────────────────┐
│          TopBar (Blue Strip)             │
│ +91 8087020031 | 20% Off | Contact Info │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│        Navbar (White, Sticky)           │
│  Logo | Nav Menu | Search | Enroll Btn  │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│      HeroSection (White BG)              │
│  Left: Headline + CTA | Right: Graphics  │
│  Stats Bar at bottom                     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│    CoursesSection (Light Gray BG)        │
│  Category Tabs (6 options)               │
│  Course Grid (3 columns, 6 cards)        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│      WhyChooseUs (White BG)              │
│  3x2 Grid of Differentiators             │
│  Icons + Description + Hover FX          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│   TestimonialsSection (Light Gray BG)    │
│  Carousel + Navigation + Stats Grid      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│      ContactForm (White BG)              │
│  Left: Form | Right: Contact Cards      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│       Footer (Dark BG)                   │
│  Logo | Links | Contact | Social         │
└─────────────────────────────────────────┘
```

---

## 🎨 Component Color Combinations

### TopBar
- **Background**: #0056D2 (primary blue)
- **Text**: white
- **Button**: #FFC300 (accent yellow)

### Navbar
- **Background**: #ffffff (white)
- **Text**: #222222 (dark)
- **Logo Box**: #0056D2 (primary blue)
- **Hover**: #0056D2 (primary blue)

### HeroSection
- **Background**: #ffffff (white) with subtle overlays
- **Headings**: #222222 (dark)
- **Accent Border**: #FFC300 (yellow ribbon)
- **Button Primary**: #0056D2
- **Button Secondary**: border #0056D2
- **Stats Text**: #0056D2

### CoursesSection
- **Background**: #f5f5f5 (light gray)
- **Tab Active**: #0056D2 (primary blue)
- **Tab Inactive**: #ffffff with #e0e0e0 border
- **Card Background**: #ffffff
- **Icons**: #0056D2
- **Button**: #0056D2

### WhyChooseUs (Differentiators)
- **Background**: #ffffff (white)
- **Card Background**: Primary blue at 5% opacity
- **Icon Box**: #0056D2 (primary blue)
- **Border**: Primary blue at 10% opacity
- **Accent Line**: gradient from #0056D2 to #FFC300

### TestimonialsSection
- **Background**: #f5f5f5 (light gray)
- **Card Background**: #ffffff
- **Star Rating**: #FFC300 (yellow)
- **Navigation**: #0056D2 (primary blue)
- **Stats Cards**: #ffffff with #0056D2 text

### ContactForm
- **Background**: #ffffff (white)
- **Form Input Border**: #e0e0e0
- **Form Input Focus**: #0056D2
- **Input Focus Ring**: #0056D2 at 20% opacity
- **Button**: #0056D2
- **Info Card Background**: Primary blue at 5% opacity
- **Info Card Border**: Primary blue at 10% opacity
- **CTA Card**: Gradient #0056D2
- **CTA Button**: #FFC300

### Footer
- **Background**: #222222 (dark)
- **Text**: white
- **Icons**: #0056D2 (primary blue)
- **Links Hover**: #0056D2
- **Social Icons**: Primary blue at 20% opacity

---

## 🎯 Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Full-width buttons
- Stacked sections
- Smaller text sizes
- Collapsed navigation

### Tablet (768px - 1024px)
- 2-column layouts where applicable
- Optimized padding
- Larger text
- Menu expands

### Desktop (> 1024px)
- Full layouts (3 columns, grids)
- Maximum spacing
- Large text sizes
- Full navigation visible

---

## 🔤 Typography Scale

```
h1: 3.5rem (56px) → 6rem (96px) on desktop
h2: 3rem (48px) → 5rem (80px) on desktop
h3: 1.75rem (28px) → 2.5rem (40px) on desktop
p: 1rem (16px) → 1.125rem (18px) on desktop
small: 0.875rem (14px) → 1rem (16px) on desktop
```

---

## 🎨 Gradient Usage

### Hero Section Decorative Overlays
```css
/* Top right accent */
background: linear-gradient(135deg, rgba(0, 86, 210, 0.05), transparent)

/* Bottom left accent */
background: linear-gradient(135deg, rgba(255, 195, 0, 0.1), transparent)
```

### Contact Form CTA Card
```css
background: linear-gradient(135deg, #0056D2, rgba(0, 86, 210, 0.8))
```

### Differentiators Accent Line
```css
background: linear-gradient(90deg, #0056D2, #FFC300)
```

---

## ✨ Shadow System

### Subtle Shadow (cards, hover)
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

### Medium Shadow (hover state)
```css
box-shadow: 0 10px 15px rgba(0, 86, 210, 0.1)
```

### Large Shadow (elevated)
```css
box-shadow: 0 20px 25px rgba(0, 86, 210, 0.15)
```

---

## 🎬 Animation Colors

### Hover States
```
Primary Button Hover: Darker #0056D2 with shadow
Outline Button Hover: Fill with #0056D2
Card Hover: Subtle shadow, slight y-offset
```

### Transitions
```
Duration: 300ms
Easing: ease-out
Properties: all (color, background, transform, box-shadow)
```

---

## 📋 Brand Consistency Checklist

- [ ] All primary buttons use #0056D2
- [ ] All accent elements use #FFC300
- [ ] Footer background is #222222
- [ ] Body text is #222222
- [ ] Borders are #e0e0e0
- [ ] Light backgrounds are #f5f5f5
- [ ] Font is Poppins (no serif, no monospace)
- [ ] Card backgrounds are white (#ffffff)
- [ ] Hover states maintain color consistency
- [ ] Shadows use primary blue overlay
- [ ] Focus states highlight with primary blue
- [ ] All spacing follows Tailwind grid
- [ ] All animations use 300ms duration
- [ ] Mobile layouts are single column
- [ ] Images have proper contrast with bg

---

**Last Updated**: January 15, 2025
**Design Version**: 1.0
**Status**: Production Ready ✅
