import React, { useRef, useEffect } from "react";
import './partnering.css';

// Example logos (replace with actual logo images in public/images/)
const partners = [
  {
    name: "AWS",
    logo: "/images/aws.png",
    description: "Amazon Web Services Certification Partner"
  },
  {
    name: "Microsoft",
    logo: "/images/microsoft.png",
    description: "Microsoft Certification Partner"
  },
  {
    name: "PeopleCert",
    logo: "/images/peoplecert.png",
    description: "PeopleCert Global Certification Partner"
  },
  {
    name: "PMI",
    logo: "/images/pmi.png",
    description: "Project Management Institute Partner"
  },
  {
    name: "SPCT",
    logo: "/images/spct.png",
    description: "SAFe Program Consultant Trainer Partner"
  },
  {
    name: "REA Scrum Alliance",
    logo: "/images/scrumalliance.png",
    description: "Scrum Alliance Registered Education Ally"
  },
  {
    name: "IEEE",
    logo: "/images/ieee.png",
    description: "IEEE Professional Certification Partner"
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
      <h2>Partnering with the World's Leading Universities and Companies</h2>
      <p className="partnering-description">
        We collaborate with global giants and India's top companies to deliver world-class certifications and professional training.
      </p>
      <div className="partner-slider-wrapper">
        <div className="partner-logos partner-slider" ref={sliderRef}>
          {[...partners, ...partners].map((partner, idx) => (
            <div className="partner-card" key={partner.name + idx}>
              <img src={partner.logo} alt={partner.name + ' logo'} className="partner-logo" />
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
