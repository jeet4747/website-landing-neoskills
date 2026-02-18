# Neoskills Landing Page - Quick Reference

## 🎨 Design System

### Colors
```css
primary: #0056D2      /* Blue - Main brand color */
accent: #FFC300       /* Yellow - Secondary accent */
dark: #222222         /* Dark text and footer */
light: #ffffff        /* White background */
light-gray: #f5f5f5   /* Section backgrounds */
border-gray: #e0e0e0  /* Borders */
```

### Typography
- **Font**: Poppins (all weights)
- **No Monospace**: Removed JetBrains Mono from this design

### Utility Classes
```css
.btn-primary      /* Blue button */
.btn-outline      /* Blue outline button */
.btn-accent       /* Yellow button */
.section-padding  /* py-16 md:py-24 */
.smooth-transition /* transition-all duration-300 ease-out */
```

---

## 📱 Page Structure

```
1. TopBar (NEW)
   ├─ Contact info (left)
   ├─ Offer message (center)
   └─ Email + Advisor CTA (right)

2. Navbar
   ├─ Logo (left)
   ├─ Nav menu (center)
   ├─ Search bar (right)
   └─ Enroll button

3. HeroSection
   ├─ Headline: "Don't carry your 2025 goals into 2026"
   ├─ Offer ribbon badge
   ├─ CTA buttons
   └─ Stats (50K+, 95%, 100+)

4. CoursesSection
   ├─ Category tabs (6 categories)
   └─ Course grid (6 cards per category)

5. WhyChooseUs (Differentiators)
   ├─ 3x2 grid layout
   └─ 6 differentiator cards with icons

6. TestimonialsSection
   ├─ Testimonial carousel
   ├─ Navigation arrows
   ├─ Dot indicators
   └─ Stats bar

7. ContactForm
   ├─ Form (left)
   │  ├─ Name input
   │  ├─ Email input
   │  ├─ Phone input
   │  ├─ Course dropdown
   │  └─ Message textarea
   └─ Contact Info (right)
      ├─ Phone cards
      ├─ Email card
      ├─ Hours card
      └─ Offer card

8. Footer
   ├─ Brand info + social
   ├─ Link columns (4)
   └─ Contact section
```

---

## 🎯 Key Messaging

### Offer
- **20% OFF** on all courses
- **Free** AI in Cybersecurity module
- **Expires**: December 31st, 2025

### Social Proof
- **50K+** Certified Professionals
- **95%** Job Placement Rate
- **100+** Courses Available
- **4.8★** Average Rating

---

## 📞 Contact Details

| Channel | Details |
|---------|---------|
| Phone (India) | +91 8087020031 |
| Phone (USA) | +1 307-387-5278 |
| Email | contact@neoskills.co.in |
| Hours | Mon-Fri: 9AM-7PM IST<br>Sat-Sun: 10AM-6PM IST |

---

## 📚 Featured Courses

1. **CompTIA Security+** (Intermediate, 8-12 weeks)
2. **CISA** (Advanced, 16-20 weeks)
3. **CISM** (Advanced, 16-20 weeks)
4. **CompTIA Core** (Beginner to Advanced, 24-30 weeks)
5. **AI in Cybersecurity** (Advanced, 10-14 weeks)
6. **Agile Scrum Master** (Intermediate, 6-8 weeks)

---

## 🔧 Component Quick Links

| Component | File | Key Props |
|-----------|------|-----------|
| TopBar | `src/components/TopBar.jsx` | - |
| Navbar | `src/components/Navbar.jsx` | - |
| HeroSection | `src/components/HeroSection.jsx` | - |
| CoursesSection | `src/components/CoursesSection.jsx` | activeCategory |
| WhyChooseUs | `src/components/WhyChooseUs.jsx` | - |
| TestimonialsSection | `src/components/TestimonialsSection.jsx` | currentIndex |
| ContactForm | `src/components/ContactForm.jsx` | formData |
| Footer | `src/components/Footer.jsx` | - |

---

## 🚀 Development Commands

```bash
# Start dev server (port 5175)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# View build output
ls -la dist/
```

---

## 📊 Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (lg)

---

## ✅ Quality Checklist

- [x] Build passes without errors
- [x] All components integrated
- [x] Color scheme applied consistently
- [x] Responsive on all breakpoints
- [x] Animations smooth
- [x] Forms functional
- [x] Footer links present
- [x] Contact info visible
- [x] Offer messaging clear
- [x] Mobile menu works
- [x] Development server runs

---

**Last Updated**: January 15, 2025
**Version**: 1.0 - Corporate Design
**Status**: ✅ LIVE
