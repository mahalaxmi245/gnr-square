import { useEffect, useRef } from "react";
import directorPhoto from "../assets/director.jpeg"; 
const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "7+", label: "Services" },
  { value: "100%", label: "Trusted" },
];

const values = [
  {
    icon: "🐘",
    title: "Trust & Strength",
    desc: "Like the elephant — our symbol — we stand for reliability, strength, and fortune. Every client relationship is built on unshakeable trust.",
  },
  {
    icon: "🏠",
    title: "Real Estate & Beyond",
    desc: "From property development to home solutions, we guide you through every step of your real estate journey with expert knowledge.",
  },
  {
    icon: "📈",
    title: "Growth — Noble — Reliable",
    desc: "GNR stands for Growth, Noble values, and Reliability. These three pillars define every service we deliver.",
  },
];

export default function AboutPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --yellow: #FACC15;
          --navy: #1e1b4b;
          --navy-light: #2d2a6e;
          --white: #ffffff;
          --gray: #6b7280;
        }

        .about-wrapper {
          font-family: 'DM Sans', sans-serif;
          background: #f9f8f4;
          color: var(--navy);
        }

        /* Hero Banner */
        .about-hero {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
          padding: 80px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 300px; height: 300px;
          background: var(--yellow);
          opacity: 0.08;
          border-radius: 50%;
        }
        .about-hero::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -40px;
          width: 250px; height: 250px;
          background: var(--yellow);
          opacity: 0.06;
          border-radius: 50%;
        }
        .hero-tag {
          display: inline-block;
          background: var(--yellow);
          color: var(--navy);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .about-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          color: var(--white);
          margin: 0 0 16px;
          line-height: 1.15;
        }
        .about-hero h1 span {
          color: var(--yellow);
        }
        .about-hero p {
          color: rgba(255,255,255,0.7);
          max-width: 520px;
          margin: 0 auto;
          font-size: 1rem;
          line-height: 1.7;
        }

        /* Stats Bar */
        .stats-bar {
          background: var(--yellow);
          padding: 28px 24px;
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .stat-item {
          text-align: center;
          padding: 8px 40px;
          border-right: 1px solid rgba(30,27,75,0.2);
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          color: var(--navy);
          display: block;
        }
        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--navy);
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Director Section */
        .director-section {
          max-width: 1000px;
          margin: 70px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 700px) {
          .director-section { grid-template-columns: 1fr; gap: 32px; }
          .director-photo { margin: 0 auto; }
          .stat-item { padding: 8px 20px; }
        }
        .director-photo {
          position: relative;
          width: 260px;
        }
        .director-photo img {
          width: 100%;
          border-radius: 16px;
          display: block;
          object-fit: cover;
          aspect-ratio: 3/4;
          background: #ddd;
        }
        .photo-placeholder {
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--yellow);
          font-size: 4rem;
        }
        .photo-placeholder p {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          margin-top: 12px;
          font-family: 'DM Sans', sans-serif;
        }
        .photo-badge {
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--yellow);
          color: var(--navy);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 100px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(250,204,21,0.4);
        }
        .director-info {
          padding-bottom: 8px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--yellow);
          background: var(--navy);
          display: inline-block;
          padding: 4px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .director-info h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin: 0 0 4px;
          color: var(--navy);
        }
        .director-info .role {
          color: var(--gray);
          font-size: 0.9rem;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .director-info p {
          color: #444;
          line-height: 1.8;
          font-size: 0.95rem;
          margin-bottom: 12px;
        }
        .director-contact {
          margin-top: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .contact-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--navy);
          color: white;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
        }
        .contact-chip:hover { background: var(--navy-light); }
        .contact-chip.yellow {
          background: var(--yellow);
          color: var(--navy);
        }
        .contact-chip.yellow:hover { background: #e6b800; }

        /* Values Section */
        .values-section {
          background: var(--navy);
          padding: 64px 24px;
        }
        .values-inner {
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }
        .values-inner h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: white;
          margin-bottom: 8px;
        }
        .values-inner .sub {
          color: rgba(255,255,255,0.5);
          margin-bottom: 48px;
          font-size: 0.9rem;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          text-align: left;
        }
        .value-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 28px 24px;
          transition: transform 0.3s, border-color 0.3s;
        }
        .value-card:hover {
          transform: translateY(-4px);
          border-color: var(--yellow);
        }
        .value-icon {
          font-size: 2rem;
          margin-bottom: 14px;
          display: block;
        }
        .value-card h3 {
          font-family: 'Playfair Display', serif;
          color: var(--yellow);
          font-size: 1.1rem;
          margin-bottom: 10px;
        }
        .value-card p {
          color: rgba(255,255,255,0.65);
          font-size: 0.88rem;
          line-height: 1.7;
        }

        /* Location Strip */
        .location-strip {
          background: var(--yellow);
          padding: 20px 24px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--navy);
          letter-spacing: 0.5px;
        }

        /* Animations */
        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
          opacity: 1;
          transform: none;
        }
        .fade-in:nth-child(2) { transition-delay: 0.1s; }
        .fade-in:nth-child(3) { transition-delay: 0.2s; }
      `}</style>

      <div className="about-wrapper" ref={sectionRef}>

        {/* Hero */}
        <div className="about-hero">
          <span className="hero-tag">About Us</span>
          <h1>Built on <span>Trust.</span><br />Driven by Excellence.</h1>
          <p>GNR Square Associates is Hanumakonda's trusted partner for real estate, home solutions, and business services — serving the community for over a decade.</p>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Director */}
        <div className="director-section">
          <div className="director-photo fade-in">
            {/* Replace the div below with <img src={directorPhoto} alt="Ganji Narahari" /> */}
            <img src={directorPhoto} alt="Ganji Narahari" />
            <div className="photo-badge">🐘 Director & Founder</div>
          </div>

          <div className="director-info fade-in">
            <span className="section-label">Meet the Founder</span>
            <h2>Ganji Narahari</h2>
            <p className="role">Director — GNR Square Associates</p>
            <p>
              With over <strong>10 years of experience</strong> in real estate, finance, and business consultancy, Ganji Narahari has built GNR Square Associates into one of Hanumakonda's most trusted service providers.
            </p>
            <p>
              His vision is simple — deliver <strong>Growth, Noble values, and Reliability</strong> to every client. From property guidance to vastu consultancy and home maintenance, GNR Square Associates is a one-stop solution for all your needs.
            </p>
            <div className="director-contact">
              <a href="tel:+919966331389" className="contact-chip yellow">
                📞 +91 9966331389
              </a>
              <a href="https://wa.me/919966331389" className="contact-chip">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="values-section">
          <div className="values-inner">
            <h2>Why Choose GNR Square?</h2>
            <p className="sub">Every service backed by trust, quality, and dedication.</p>
            <div className="values-grid">
              {values.map((v) => (
                <div className="value-card fade-in" key={v.title}>
                  <span className="value-icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="location-strip">
          📍 Near Adalath, GampaPeddanna Lane, Opposite D-Mart, Hanumakonda, Telangana
        </div>

      </div>
    </>
  );
}
