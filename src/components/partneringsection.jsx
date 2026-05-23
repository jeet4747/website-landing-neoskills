import React, { useRef, useEffect } from "react";
import './partnering.css';

const PartnerLogo = ({ svg, name }) => {
  return (
    <div className="partner-logo">
      {svg}
    </div>
  )
}

const svgLogos = {
  AWS: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
      <rect width="48" height="48" rx="8" fill="#FF9900" />
      <path d="M14 28c-4.5-1.5-7-4-7-7 0-4 3.5-7 9-7 3.5 0 6.5 1 8.5 3l-2.5 2c-1.5-1-3.5-2-6-2-3 0-5 1.5-5 3.5 0 2 1.5 3 5 4 3 .5 5 1.5 5 3.5 0 2-1.5 4-5 4-3.5 0-6.5-1-8.5-3l2.5-2c1.5 1 3.5 2 6 2 2 0 3-1 3-2.5 0-1.5-1-2.5-4-3.5m20 0c-2.5 0-4-1-5-2.5l-2.5 2c1 1.5 2.5 2.5 5 3v5c0 3-1.5 5-4.5 5-2 0-3.5-1-4.5-2.5l-2.5 2c1.5 2 4 3.5 7 3.5 4.5 0 7-3 7-7V24h-3.5l1.5-3h-12l.5 3h-2v-3l-1.5-2h3.5l1.5-2h5l1.5 2h3.5l1.5 3z" fill="white" />
    </svg>
  ),
  Microsoft: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
      <rect width="48" height="48" rx="8" fill="#00A4EF" />
      <rect x="10" y="10" width="12" height="12" rx="1" fill="white" />
      <rect x="26" y="10" width="12" height="12" rx="1" fill="white" />
      <rect x="10" y="26" width="12" height="12" rx="1" fill="white" />
      <rect x="26" y="26" width="12" height="12" rx="1" fill="white" />
    </svg>
  ),
  PeopleCert: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
      <rect width="48" height="48" rx="8" fill="#E31E24" />
      <circle cx="24" cy="24" r="10" fill="white" />
      <path d="M18 31V17h5.5c3 0 5 1.5 5 4 0 2-1.5 3.5-3.5 3.5h-3l5 6.5h-3.5l-5-6.5h-1.5v-3h2V31h-3.5z" fill="#E31E24" />
    </svg>
  ),
  PMI: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
      <rect width="48" height="48" rx="8" fill="#00539B" />
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PMI</text>
    </svg>
  ),
  SPCT: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
      <rect width="48" height="48" rx="8" fill="#0065A4" />
      <path d="M14 14h20v4H18v6h14v4H18v6h16v4H14V14z" fill="white" />
    </svg>
  ),
  Scrum: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
      <rect width="48" height="48" rx="8" fill="#149647" />
      <circle cx="24" cy="18" r="5" fill="white" />
      <circle cx="24" cy="30" r="5" fill="white" />
      <path d="M24 23v4" stroke="white" strokeWidth="2" />
      <path d="M19 20l8 6" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <path d="M29 20l-8 6" stroke="white" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
  IEEE: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
      <rect width="48" height="48" rx="8" fill="#00629B" />
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">IEEE</text>
    </svg>
  ),
}

const partners = [
  {
    name: "AWS",
    description: "Amazon Web Services Certification Partner",
    svg: svgLogos.AWS
  },
  {
    name: "Microsoft",
    description: "Microsoft Certification Partner",
    svg: svgLogos.Microsoft
  },
  {
    name: "PeopleCert",
    description: "PeopleCert Global Certification Partner",
    svg: svgLogos.PeopleCert
  },
  {
    name: "PMI",
    description: "Project Management Institute Partner",
    svg: svgLogos.PMI
  },
  {
    name: "SPCT",
    description: "SAFe Program Consultant Trainer Partner",
    svg: svgLogos.SPCT
  },
  {
    name: "REA Scrum Alliance",
    description: "Scrum Alliance Registered Education Ally",
    svg: svgLogos.Scrum
  },
  {
    name: "IEEE",
    description: "IEEE Professional Certification Partner",
    svg: svgLogos.IEEE
  }
];

const PartneringSection = () => {
  const sliderRef = useRef(null);
  useEffect(() => {
    const slider = sliderRef.current;
    let animationId;
    let position = 0;
    const speed = 1; // px per frame
    const loopWidth = slider.scrollWidth / 2;
    function animate() {
      position -= speed;
      if (Math.abs(position) >= loopWidth) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  return (
    <section className="partnering-section">
      <h2>Trusted by Global Leaders</h2>
      <p className="partnering-description">
        We collaborate with the world's top certification bodies and India's leading companies.
      </p>
      <div className="partner-slider-wrapper">
        <div className="partner-logos partner-slider" ref={sliderRef}>
          {[...partners, ...partners].map((partner, idx) => (
            <div className="partner-card" key={partner.name + idx}>
              <PartnerLogo svg={partner.svg} name={partner.name} />
              <div className="partner-info">
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartneringSection;
