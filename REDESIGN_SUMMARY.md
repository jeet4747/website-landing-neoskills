# Neoskills Landing Page - Redesign Complete ✅

## Project Overview
A complete redesign of the Neoskills Learning Solutions landing page from a dark cybersecurity theme to a professional corporate educational design inspired by Knowlathon.

---

## Design System Updates

### Color Palette
- **Primary Blue**: `#0056D2` - Main brand color for CTAs, headings, accents
- **Accent Yellow/Orange**: `#FFC300` - Secondary accent for highlights and offers
- **Dark Text**: `#222222` - Primary text color on light backgrounds
- **White**: `#ffffff` - Main background color
- **Light Gray**: `#f5f5f5` - Secondary background for sections
- **Border Gray**: `#e0e0e0` - Borders and dividers
- **Dark Footer**: `#222222` - Footer background

### Typography
- **Primary Font**: Poppins (all weights: 300, 400, 500, 600, 700, 800)
- **Fallback**: Inter
- Removed: JetBrains Mono (was used for dark theme)

### CSS Utilities
All new utilities added to `/src/index.css`:
- `.btn-primary` - Blue button with shadow and hover effect
- `.btn-outline` - Blue border button with fill on hover
- `.btn-accent` - Yellow button with shadow
- `.section-padding` - Consistent vertical spacing (py-16 md:py-24)
- `.smooth-transition` - Smooth animations (transition-all duration-300 ease-out)
- Professional scrollbar styling with blue thumb

---

## Components Redesigned

### 1. **TopBar** (NEW)
- **Location**: `src/components/TopBar.jsx`
- **Features**:
  - Blue background strip
  - Left: Contact phone numbers (+91 8087020031 | +1 307-387-5278)
  - Center: "20% Off | Get Certified. Get Ahead!" offer message
  - Right: Email (contact@neoskills.co.in) + "Talk to Advisor" yellow button
  - Sticky positioning with smooth animations

### 2. **Navbar** (Updated)
- **Location**: `src/components/Navbar.jsx`
- **Features**:
  - White background, sticky positioning
  - NS logo with blue background
  - Centered navigation: Home | All Courses | Enterprise | About Us | Contact
  - Search bar with placeholder "What do you want to learn?"
  - "Enroll Now" primary button
  - Responsive mobile menu
  - Uses new corporate color scheme

### 3. **HeroSection** (Redesigned)
- **Location**: `src/components/HeroSection.jsx`
- **Features**:
  - Clean white background with subtle gradient overlays
  - "Don't carry your 2025 goals into 2026" main headline
  - Educational subtext about AI and IT skills
  - Yellow ribbon badge: "YEAR END EXCLUSIVE OFFER"
  - Offer details: "20% OFF on all courses + Free AI in Cybersecurity module"
  - Two CTAs: "Grab This Offer" (primary) and "Talk to an Advisor" (outline)
  - Stats display: 50K+ Certified Professionals, 95% Job Placement Rate, 100+ Courses
  - Animated floating illustration cards on right side

### 4. **CoursesSection** (Completely Redesigned)
- **Location**: `src/components/CoursesSection.jsx`
- **Features**:
  - Tab-based category system with 6 categories:
    1. IT Service Management
    2. Project Management
    3. Cybersecurity
    4. Agile & Scrum
    5. Information Security
    6. AI & Data Science
  - 6 courses per category (36 total course variations)
  - Each course card shows:
    - Icon, title, description
    - Level (Beginner, Intermediate, Advanced)
    - Duration
    - "Enroll Now" button
  - Featured courses include: CompTIA Security+, CISA, CISM, AI in Cybersecurity, CompTIA Core, Agile Scrum Master
  - Smooth hover animations and transitions
  - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)

### 5. **WhyChooseUs** (Redesigned as "Our Differentiators")
- **Location**: `src/components/WhyChooseUs.jsx`
- **Features**:
  - Section header: "Why Choose Neoskills?"
  - 3x2 grid of differentiators with icons:
    1. **Virtual Classroom** - Interactive live sessions with instructors
    2. **Flexible Learning Modes** - Live, self-paced, or hybrid options
    3. **Guaranteed Batch Runs** - Regular batches throughout the year
    4. **Experienced Instructors** - 10+ years industry experience
    5. **Exam Prep Support** - Mock exams and study materials
    6. **Post-Training Assistance** - Career counseling and job placement
  - Each card has:
    - Blue icon box
    - Title and description
    - Hover animation (y-offset, shadow growth)
    - Bottom accent line animation
  - CTA: "Start Your Learning Journey" button
  - Uses primary blue and accent colors

### 6. **TestimonialsSection** (Updated)
- **Location**: `src/components/TestimonialsSection.jsx`
- **Features**:
  - Section header with subtitle
  - Carousel showing 5 testimonials:
    - Ajay Kumar (Security Analyst, TechCorp India)
    - Priya Sharma (Project Manager, Digital Solutions LLC)
    - Rahul Verma (CISA Certified Professional, Enterprise Security Ltd)
    - Neha Singh (AI & Security Specialist, InnovateTech Inc)
    - Vikram Patel (IT Manager, Global Tech Solutions)
  - Each testimonial displays:
    - 5-star rating
    - Testimonial text
    - Student emoji, name, role, company
  - Navigation arrows and dot indicators
  - Stats bar: 50K+ Happy Students, 95% Success Rate, 4.8★ Average Rating
  - Clean white/blue design

### 7. **ContactForm** (Redesigned)
- **Location**: `src/components/ContactForm.jsx`
- **Features**:
  - Headline: "Talk to Our Learning Advisor"
  - Form fields:
    - Full Name
    - Email Address
    - Phone Number
    - Course dropdown (8 courses)
    - Message (optional)
    - "Request a Callback" button
  - Right sidebar with contact information:
    - Phone numbers (India + USA)
    - Email with response time (2 hours)
    - Support hours (Mon-Fri 9AM-7PM IST, Sat-Sun 10AM-6PM IST)
    - Limited time offer card (blue background with white text)
  - Form validation and success message
  - Contact details cards with icons

### 8. **Footer** (Redesigned)
- **Location**: `src/components/Footer.jsx`
- **Features**:
  - Dark background (`#222222`) for contrast
  - Logo and brand description
  - Social media links (Facebook, Twitter, LinkedIn, Instagram)
  - Four link columns:
    1. **Courses**: All Courses, CompTIA Certifications, CISA & CISM, Agile & Scrum, IT Service Management
    2. **Company**: About Us, Blog, Careers, Press, Contact
    3. **Support**: Help Center, FAQ, Documentation, Community, Status
    4. **Legal**: Privacy Policy, Terms of Service, Cookie Policy, Disclaimer
  - Contact section with phone, email, and location
  - Copyright notice with current year
  - Bottom links: Privacy Policy, Terms of Service, Cookie Settings
  - Uses primary blue accent color on hover

---

## Updated Files

### Configuration Files
- **tailwind.config.js**: Updated with new color palette (primary, accent, dark, light, light-gray, border-gray) and Poppins font
- **index.html**: Updated metadata for corporate branding, removed JetBrains Mono import
- **src/index.css**: New corporate button styles, utilities, and scrollbar styling

### Component Files
- **src/App.jsx**: Simplified to include TopBar instead of unnecessary sections
- **src/components/TopBar.jsx**: NEW component
- **src/components/Navbar.jsx**: Completely redesigned
- **src/components/HeroSection.jsx**: Completely redesigned
- **src/components/CoursesSection.jsx**: Completely redesigned with tabs
- **src/components/WhyChooseUs.jsx**: Redesigned with new differentiators
- **src/components/TestimonialsSection.jsx**: Updated with corporate design
- **src/components/ContactForm.jsx**: Redesigned with form and contact info
- **src/components/Footer.jsx**: Redesigned with dark corporate footer

### Removed Components
- AboutSection.jsx (no longer needed)
- AISection.jsx (content integrated into other sections)

---

## Features Implemented

✅ **Professional Corporate Design**
- Clean white backgrounds
- Blue primary color (#0056D2)
- Yellow accent color (#FFC300)
- Consistent spacing and typography

✅ **Responsive Layout**
- Mobile-first approach
- Tablet optimizations (md breakpoint)
- Desktop layouts (lg breakpoint)
- Flexible navigation menu

✅ **Interactive Elements**
- Hover animations using Framer Motion
- Smooth transitions and staggered animations
- Tab-based course categorization
- Testimonial carousel with indicators
- Form with validation

✅ **Brand Elements**
- Contact information prominently displayed
- Clear call-to-action buttons
- Year-end offer messaging
- Social media links in footer

✅ **Performance**
- Successfully builds with Vite
- Optimized CSS with Tailwind
- Smooth animations with Framer Motion
- Images using Unicode emoji icons (no external images)

---

## Running the Project

### Development Server
```bash
npm run dev
```
Accessible at: `http://localhost:5175`

### Production Build
```bash
npm run build
```
Output: `dist/` directory

---

## Color Reference Guide

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Button | Blue | #0056D2 |
| Accent Button | Yellow | #FFC300 |
| Text | Dark | #222222 |
| Background | White | #ffffff |
| Section BG | Light Gray | #f5f5f5 |
| Borders | Border Gray | #e0e0e0 |
| Footer BG | Dark | #222222 |

---

## Contact Information

- **Phone (India)**: +91 8087020031
- **Phone (USA)**: +1 307-387-5278
- **Email**: contact@neoskills.co.in
- **Support Hours**: Mon-Fri 9AM-7PM IST, Sat-Sun 10AM-6PM IST

---

## Offer Details

- **Main Offer**: 20% OFF on all courses
- **Bonus**: Free AI in Cybersecurity module
- **Expiry**: December 31st, 2025
- **Featured Courses**: CompTIA Security+, CISA, CISM, AI in Cybersecurity, CompTIA Core, Agile Scrum Master

---

**Status**: ✅ COMPLETE & LIVE
**Last Updated**: 2025-01-15
