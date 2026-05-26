import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

/* ─────────────────────────────────────────────────────
   PARTICLE CANVAS — floating starfield
───────────────────────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const GOLD = [201, 168, 76];
    const BLUE = [29, 111, 232];

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.6 ? GOLD : BLUE,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, opacity:0.5 }} />;
};

/* ─────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────
   ROUTE CHANGE HANDLER
   - scrolls to top
   - strips all .visible classes (resets reveal state)
   - after a short paint delay, re-observes every .reveal
     element so in-viewport ones animate immediately
───────────────────────────────────────────────────── */
const RouteHandler = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll to top instantly
    window.scrollTo(0, 0);

    // 2. Strip stale 'visible' flags from the previous page
    document.querySelectorAll('.reveal.visible').forEach(el => el.classList.remove('visible'));

    // 3. Wait one frame for React to paint the new page, then observe
    const raf = requestAnimationFrame(() => {
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }   // lower threshold so elements near top trigger too
      );

      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

      // store on window so we can disconnect on next navigation
      window.__revealObs = obs;
    });

    return () => {
      cancelAnimationFrame(raf);
      if (window.__revealObs) { window.__revealObs.disconnect(); window.__revealObs = null; }
    };
  }, [pathname]);

  return null;
};

const ScrollRevealWrapper = ({ children }) => <>{children}</>;

/* ─────────────────────────────────────────────────────
   LIVE COUNTDOWN to Jan 14 2027
───────────────────────────────────────────────────── */
const Countdown = () => {
  const target = new Date('2027-01-14T09:00:00').getTime();
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="hero-countdown">
      {[['days', 'Days'], ['hours', 'Hrs'], ['mins', 'Min'], ['secs', 'Sec']].map(([k, label], i) => (
        <React.Fragment key={k}>
          {i > 0 && <span className="countdown-sep">:</span>}
          <div className="countdown-unit">
            <div className="countdown-num">{pad(t[k])}</div>
            <div className="countdown-label">{label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'about' | 'papers' | 'venue' | null
  const navRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const fn = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  // Close dropdown on route change
  const closeAll = () => { setOpenDropdown(null); setMobileOpen(false); };

  const toggleDropdown = (name) =>
    setOpenDropdown(prev => (prev === name ? null : name));

  const DropItem = ({ href, to, children }) =>
    href ? (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer" className="dropdown-item" onClick={closeAll}>{children}</a>
    ) : (
      <Link to={to} className="dropdown-item" onClick={closeAll}>{children}</Link>
    );

  const Dropdown = ({ name, label, children }) => (
    <div className={`nav-dropdown-wrap ${openDropdown === name ? 'dd-open' : ''}`}>
      <button
        className="nav-link nav-btn"
        onClick={() => toggleDropdown(name)}
        aria-expanded={openDropdown === name}
      >
        {label} <span className="chevron">›</span>
      </button>
      <div className="dropdown-panel">
        {children}
      </div>
    </div>
  );

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`} ref={navRef}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo-wrap" onClick={closeAll}>
          <img src="./ICISS2027logo.png" alt="ICISS 2027 Logo" className="navbar-logo" />
        </Link>

        <nav className="navbar-links">
          <Link to="/" className="nav-link" onClick={closeAll}>Home</Link>

          <Dropdown name="about" label="About">
            <DropItem href="/#about-iiest">About IIEST</DropItem>
            <DropItem href="https://www.iiests.ac.in/IIEST/AcaUnitDetails/IT">IT Department</DropItem>
            <DropItem href="/#about-iciss">About ICISS</DropItem>
          </Dropdown>

          <Link to="/committee" className="nav-link" onClick={closeAll}>Committee</Link>
          <Link to="/speakers" className="nav-link" onClick={closeAll}>Speakers</Link>

          <Dropdown name="papers" label="Call for Papers">
            <DropItem to="/tracks">Contribution Tracks</DropItem>
            <DropItem to="/guidelines">Author Guidelines</DropItem>
            <DropItem to="/submit-paper">Submit Your Paper</DropItem>
          </Dropdown>

          <a href="/schedule" className="nav-link" onClick={closeAll}>Schedule</a>
          <Link to="/registration" className="nav-link" onClick={closeAll}>Registration</Link>

          <Dropdown name="venue" label="Venue">
            <DropItem to="#">Visa Information</DropItem>
            <DropItem to="/venue">Venue</DropItem>
            <DropItem to="/tourist-destinations">Tourist Destinations</DropItem>
          </Dropdown>

          <Link to="/contact" className="nav-link" onClick={closeAll}>Contact Us</Link>
        </nav>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`ham-line ${mobileOpen ? 'open-1' : ''}`} />
          <span className={`ham-line ${mobileOpen ? 'open-2' : ''}`} />
          <span className={`ham-line ${mobileOpen ? 'open-3' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {[
            { label: 'Home', to: '/' },
            { label: 'About IIEST', href: '/#about-iiest' },
            { label: 'IT Department', href: 'https://www.iiests.ac.in/IIEST/AcaUnitDetails/IT' },
            { label: 'About ICISS', href: '/#about-iciss' },
            { label: 'Committee', to: '/committee' },
            { label: 'Speakers', to: '/speakers' },
            { label: 'Contribution Tracks', to: '/tracks' },
            { label: 'Author Guidelines', to: '/guidelines' },
            { label: 'Submit Paper', to: '/submit-paper' },
            { label: 'Schedule', href: '/schedule' },
            { label: 'Registration', to: '/registration' },
            { label: 'Venue', to: '/venue' },
            { label: 'Tourist Destinations', to: '/tourist-destinations' },
            { label: 'Contact Us', to: '/contact' },
          ].map(({ label, to, href }) =>
            href ? (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer" className="mobile-link" onClick={() => setMobileOpen(false)}>{label}</a>
            ) : (
              <Link key={label} to={to} className="mobile-link" onClick={() => setMobileOpen(false)}>{label}</Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

/* ─────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────── */
const Hero = () => (
  <section className="hero-section">
    <div className="hero-bg-grid" />
    <div className="hero-orb hero-orb-1" />
    <div className="hero-orb hero-orb-2" />
    <div className="hero-orb hero-orb-3" />

    <div className="hero-inner">
      {/* Gallery */}
      <div className="hero-gallery">
        <div className="gallery-frame gallery-frame-left">
          <img src="./Vidyasagar_Setu_kolkata.jpg" alt="Vidyasagar Setu" />
          <div className="gallery-label">Vidyasagar Setu</div>
        </div>
        <div className="gallery-frame gallery-frame-center">
          <img src="./vcm2.jpg" alt="Victoria Memorial" />
          <div className="gallery-label">Victoria Memorial</div>
        </div>
        <div className="gallery-frame gallery-frame-right">
          <img src="hwb.jpg" alt="Howrah Bridge" />
          <div className="gallery-label">Howrah Bridge</div>
        </div>
      </div>

      {/* Title */}
      <div className="hero-title-block">
        <div className="hero-eyebrow">IIEST Shibpur · Kolkata, India</div>

        <h1 className="hero-h1">
          3<sup>rd</sup> International Conference on<br />
          <em>Intelligent Systems</em> &amp; Security
        </h1>

        <div className="hero-badge">ICISS 2027</div>

        <div className="hero-date-strip">
          <span>14</span><sup>th</sup> — <span>16</span><sup>th</sup> January 2027
        </div>

        <Countdown />

        <div className="hero-cta-row">
          <Link to="/submit-paper" className="btn-primary">Submit Paper →</Link>
          <Link to="/registration" className="btn-secondary">Register Now</Link>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
      <span className="scroll-text">Scroll</span>
      <div className="scroll-track"><div className="scroll-fill" /></div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   CONFERENCE DATE BANNER
───────────────────────────────────────────────────── */
const ConferenceDetails = () => (
  <section className="conf-date-section">
    <div className="conf-date-inner">
      <div className="conf-date-item reveal">
        <span className="conf-date-icon">📅</span>
        <div>
          <div className="conf-date-label">Conference Dates</div>
          <div className="conf-date-value">14<sup>th</sup> – 16<sup>th</sup> January 2027</div>
        </div>
      </div>
      <div className="conf-date-divider" />
      <div className="conf-date-item reveal reveal-delay-1">
        <span className="conf-date-icon">📍</span>
        <div>
          <div className="conf-date-label">Venue</div>
          <div className="conf-date-value">IIEST Shibpur, Howrah, India</div>
        </div>
      </div>
      <div className="conf-date-divider" />
      <div className="conf-date-item reveal reveal-delay-2">
        <span className="conf-date-icon">📄</span>
        <div>
          <div className="conf-date-label">Paper Submission Deadline</div>
          <div className="conf-date-value">TBA</div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   VENUE MAP
───────────────────────────────────────────────────── */
const VenueSection = () => (
  <section className="map-section">
    <div className="section-tag centered reveal">Find Us</div>
    <h2 className="section-title reveal">Venue</h2>
    <div className="map-container reveal">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.634645281488!2d88.3045!3d22.5552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzE4LjciTiA4OMKwMTgnMTYuMiJF!5e0!3m2!1sen!2sin!4v1634567890123"
        width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
        title="IIEST Shibpur Map"
      />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   ADDRESS
───────────────────────────────────────────────────── */
const AddressSection = () => (
  <section className="address-section">
    <div className="address-card reveal">
      <div className="address-pin">📌</div>
      <h3>Address</h3>
      <p>Indian Institute of Engineering Science and Technology,<br />
        Botanical Garden Area, Howrah, West Bengal 711103, India</p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   ABOUT IIEST
───────────────────────────────────────────────────── */
const AboutIIESTSection = () => (
  <section id="about-iiest" className="about-section scroll-mt-24">
    <div className="about-inner">
      <div className="about-img-wrap reveal">
        <img src="https://iciss2024.in/static/media/clg1.2c7df5d561629cc3f013.png" alt="IIEST Shibpur Campus" />
        <div className="about-img-badge">Est. 1856</div>
      </div>
      <div className="about-text reveal reveal-delay-2">
        <div className="section-tag">About</div>
        <h2 className="section-title left-align">About IIEST</h2>
        <p>IIEST Shibpur, the Indian Institute of Engineering Science and Technology Shibpur, is a well-respected technical college located in Shibpur, West Bengal, India.</p>
        <p>Established in 1856, it holds a notable place among the oldest engineering colleges in the country. IIEST Shibpur is known for its commitment to promoting research and innovation.</p>
        <p>The college provides ample opportunities for students and faculty to engage in research activities across various disciplines. With its dedicated research facilities and experienced faculty members, IIEST Shibpur offers a conducive environment for students to explore new ideas and contribute to the advancement of knowledge.</p>
        <a
          href="https://www.iiests.ac.in/IIEST/About#:~:text=About%20IIEST%2C%20Shibpur,-IIEST%2C%20Shibpur%20(Erstwhile&text=The%20Institute%20has%20a%20rich,16%20departments%20and%208%20schools."
          target="_blank" rel="noreferrer"
          className="btn-primary"
          style={{ marginTop: '1.75rem', display: 'inline-flex' }}>
          Know More →
        </a>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   ABOUT ICISS  (drop-in replacement)
───────────────────────────────────────────────────── */
const AboutICISS = () => (
  <section id="about-iciss" className="about-iciss-section scroll-mt-24">
    <div className="about-iciss-inner">
      <div className="section-tag centered reveal">About the Conference</div>
      <h2 className="section-title reveal">
        About International Conference on<br />Intelligent Systems and Security
      </h2>

      <p className="about-iciss-lead reveal">
        The International Conference on Intelligent Systems and Security is set to take place in January 2027, and will bring together industry experts, practitioners, and researchers in the field. Attendees will have the opportunity to network and collaborate with other professionals in the field. This conference is highly recommended for those looking to stay up-to-date with the latest developments in intelligent systems and security, and to exchange ideas and collaborate on future projects.
      </p>

      <div className="about-iciss-cards">
        <div className="iciss-card reveal reveal-delay-1">
          <div className="iciss-card-icon">🎯</div>
          <h3>Aim</h3>
          <p>The aim of ICISS 2027 is to bring together researchers, practitioners, and industry experts from around the world to foster the exchange of ideas, advances, and innovations in the field of intelligent systems and security. By promoting collaboration and knowledge sharing, ICISS aims to drive the development and adoption of intelligent systems and security technologies.</p>
        </div>
        <div className="iciss-card reveal reveal-delay-2">
          <div className="iciss-card-icon">🔭</div>
          <h3>Scope</h3>
          <p>ICISS welcomes contributions in the form of research papers, case studies, and industry presentations, covering a wide range of topics related to intelligent systems and security. The conference encourages multidisciplinary approaches and invites submissions that explore the union and intersection of intelligent systems and security.</p>
        </div>
      </div>

      {/* ── PUBLICATION SECTION ── */}
      <div className="publication-section reveal" style={{ marginTop: '4rem' }}>
        <div className="section-tag centered">Publication</div>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Publication</h2>

        <div className="publication-cards-row">

          {/* Card 1 — ICISS 2027 Publication */}
          
          <div className="pub-card pub-card-main reveal reveal-delay-1">
            <div className="pub-card-header">
              <div className="pub-card-label">ICISS 2027</div>
            </div>
            <p className="pub-card-text">
              Note: All Accepted and presented papers will be published by{' '}
              <span className="pub-springer-inline">
                <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCADDAXoDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIAQYEBQkDAv/EAFAQAAEDBAECAwQBDQoNBQEAAAEAAgMEBQYRBxIhCDFBEyJRYXEUFhcyN1JVgZGUstHSFRgjQlRWdHWSkzQ1NjhDc4WhorGzweIkM2VygvD/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAMhEAAgIBAwIDBAkFAAAAAAAAAAECAxEEEiETMQUUQRUiUfAkMjNTVGFxgYJCUpGx8f/aAAwDAQACEQMRAD8AuWiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIsFa/yPc7nZcCvt4s4hdX0NBNUwtlYXNcWMLtEAjz0iWXghvB3VZVU1FTuqaueKngZrqkkeGtbs67k9gs0tTBVQNnpp45onDbXxuDgfxhUbzHm/P8j4vrbbldmop7RfGGGlroIjH0yxyNcQdEtOun7UgHRB3rz5PGGQ1vB+TYzcbjX1s2LZNaG1dVA1vV0OII21u9FzXBp3968jue57PJS28vk5/MrPCLwooZsviO45u+XW6w0VVUiOsYSa6oYIIYH6JDHl5B2deY2NkD6JiikZLG2WN7XscNtc07BHyXLOuUPrI3jKMuzPoiIqlgiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAxpRz4gc9s2DceXKavdFPWVsDqWkoi73pnvaW+nk0Akk9uw15kLeb5cqSzWatu1dKIqWjgfPM8+jWgkn8gVI8XtOMZBZL7zFyoy+1dvqLyYKemoXDb3OBcdlxB6BsNGiNa16dujT1KT3S7IxunhYXqSjwnxFFl/hvpbJk1ZLTwXC4m7UjqVzS+Fpb0tBJBHcdR0NH3tdjtdlzxxbdbjW8YUWO2V10tlgkFNWucWENgDoAOtriOoFrHk6B8jv5yXwZdbDduPKSXF8euFhs0T3x0lNWxdDnM31dbfedtri4nez32t72kr5xsyQqouJFGYeHzi/I4pSMfjtNS8e7Pbnex6T8ege5/wqC+QMV5g4OtskuMZVcK3FfateZIh1Gm0dgPY4EMBJ0S33Xdg7XYK5Qc0kgEbC+VZTU9ZSy0lVDHPTzMdHJHI0Oa9pGiCD2IO0r1E4v3uUTKqL7cM1vjDNrLnuJ01+stSZWOAZPG4ASQyAe8x7Qex7/QRojstqVNM0s1+4K5nohjF7faMWyCrhcXvaHxRsEg643gg7DA4kEaPS7z3sq5bTsBVurUcOPZk1zcuH3MoiLE1Glgp6rV+Q87xnAbN+6mS3FlLG7tDEB1SzkfxWNHcnuPkN9yiTbwiG0u5tGkVdmeI+/XdslXiPEmQ3i2tcQ2q08B2vkxjwD9DiuPj3iyx2SsfSZPi90s0jXdLnROE4Yd9+oENcNfAAlb+Wtx2M+tD4lkkXypZ46mmiqIXB0UrA9jviCNgr6rA1CIiAIiIAiIgMLK6HOcqs2GY1U5Bf6r6noqcDZDepz3E6DWgebie2v+Q2tZ4n5fw/kuerpbBLVxVdK0SPp6uIMeWb11jRII389jY2BtWUJNbscFXJJ4JEREVSwREQBERAEREAREQBERAEREAREQBERAEREAREQBYRQx4peUJMGxmKx2RzjkV5aY6Zzf9AwnpdJ/9tnTR8dn072hBzkoorKSiss0jnbJbryvyFTcOYXMRQxSh16rG92DpI6gfi1nw37zyB6bM8WTBsZtOJW7FYrVTz2y3dDoYp2B4L2nYkdvsXdRLt/FQt4d7Y3jrOqbAJLfDV3u5Wn91L3cPa7dTO2eiADy0NtJO+5eT8NWJq6iCkpZauqmZDBCwySSPOmsaBskn0AW9z24hHsZVrPvMMkpxL9TMfGJGMDjG0jbWkkA69B2P5F9XENaSToAd1TaO4ZrnnPV4yzhZ1bFBFH7Catr5uqneNEdg8Hpa7QLWaJGt6b5D6cwZjz7hFripcpyeyj91Q+BlPSRxumc0tIc4aYCANgbBB2Rr5WWkbaWSOvxnBuPhIklvPJvJWSNme+klrumAl22kPllcdfiDfyqywUV+GLBZsF4tpKavj9nc7i81tY0+bHPADWdwCC1obsehLlKay1ElKbwXpi1HkiPxZ4q3JuGrpNHD7SstIFfA71aGf8Auf8AB1dvkF+fCxnN2zfjmJ90tUlKbYI6KOrLy5tZ0MALxsdjsd9bGz5+gk/IaBl0sNwtkgBZV00kDh8nNLf+6r34E79Svw+7YxNWRCupq59RHTOcA/2bmtDnAeZAcO/zPzV4vdQ1jsVfFq/MsoiIuY3ME6GyqDcj3p/JXiZjt92ne61i9MtcMYcQ1kDZQw9PwLiHOJ89u+QAvyRsLzw8RGJ3bBeX7pP0S08FXWPuFvqWEgEPeX+64dw5riQfUEA+RBPdoUnJr19Dl1OcL4HoPb6Olt9FDRUNPFT00DBHFFG3paxo7AADyVdfGtxzRXHEm51a6NrLnb5GMrDEwD20DyGguAGy5ri3v8Cd9gNdjwh4kMeyShprTmVRFZ721oYaiQ9NPUu8uoO8mOPno9vgfQT6x0VRCHMLJY3jYI7tI/7rFdTT2ZZp7tscI6PjeZ1Rx9jtQ/fVLbKZ538TG0rYV1mTXikx3H629VzZjS0UJlkEMZe/pH3rR5lVuzTxbUdOXU+K4tUyy617a5PEYaf9Wwkn+0FSFU7W9qLSsjWlktIigLJPEnYLVjVCLXSSZHkEtFFJUw0TXNgglcwF4c/vrR32G/LRIWlYz4uKkXVsGU4nHFSOdp8tFK72kfz6H/bfRsK0dLbJZSKu+C9S2SLrMZvdryOx0l6s1ZHWUNVH1xSxnsR8PiCDsEHuCNKKORvEdhmG3qusklvu9fcKOR0UjY4QyPrb211uI7fMAj6VlGqc3tS5LymorLJqKFQlg3P9qunGd5zzI6JlppKKuNJT00cvtZZndDXNaOw6nHZ8tAAEnsNrUeNvFFPk/IlDj9wxqGjoLjUCnp5Yp3Pkje46Z1bGnAkgHQGt79Fp5aznjsV60OOSX+c8B+yRx/U44ytFFUe1ZPTyuaSwSM3oOHn0nZHby8++tGPfDXwRc+Ncgrcgv91oqqslpzTQQ0ZeWNaXAuc5zg0knpHbXbv38tbRyrzpiPHl5fZrpSXWqrmRh5ZTwDoHUNgdbnAfk2uBwLzVJypkl4o47G210dBTskjLp/aSPLnEdzoADt5d/pV49ZVNf0lX03NfEmVYWqcnZ7Y+PLAy835tY6nkm9ixtND7R7nFpd5bAHZp7kqHbV4pLVfc4tdjtVifSW6pnDamvuE7WeyjAJc7obsDQHmXaHqFlCmc1mKLytjF4ZY5FW/kPxRUFvqZaXCMfnvjIXFslfN1Mp9j70AEuHzPT5eRHdfThzxN0GWZDT49k9ojtFVVvEdNUwyl0T3k6DHA92k+QOz3I8lfy1u3dgjrQzjJYv8AEs+iwtN5U5Hxnjiyi45DUu65SW01LCA6adw1sNBIHbfckgD8gWMYuTwkaNpcs3LaztVxoubOWMitbr/inE5nsjS4sklnc98oB0S0DpLv/wAg91xrF4tsfdSOZkGK3Sjr2O6fZ0r2Ssd89uLSD8tH6Vt5Wx9kZdeHqyy6won4Z5lj5Ov9bR2vFbhRW+jh65a6omboPLgGx9IHmR1H7bt0rbeS8/xvj2wm7ZFWGMPJbBTxjqmnd96xu+/mNk6A2NlZuualtxyaKcWsm1p6quVx5v5VktBya1cSTNx4N9q2aeVz5HRefXpoBA1330ka9SO63ng/mvHuT4pKOKB9rvUMftJaKV4d1NHYujd26h5b7Ajf41eVE4rOCsbYt4JVTzWh8scpY1xrT0kl/ZcJHVfX7FlLB1k9Ot7JIA+2HmVHnH3iPo835LosZttgdQ22Vk0ktZV1A6w1kbn/AGo7N+19XHsqxpnJbkuA7Ip4ZP6x9Cq5nviwp7dk0lDithhudup5Oh9VUTOZ7cgnZjAHZvbsTvfwViMGyKky3EbZklDHJFBcIGzNjk+2YT2LT8dHY2Pgk6Z1pOS7iNkZPCO8REWZoEREAREQBR/zhxna+TMUfbqkMguVOHPt9Z0+9DJ8CfvHaGx9B8wpAWFMZOLyisoqSwyjGT8o8p2HEKzAK63yU12soNNX3hrC6obSktDG+0A7AkgB4PvAt132TtvJ/IUmTcS4Dxtit5juN5vlLR090dHOJHsIYxpjkOyQ4vO3b76aQexVncsxPHsrtVVa77bIqqlq+j27duY6Tod1MBc0h2ge+tqNsjwLiPiS0T8gw40ynqbS32tMRVSuc6U+6xoDnkEkuA7jtva7o31yx7vJzOqa9eDk3q+Yd4euKqK3ANmqGR9NPTMIbNXT6HXI7z0CdEuO9AgD0C0bhHj3IOQMvZy9ya0vc8iS0W9491rQdsf0n7Vjd7a0+Z94+m+FwdgN05VyZ/LnJTfqqmfJu12+Rp9k5rSek9J/0bfRp31EEnY+2tE0BoDQAAPILKyar91fWfdl4R38vsfpERcp0H5d5H6CqveBuyWyWfK8kNK11fHVilhnLj7sTvec0Deu5DTvW/TasflleLVi91ubjoUlHLOT8OlhP/ZV08CNsyaCx3e6Sy07ccq5CIYyNyuqGkAv3rs3p2Ds+fkOx3018Uz/AGMJ/aRLPoiLmNwtdzzDcdzexvs+SW6OspydsJ7PidrXUxw7tP0fjXb3apkpLXV1cUYkkhhfI1hOg4taSB/uWg+H3kl/J2FzXmopaejraerfTzU8LyQ3WnNPfv3a4d/Ug6VoqSW+PoVbjnayuHLXhfyKwCe5YbO++29m3GlcNVUY9AAO0mvlo/JaVxDzNmPGdzjonTTV1nZJ01FrqnHTO/vezJ7xuB35difMfD0M9FTvx2YfbbZerPllBTsgmuRkgrQwAe0ewAtedeuiQT66HqvQ0+o6z6dizk5Laemt8GWtw/ILZleM0OQ2iX2tFWxCSMnsR6FpHoQQQfmFSfxq0tPT83zOgiZGZrfTySFrddTvebs/PTQN/IKdfAzNUS8N1DJXOMcV2mbECd6aWRkgfLZJ/GVB/jd+7b/syn/Seq6WOzUOK9Cbpbqk2W54dsVmsvHVibarXSUQqLdTzTGGINMj3RNJc4juST6nah/xqcd2eqwp+c0NHFTXSgljbUyRsDfqiJ7gz39ebmkt0fPWx8NTlxv9zzG/6ppf+i1aV4sKqKl4FyMy6PtWRRMB9XOlYB+v8S56pyVy59TacU6yKPAPklTLDkGJzyOfBCGVtO0nfRs9LwPhs9B/L8VtnjloaOTiWnrn0sJqobnEI5iwdbQ5rw4B3mAdDY9dBaj4A7DM0ZJk0jSInezooXHycR77/wAnuflW7+OL7i7P60g/5PXRPC1fBlHPQ5Il8InHMGc01VXZQHVmOWqpcaa3l2o5ap7W9T360SGsazsexLh8wbB2Pg3juy55FmFstMlPVw+9DTtlP1PE/RHW1n33f469QAVofgM+5heP63d/0o1YlZaq2fVkk+C1NcdiZG3iYoaSs4Qyf6qpopTDRmaIubsse0ghw+BUDeAH/KnKP6FD+mVYPxGfcPy3+rpFX3wA/wCVOUf0KH9Mq9T+jSIs+2iW9qIYqiF8U0TJY3ghzHtBDgfQgrzkwbHrXeOdaHG6+nLrZNeXQSRNcW7YHu93YOwCABsEHXkR5r0gPkvPTiv/ADnbX/X7/wBNynRNqM/0I1KWYl+bRZrVZ7VHarZbqWjoYm9LIIYg1gH0D/8AiqCeJSwW/E+cLpR2WBtJSufDVRRMGmxOe1rnBo9B1bIHoCB5AL0MPkqFeMj7vVf/AEam/QCjQNuxpv0GqSUUXstkrprbSzP7ufCxx+ktBVAvEXe6nLOfLrS1tRIKWkrxbYWk9omMcGO6fpcHO+klX6sn+JqH+jR/ohUz8XvFl4s+a1mcWmkmqbPcXe2qHwxkmlm17xfrya7XV1dhskfDcaKUVa0ydQm4LBc61UVJbbZTW+hgZBTU0TYoY2+TGNGgB9ACof4uLTBjvOtbUWz/ANOauKKv/gzroldsOcPgS5pdv4kqcuMvE5hlRh1OMyq6i33qlhEcwFO+RtS4DXWwsBALtb0daJ7bUTw4xkniG5iqcmZbqq34y6VjHVUzekMp2DQY0ns550TobALtntpaaaEqpylPhFbpKyKUS4GBVDKrCbTdHwxQSVlBDU1HQwNBe6NpcTrXdUryHO7Nn3iLgvOZXBsWKUNY5sLXsc+MU8Wy1vQASfaOALu38Y70AALv3SkbTYnVUFBH7NsVC+GBjf4oEZDQP9yoD4bI8fn5ktVuym30ldQ1pkpvZVUYewSuB6CQRrZcAB9KjSJNTn8Be2tsS27vEVxAxvQMlLmgaAbQTa/QVRsevVNb/ERS3nDBIKB+QA0TGxlvVBJL09AbrYBY4t156PoVeqk4148ph/AYLjbD8f3Mh3+XpXb2/HMft0jZLfY7bSPb9q6ClYwj6NBZV311p7V3NJVSljJ9Mht9FdbHWUNwpYqmmmgeySKRgc1wLTsaK86OGrBcsn5Nocctda+hNeZYKiZhAc2nLHe1AOj3LA4AepOj2JXpFXf4HP8A6t3/ACVCPCN/nCWf6Kn/AKL1rpJNVzaM9Qk5xLP3jw68WXG00dAyySUJpS3VRSzFs0o9Q9x31b+Otj0IUo2a20dotVLa7dTspqOlibDBE3yYxo0B3+S5iyVwyslLhs6lCMewREVSwREQBERAEREBxLrWw2211VxqA4xUsL5n9I2eloJOvxBUy8TXNGM8kWWy2WxtuUNLDW/VFaaiFrewb0t6QHHZAc46OvRXUljjlidFKxr2PBDmuGw4fArpvrOxL+bFm/Mo/wBS2oshW9zWTK2DmsJkO2fxL8S2q1UlsoYrvBS0kLYYY20fZrWgAD7b0Gly/wB9Pxf8bz+Z/wDkpX+s7Ev5sWb8xj/ZT6zsS/mxZvzKP9SlzpfOGRtsXqRR++n4v+N5/M//ACT99Pxf8bz+Z/8AkpX+s3Ev5sWb8yj/AGU+s3Ev5sWb8yj/AGU3U/2sbbPiV65h8SGF3/jW+WPHTcxca+mNNH7am6GhryGv2dnXuFy5XhU5Ww6kxrG+NoGXJ14lMvW8wNEPtHOfIfe6t6A7b16KevrOxL+bFm/Mo/2V9qLGMdoaqOqorDa6aojJLJYqRjXNOtdiBsKzuq2bEiFCe7dk7hERcxufGsj9tSzRffsLfyhUG4az668Kci3CkvVtqhb55DBcaRzCyRvS49MjA4DZGyddgQfPyIv8V1OQ43j+Q04p77ZaC5RDuG1NO2QA/LY7Lem5QTjJZTMbK3Jpp9jSaTnfieot7a4ZjRxM6eoskjkbI34gs6d7+hV35gyC7+IbPrbYMDtdTNabb1AVUzCxm3kB0sh/iNAaAAfePfQ2dKyjeFuLGz+2GD2jr3vvES38m9Lc7ParXZqJlFabfS0FKwabFTxCNg/EArRtrqe6C5IlCc1iR0nF2H0OB4Pb8ZoHe0bSs/hZi3Rmkcdvefhsny76Ggqe+N77tu//AIyn/Ser1eqor43fu2/7Lp/0nrXRNu5tlNSsV4JP4v8AE/htHh9ttWR2+5UNZQUrKcugjEscoY0NDgdggnW9EaHxXV5vdct8R9yorFidnrbThtNUCWpuVazpErwNb0Dp3SCdMaTsnZI9JtwTBcLrcPxy6VmKWWorja6Vxnkoo3PJ9k3uSRslb/FHHFGI4mNYwDs1o0As3dXCTcI8llXKUUpM6PAMVtWFYnQ43ZoyykpGdIc7u6RxO3Pd8yST+PQ7BVx8ZHKGJXrFnYTZ66SsutNcwasNhe1kBjD2uaXOABPUde7vyPfy3a1dVNjuPzTPmmsltkle4ue91Kwlx9SSR3PzWdVqjPfLkvOGY7UVL8IvLmH4Pj1zsGU1slvM9X9UwT+wfIxwLA0tPQCQR0juRo781cC31dPX0NPXUcglp6iNssTwCA5jgCDo/EELg/Wxjf4Atf5oz9S7SKNkUTY4mBjGABrWjQAHoAl9kbJbkhVBwWGQP4qOVMSteF5DgwrXz5DUQNgdSsif/BB4a4Oc8jp10kHsSdkD6IJ8I/ImN4Bll1fk9VJSUlwpWRsqGxOkaxzXb0Q0Fw2Ce4B7+au/WWKyVlQ6pq7RQVE79dUktOxznaAA2SN+QAXz+tjHPwBa/wA0Z+paV3wjW4Y7lJVSc92TXM35WwfD7LQXW93dzILlB9UUDY6eR7qhumn3QB27Ob9trzVDsBymjtPMVsy24Meyjiuv1VMGAuc1jnEkgDuSASdeul6N1dntNXFDFVWyiqGQN6YmywNcGDWtAEdh2Hl8F8PrYxz8AWv80Z+pKL4VJrHcWVSm08nBoM3xiuwc5rS3QPsLYnymr9k8AMY4tcekt6uxBHkqG+IvL7RmvLNxv1ikklt5ZFFFK9hYX9DAC4NOjokHW9HXovQuO30EdAaCOip20hBHsGxAR6J7jp1rRXE+tjHPwBa/zRn6lFF8apOWCbapTWMmqcMcl4tyBY4orHWPfXUdLF9WUr4nNdC4jWiSOkjYPdpPkq1eKXmTLbjkN4wGGmdZbZSVD6ecMeTLWMBOnOOhpjm6PSPMHuSFcm3Wq2W5z3W+3UlI54AeYYWs6teW9BVX8UlVime59Q4RidljueaOnbTzXGKToZCBsmN5A0/pGySftQCNkggX0rg7c44/0UuUlWlnk2vB848NdFjNtijjs1O+CFrS2ttRfUNcANl7ug7dv1BI+CkO0c1cTVcsdFRZjbIj2axsgdCwfje0NH5VFFj8IlkZbmfu3ldfLWEbeaSJjI2/IdWyfp7b+AWpcteF6bGsXrshxq/yXJlDEZpqOohDH+zaNuc14OiQNnRA8j66B0cdPZLG9lVK2K7Fx4pIp4WyRPbJG8ba5p2HA+o+Kop4mOJrzg2ZVeTWammfYKyc1MU8DTqjkc7ZY7Q9wBx909hogb2CpQ8CGWXKvtd7xSunknpreI6ijLnE+za8uD2D5bDSB6ElWcljZLGY5WNexw0WuGwVjGUtLa13Ro4q+CZTnCPFlfrXZ4aHJMfhvU8TekVcdT7B79DsXjpcCfmNb+G/OReLs65U5XzO2XqitjMYw2gkMlT17ea73S0sBIHX5+YAa09ySQApXPGnHxrhXHC7D9U9XV1/UMf22978tb2tqijZFG2OJjWMaNBrRoD6EsuqaeyPJMK5r6zNC5c5TxHj2gfBfq57a+opnyUtJHC975tbA0QOkd+3chUg4Ey+2YVy1askvAmFBC6VsxiZ1OaHxuaHa33ALgSB31vWz2PojcLTarg9slfbaOqe0aa6aBryB8O4XH+tjHPwDa/zRn6kpvhXBxa7kWVSnJPPY4WBZxjGdW2W44tcxX08Mns5XiJ8ZY7W9EPaDvRWyLiW+3UFujdHQUVPSMcepzYYmsBPxIC5a5njPBuu3IREUEhERAEREAREQHDutQ+ltlTUxgF0UTnt35bAJUK/ZhyD+Q0H9l361OFRDHUU8kEreuORpa4b8wexWrDjXDNf4mH9/J+0vI8S0+tucfLT2/P6Hs+FarQUKXm63L4Y/wCojj7MOQfyG3/2XfrT7MOQfyG3/wBl361I/wBjXC/wMP7+T9pPsa4X+Bh/fyftLzPZ/jH3y+f2PX9peA/h38/yI4+zDkH8ht/9l360+zDkH8ht/wDZd+tSP9jXC/wMP7+T9pPsa4X+Bh/fyftJ7P8AGPvl8/sPaXgP4d/P8iODzDkG/wDAaD+y79a7nCeTLze8oorXU0lGyGdxDnMDgRppPx+S277G2F/gYf38n7S5NqwXF7XcIq6htYiqIiSx/tXnWxryJ16rWjQ+KxsTnaml8/Ay1HiHgsqpRroaljh/n/k2ZERfSnygREQBERAfOWSOKN0kr2xsaNlzjoD8aoV4xrtb7rzVUSW6riqmU9FBBI+Jwc0PHUSNjsSA4A68jseYV38yxu05djlVj98hfPb6rp9rGyRzCel4cPeaQR3aFG/72riTz/cGp/P5v2l1aW2FUt0jC+EprCNv4gv1mu3HOOG33OkqHNttPG9jJWuc17Y2tc0jzBBBGluSjDF+CONsav8AR3y0WiograOQSwvNbK4B3zBdo/jUnrCzbuzE0huS5MoiKhcIiIAiIgCIiAIiIDh3ZlW+11TKF7Y6t0LxC53k1+j0k/j0vPbgrJIcG5wtt1ygSRNgqJqeufKCXwve10bnu9fdc7v5nW/Mr0U9FDvMXAGJ8hVz7xHLLZbzJr2lTTsDmTH4yMOtnXqCCfXa6tNdGGYz7MwurlLDj6EtUNZSV9JHV0VTDVQStDo5IXh7XD4gjsQo48RWfWTDuOrrT1VVG+53GlkpaOka4GR7pGlvVr0a3ZJPy15kKKbF4Zs5sszoLXytVW2hc7bvqRs0Zd9LGyAb/GpG464CxLGLqy+3eorMnvjXdYrLk/rDHjyc1nfuPi4uI8xpRsqg87sjdOSxg6fwccd12HYTVXu8wGnuN8cyRsLhp0UDAegO35OcXOJHw6d99gTwsAADSyVjZN2S3M0hFRjhBERULhERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf//Z" alt="Springer" className="pub-springer-inline-img" />
              </span>{' '}
              in a SCOPUS and Web of Science indexed book series (Proposal Submitted).
            </p>
          </div>

          {/* Card 2 — Earlier Conferences */}
          <div className="pub-card pub-card-history reveal reveal-delay-2">
            <div className="pub-card-header">
              <div className="pub-card-label">Earlier Conferences</div>
            </div>

            {/* ICISS 2024 */}
            <div className="earlier-conf-item">
              <div className="earlier-conf-badge">1st</div>
              <div className="earlier-conf-body">
                <div className="earlier-conf-title">
                  1<sup>st</sup> International Conference on Intelligent Systems and Security
                  <span className="earlier-conf-year"> (ICISS 2024)</span>
                </div>
                <div className="earlier-conf-links">
                  <a href="https://iciss2024.in/" target="_blank" rel="noreferrer" className="earlier-link">🌐 Website</a>
                  <a href="https://link.springer.com/book/10.1007/978-981-96-4273-1" target="_blank" rel="noreferrer" className="earlier-link pub-link">
                    📗 Publication
                  </a>
                </div>
                <div className="earlier-conf-book-wrap">
                  <a href="https://link.springer.com/book/10.1007/978-981-96-4273-1" target="_blank" rel="noreferrer">
                    <img
                      src="./icissbook.jpeg"
                      alt="ICISS 2024 Springer Book"
                      className="earlier-conf-book-img"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </a>
                  <div className="earlier-conf-pub-note">
                    Published in <strong>Lecture Notes in Networks and Systems</strong> by Springer
                  </div>
                </div>
              </div>
            </div>

            <div className="earlier-conf-divider" />

            {/* ICISS 2026 */}
            <div className="earlier-conf-item">
              <div className="earlier-conf-badge second">2nd</div>
              <div className="earlier-conf-body">
                <div className="earlier-conf-title">
                  2<sup>nd</sup> International Conference on Intelligent Systems and Security
                  <span className="earlier-conf-year"> (ICISS 2026)</span>
                </div>
                <div className="earlier-conf-links">
                  <a href="https://iciss2026.iiitnr.ac.in/" target="_blank" rel="noreferrer" className="earlier-link">🌐 Website</a>
                  <span className="earlier-link pub-link-pending">📙 Under Publication</span>
                </div>
                <div className="earlier-conf-pub-note" style={{ marginTop: '0.5rem' }}>
                  Publication: <em>Under Publication by</em>{' '}
                  <strong>Lecture Notes in Networks and Systems (Springer)</strong>
                </div>

                
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* ── END PUBLICATION SECTION ── */}

    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   IMPORTANT DATES TIMELINE SECTION
───────────────────────────────────────────────────── */

const ImportantDates = () => {
  const dates = [
    {
      label: 'Paper Submission Deadline',
      date: 'September 30, 2026',
      icon: '📝',
      color: 'blue',
    },
    {
      label: 'Notification of Acceptance',
      date: 'October 20, 2026',
      icon: '📬',
      color: 'teal',
    },
    {
      label: 'Camera Ready Submission',
      date: 'November 3, 2026',
      icon: '📄',
      color: 'gold',
    },
    {
      label: 'Author Registration Deadline',
      date: 'November 15, 2026',
      icon: '✅',
      color: 'orange',
    },
    {
      label: 'Conference Date',
      date: 'January 14–16, 2027',
      icon: '🎓',
      color: 'highlight',
      isHighlight: true,
    },
  ];

  return (
    <section className="timeline-section">
      <div className="timeline-inner">
        <div className="section-tag centered reveal">Schedule</div>
        <h2 className="section-title reveal">Timeline</h2>

        <div className="timeline-track">
          {/* Vertical line */}
          <div className="timeline-line" />

          {dates.map((item, i) => (
            <div
              key={i}
              className={`timeline-item reveal reveal-delay-${Math.min(i + 1, 4)} ${item.isHighlight ? 'timeline-item--highlight' : ''}`}
            >
              {/* Left: date */}
              <div className="timeline-date-col">
                <div className="timeline-date">{item.date}</div>
              </div>

              {/* Center: dot */}
              <div className="timeline-dot-col">
                <div className={`timeline-dot timeline-dot--${item.color}`}>
                  <span className="timeline-dot-icon">{item.icon}</span>
                </div>
              </div>

              {/* Right: label */}
              <div className="timeline-label-col">
                <div className="timeline-label">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ─────────────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────────────── */
const ContactPage = () => (
  <section className="page-section">
    <div style={{ position: 'relative' }}>
      <div className="section-tag centered reveal">Reach Out</div>
      <h1 className="section-title reveal">Contact Information</h1>
      <div className="contact-grid">
        {[
          { title: 'General Contact', email: 'conference.iciss@gmail.com' },
          { title: 'Shyamlendu Kandar', email: 'shyamalenduk@it.iiests.ac.in', phone: '+91 70031 98150' }
        ].map((c, i) => (
          <div key={i} className={`contact-card reveal reveal-delay-${i + 1}`}>
            <div className="contact-card-icon">✉️</div>
            <h3>{c.title}</h3>
            <a href={`mailto:${c.email}`} className="contact-email">{c.email}</a>
            {c.phone && <div className="contact-phone">📞 {c.phone}</div>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────
   SPEAKERS PAGE
───────────────────────────────────────────────────── */
const SpeakersPage = () => {
  const speakers = [
    {
      name: 'Professor Ajoy Kumar Ray',
      title: 'Indian Institute of Technology Kharagpur, India',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Ajoy_Kumar_Ray_-_Kolkata_2015-11-17_5154.JPG/500px-Ajoy_Kumar_Ray_-_Kolkata_2015-11-17_5154.JPG'
    }
  ];
  return (
    <section className="page-section">
      <div className="section-tag centered reveal">Keynotes</div>
      <h1 className="section-title reveal">Our Speakers</h1>
      <div className="speakers-grid">
        {speakers.map((s, i) => (
          <div key={i} className={`speaker-card reveal reveal-delay-${i + 1}`}>
            <div className="speaker-img-wrap"><img src={s.image} alt={s.name} /></div>
            <div className="speaker-info">
              <h3>{s.name}</h3>
              <p>{s.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   COMMITTEE PAGE
───────────────────────────────────────────────────── */
const CommitteePage = () => {
  const data = [
    { category: 'Chief Patron', members: [{ name: 'Dr Tejaswini Ananth Kumar', title: 'Chairperson BOG, IIEST, Shibpur, India' }] },
    { category: 'Patron', members: [{ name: 'Dr. V M S R Murthy', title: 'Director, IIEST, Shibpur, India' }] },
    { category: 'General Chairs', members: [{ name: 'Santi Prasad Maity', title: 'IIEST, Shibpur, India' }, { name: 'Arindam Biswas', title: 'IIEST, Shibpur, India' }] },
    { category: 'General Co-Chairs', members: [] },
    { category: 'Organizing Chair', members: [{ name: 'Shyamalendu Kandar', title: 'IIEST, Shibpur, India' }] },
    { category: 'Organizing Co-Chairs', members: [{ name: 'Binanda Sengupta', title: 'IIEST, Shibpur, India' }] },
    { category: 'Program Chairs', members: [{name: 'Indrajit Ray', title: 'Colorado State University, USA'}, { name: 'Debasis Giri', title: 'MAKAUT, India' }, { name: 'Shyamalendu Kandar', title: 'IIEST, Shibpur, India' }] },
    { category: 'International Advisory Committee', members: [] },
    { category: 'Website Committee', members: [{ name: 'Indrajit Banerjee', title: 'IIEST, Shibpur, India' }, { name: 'Soham Manna', title: 'IIEST, Shibpur, India' }, { name: 'Subarno Mandal', title: 'IIEST, Shibpur, India' }] },
    { category: 'Organizing Committee', members: [
      { name: 'Hafizur Rahaman', title: 'IIEST, Shibpur, India' },
      { name: ' Sukanta Das', title: 'IIEST, Shibpur, India' },
      { name: ' Indrajit Banerjee', title: 'IIEST, Shibpur, India' },
      { name: 'Prasun Ghosal', title: 'IIEST, Shibpur, India' },
      { name: ' Tuhina Samanta', title: 'IIEST, Shibpur, India' },
      { name: ' Surajit Kumar Roy', title: 'IIEST, Shibpur, India' },
      { name: ' Ruchira Naskar', title: 'IIEST, Shibpur, India' },
      { name: ' Binanda Sengupta', title: 'IIEST, Shibpur, India' },
      { name: ' Basabdatta Palit', title: 'IIEST, Shibpur, India' },
      { name: 'Dipanjyoti Paul', title: 'IIEST, Shibpur, India' },
      { name: 'Kamalika Bhattacharjee' , title: 'IIEST, Shibpur, India' },
      { name: ' Chandan Giri', title: 'IIEST, Shibpur, India' },
      { name: ' Arindam Biswas', title: 'IIEST, Shibpur, India' },
      { name: ' Santi Prasad Maity', title: 'IIEST, Shibpur, India' },
      { name: ' Surajit Ghosh', title: 'IIEST, Shibpur, India' },
      { name: ' Nirnay Ghosh', title: 'IIEST, Shibpur, India' },
      { name: ' Malay Kule', title: 'IIEST, Shibpur, India' },
      { name: ' Samit Biswas', title: 'IIEST, Shibpur, India' },
    ]},
    { category: 'Finance Committee', members: [
      { name: ' Surajit Kumar Roy', title: 'IIEST, Shibpur, India' },
    ] },
    { category: 'Event Management Committee', members: [] },
    { category: 'Technical Program Committee', members: [
  { name: 'Akber Ali Khan', title: 'IIMT College of Engineering, Greater Noida, India' },
  { name: 'Aloizio Pereira da Silva', title: 'Commonwealth Cyber Initiative Virginia Tech, USA' },
  { name: 'Anil Kumar Singh', title: 'Motilal Nehru National Institute of Technology Allahabad, Prayagraj, India' },
  { name: 'Arindam Biswas', title: 'Kazi Nazrul University, India' },
  { name: 'Arup Kumar Pal', title: 'IIT Dhanbad, India' },
  { name: 'Badal Soni', title: 'NIT Shilchar, India' },
  { name: 'Chowdhury Mofizur Rahman', title: 'State University of Bangladesh, Bangladesh' },
  { name: 'Debashis De', title: 'MAKAUT, India' },
  { name: 'Dharavath Ramesh', title: 'IIT Dhanbad, India' },
  { name: 'Dhiren Patel', title: 'NIT Surat, India' },
  { name: 'Dushyant Kumar Singh', title: 'MNIT Alahabad, India' },
  { name: 'Jaspal Kaur Saini', title: 'IIIT Una, India' },
  { name: 'K. Himabindu', title: 'NIT Andhrapradesh, India' },
  { name: 'Mahendra Pratap Yadav', title: 'IIIT Pune, India' },
  { name: 'Mithlesh Arya', title: 'Swami Keshvanand Institute of Technology, Jaipur, India' },
  { name: 'Prashant Kumar', title: 'NIT Jalandhar, India' },
  { name: 'Rajendra Prasath', title: 'IIIT Chittoor, India' },
  { name: 'Satyaki Roy', title: 'University of Alabama in Huntsville, USA' },
  { name: 'Sonam Maurya', title: '' },
  { name: 'Soumya Sen', title: 'Calcutta University, India' },
  { name: 'Tso Raylin', title: 'National Chengchi University, Taiwan' },
  { name: 'Xiao-Zhi Gao', title: 'University of Eastern Finland, Finland' },
] },
  ];

  const nonEmpty = data.filter(g => g.members.length > 0);
  const empty = data.filter(g => g.members.length === 0);

  return (
    <section className="page-section">
      <div className="section-tag centered reveal">Team</div>
      <h1 className="section-title reveal">Conference Committee</h1>
      <div className="committee-sections">
        {nonEmpty.map((g, i) => (
          <div key={i} className="committee-block reveal">
            <div className="committee-category">{g.category}</div>
            <div className="committee-members-grid">
              {g.members.map((m, mi) => (
                <div key={mi} className="committee-member-card">
                  <div className="member-avatar">{m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                  <div>
                    <div className="member-name">{m.name}</div>
                    <div className="member-title">{m.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {empty.length > 0 && (
          <div className="committee-block reveal">
            <div className="committee-category tba-category">To Be Announced</div>
            <div className="tba-grid">
              {empty.map((g, i) => <div key={i} className="tba-badge">{g.category}</div>)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   AUTHOR GUIDELINES
───────────────────────────────────────────────────── */
const AuthorGuidelines = () => {
  const guidelines = [
    'Each paper must be original and unpublished work, not submitted for publication elsewhere. Authors are responsible for avoiding any copyright infringement issues. Papers should be written in good English.',
    'Submissions must be anonymous, without author name(s), affiliation(s), acknowledgments, or obvious references in LNNS Format (Word, Latex).',
    'The recommended font size is 11 points, and reasonable margins should be used.',
    'Authors are encouraged to follow the given guidelines when preparing their submissions. The papers must be in PDF format and should be submitted electronically through the CMT platform.',
    'All submitted papers that adhere to the submission guidelines will undergo evaluation. The evaluation criteria include originality, technical and/or research content/depth, correctness, relevance to the conference, contributions, and readability.',
    'Authors are expected to ensure that the similarity index of their submitted paper remains below the threshold of < 12% and < 2% from a single source.',
    'The authors of accepted papers will have an opportunity to make corrections based on the suggestions of the reviewers. They must submit the final camera-ready versions of their papers within the specified deadline.',
    'Kindly note that the permissible page length for manuscript submissions is limited to 12 pages. In the event of exceeding this limit, an additional charge of INR 600 per page or $15 per page will apply. The maximum page count with the surcharge is set at 15 pages.',
    'To explore the topics of interest in detail, please visit the About ICISS Page.',
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered reveal">Submission</div>
      <h1 className="section-title reveal">Author's Guidelines</h1>
      <div className="guidelines-list">
        {guidelines.map((text, i) => (
          <div key={i} className={`guideline-item reveal reveal-delay-${Math.min(i % 4, 4)}`}>
            <div className="guideline-num">{String(i + 1).padStart(2, '0')}</div>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="guidelines-downloads reveal">
        <a href="https://iciss2024.in/ICISS_LNNS_Word_Template.docx" className="download-btn">📄 Word Template (LNNS)</a>
        <a href="https://iciss2024.in/ICISS_LNNS_latex_Template.zip" className="download-btn">📦 LaTeX Template (LNNS)</a>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   CONTRIBUTION TRACKS PAGE
───────────────────────────────────────────────────── */
const ContributionTracksPage = () => {
  const tracks = [
    {
      id: '01',
      title: 'Intelligent Systems & Applications',
      icon: '🤖',
      color: 'blue',
      topics: [
        'Artificial Intelligence (AI) and Machine Learning (ML) Algorithms & Techniques',
        'Intelligent Data Analysis and Decision Support Systems',
        'Natural Language Processing and Understanding',
        'Computer Vision and Pattern Recognition',
        'Robotics and Autonomous Systems',
        'Internet of Things (IoT) and Intelligent Systems Integration',
        'Intelligent Surveillance and Monitoring Systems',
        'Security in Intelligent Transportation Systems',
        'Ethical and Legal Implications of Intelligent Systems',
        'Societal Impact of AI and Intelligent Systems',
      ],
    },
    {
      id: '02',
      title: 'Network & System Security',
      icon: '🛡️',
      color: 'gold',
      topics: [
        'Network and System Security',
        'Physical Layer Security',
        'Security in Cloud Computing, Big Data, and IoT Environments',
        'Malware Detection and Vulnerability Analysis',
        'Intrusion Detection and Prevention Systems',
        'Cryptography and Secure Communication Protocols',
        'Cyber Threat Intelligence and Incident Response',
        'Ethical Hacking and Penetration Testing',
        'Cyber Risk Management and Governance',
        'Blockchain Technology and Security Applications',
      ],
    },
    {
      id: '03',
      title: 'AI Security & Privacy',
      icon: '🔐',
      color: 'teal',
      topics: [
        'Security in Artificial Intelligence and ML Systems',
        'Adversarial Attacks and Defenses in AI',
        'Privacy-Aware Computing and Differential Privacy',
        'Federated Learning and Secure Distributed AI',
        'Explainable AI (XAI) for Security Applications',
        'AI-Driven Fraud Detection and Anomaly Detection',
        'Secure AI for Cyber Defense',
        'Generative AI Security and Safety',
        'Biometric Systems Security',
        'Human-Computer Interaction in Security Contexts',
      ],
    },
  ];

  const colorMap = {
    blue: { accent: '#1d6fe8', glow: 'rgba(29,111,232,0.15)', border: 'rgba(29,111,232,0.3)', tag: 'rgba(29,111,232,0.1)' },
    gold: { accent: '#f0c958', glow: 'rgba(201,168,76,0.15)', border: 'rgba(201,168,76,0.3)', tag: 'rgba(201,168,76,0.08)' },
    teal: { accent: '#2dd4bf', glow: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.3)', tag: 'rgba(45,212,191,0.07)' },
  };

  return (
    <section className="page-section">
      <div className="section-tag centered reveal">Call for Papers</div>
      <h1 className="section-title reveal">Contribution Tracks</h1>

      <p className="tracks-intro reveal">
        ICISS 2027 invites original, unpublished research across three core tracks. Authors may submit full papers, short papers, and industry/demo contributions. All accepted papers will be published in the Lecture Notes in Networks and Systems (LNNS) series by Springer.
      </p>

      <div className="tracks-grid">
        {tracks.map((track, i) => {
          const c = colorMap[track.color];
          return (
            <div
              key={i}
              className={`track-card reveal reveal-delay-${i + 1}`}
              style={{ '--track-accent': c.accent, '--track-glow': c.glow, '--track-border': c.border, '--track-tag': c.tag }}
            >
              <div className="track-header">
                <div className="track-icon">{track.icon}</div>
                <div className="track-id">{track.id}</div>
              </div>
              <h2 className="track-title">{track.title}</h2>
              <ul className="track-topics">
                {track.topics.map((topic, ti) => (
                  <li key={ti} className="track-topic">
                    <span className="track-dot" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="tracks-cta reveal">
        <div className="tracks-cta-inner">
          <div className="tracks-cta-icon">📢</div>
          <div className="tracks-cta-text">
            <h3>Ready to Submit?</h3>
            <p>Submissions must follow the LNNS format and be uploaded via the CMT portal. Maximum 12 pages (up to 15 with surcharge). See Author Guidelines for full details.</p>
          </div>
          <div className="tracks-cta-btns">
            <Link to="/guidelines" className="btn-primary">Author Guidelines</Link>
            <Link to="/submit-paper" className="btn-secondary">Submit Paper →</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   SUBMIT PAPER
───────────────────────────────────────────────────── */
const SubmitPaperPage = () => {
  const content = [
    'The authors are pleasingly invited to submit the full paper of their original, unpublished, research contribution which is not currently under review by another conference or journal. Only the accepted and registered papers will be allowed to present at the conference.',
    'Submissions for the conference must be made online using CMT Portal.',
    "Click on 'Submit Your Paper' button below to proceed with submission."
  ];

  return (
    <>
    <section className="page-section">
      <div className="section-tag centered reveal">Paper Submission</div>
      <h1 className="section-title reveal">Submit Your Paper</h1>
      <div className="submit-card reveal">
        {content.map((t, i) => <p key={i}>{t}</p>)}
        <a href="https://cmt3.research.microsoft.com/ICISS2027." target="_blank" rel="noreferrer"
          className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
          Submit Your Paper →
        </a>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#555' }}>
          The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
        </p>
      </div>
    </section>
    <ImportantDates />
    </>
  );
};

/* ─────────────────────────────────────────────────────
   REGISTRATION
───────────────────────────────────────────────────── */
const RegistrationPage = () => {
  const fees = [
    { category: 'Academia (Author)', indianEarly: '₹7,000', indianLate: '₹8,000', foreignEarly: '$200', foreignLate: '$250' },
    { category: 'Industry / R&D Organization (Author)', indianEarly: '₹8,000', indianLate: '₹9,000', foreignEarly: '$250', foreignLate: '$300' },
    { category: 'Attending Only (Academia)', indianEarly: '₹3,000', indianLate: '₹3,000', foreignEarly: '$120', foreignLate: '$120' },
    { category: 'Industry Attendee', indianEarly: '₹5,000', indianLate: '₹5,000', foreignEarly: '$150', foreignLate: '$150' },
    { category: 'Accompanying Person', indianEarly: '₹2,000', indianLate: '₹2,000', foreignEarly: '$100', foreignLate: '$100' },
  ];

  const bank = [
    ['Account Name', 'CONTINUING EDUCATION CENTRE IIESTS'],
    ['Bank Name', 'PUNJAB NATIONAL BANK'],
    ['Branch Name', 'IIESTS BRANCH'],
    ['Account Number', '1532010011063'],
    ['IFSC', 'PUNB0153220'],
    ['MICR Code', '700024356'],
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered reveal">Register</div>
      <h1 className="section-title reveal">Conference Registration Fee</h1>

      <div className="reg-table-wrap reveal">
        <table className="reg-table">
          <thead>
            <tr>
              <th rowSpan="2" className="reg-th-cat">Category</th>
              <th colSpan="2" className="reg-th-group">Indian Participant</th>
              <th colSpan="2" className="reg-th-group">Foreign Participant</th>
            </tr>
            <tr>
              <th className="reg-th-sub">On or before Nov 10, 2027</th>
              <th className="reg-th-sub">After Nov 10, 2027</th>
              <th className="reg-th-sub">On or before Nov 10, 2027</th>
              <th className="reg-th-sub">After Nov 10, 2027</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((r, i) => (
              <tr key={i} className="reg-row">
                <td className="reg-td-cat">{r.category}<br /><span className="reg-unit">(per paper/person)</span></td>
                <td className="reg-td">{r.indianEarly}</td>
                <td className="reg-td">{r.indianLate}</td>
                <td className="reg-td">{r.foreignEarly}</td>
                <td className="reg-td">{r.foreignLate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reg-notice reveal">
        <div className="reg-notice-icon">⚠️</div>
        <div>
          <p>Kindly note that the permissible page length is limited to 12 pages according to the available template. In the event of exceeding this limit, an additional charge of <strong>INR 600 per page</strong> or <strong>$15 per page</strong> will apply.</p>
          <p style={{ marginTop: '0.5rem' }}>Presentation Certificate will be provided to only one presenter per paper.</p>
        </div>
      </div>

      <div className="reg-cta reveal">
        <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 3rem' }}>Register Now</button>
      </div>

      <div className="bank-table-wrap reveal">
        <div className="bank-title">Bank Transfer Details</div>
        <table className="bank-table">
          <tbody>
            {bank.map(([label, value], i) => (
              <tr key={i}><td className="bank-label">{label}</td><td className="bank-value">{value}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="reg-footnote reveal">
        Last date of author's registration is 10th Nov 2027. After that, an additional fee of ₹1,000 for Indian participants and $50 for foreign participants must be paid.
      </p>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   VENUE PAGE
───────────────────────────────────────────────────── */
const VenuePage = () => {
  const reach = [
    { title: 'Nearest Airport', icon: '✈️', points: [{ name: 'Netaji Subhash Chandra Bose International Airport', detail: '22 km' }] },
    { title: 'Nearest Railway Stations', icon: '🚆', points: [{ name: 'Howrah Railway Station', detail: '5 km' }, { name: 'Shalimar Railway Station', detail: '2 km' }, { name: 'Sealdah Railway Station', detail: '12 km' }] },
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered reveal">Location</div>
      <h1 className="section-title reveal">Venue</h1>

      <div className="venue-map-wrap reveal">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.63216834163!2d88.30452391081518!3d22.5554170335032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279c916f27217%3A0x643666d987d3a01!2sIIEST%20Shibpur!5e0!3m2!1sen!2sin!4v1711812000000"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="IIEST Shibpur Map"
        />
      </div>

      <div className="venue-address-card reveal" style={{ marginBottom: '3rem' }}>
        <span className="venue-pin">📌</span>
        <div>
          <div className="venue-address-label">Address</div>
          <div className="venue-address-text">
            Indian Institute of Engineering Science and Technology,<br />
            Botanical Garden Area, Howrah, West Bengal 711103, India
          </div>
        </div>
      </div>

      <div className="section-tag centered reveal" style={{ marginTop: '3rem' }}>How to Reach</div>
      <h2 className="section-title reveal">Getting Here</h2>

      <div className="reach-grid">
        {reach.map((s, i) => (
          <div key={i} className={`reach-card reveal reveal-delay-${i + 1}`}>
            <div className="reach-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            {s.points.map((p, pi) => (
              <div key={pi} className="reach-point">
                <span className="reach-point-name">{p.name}</span>
                <span className="reach-point-dist">{p.detail}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   TOURIST DESTINATIONS
───────────────────────────────────────────────────── */
const TouristDestinationsPage = () => {
  const destinations = [
    { name: 'Victoria Memorial', description: 'The Victoria Memorial is a large marble building in Kolkata, West Bengal, India. It is dedicated to the memory of Queen Victoria and is now a museum and tourist destination. It is known for its stunning architecture and beautiful gardens.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Victoria-Memorial-Kolkata-India.jpg' },
    { name: 'Kalighat', description: 'Kalighat is a famous Hindu temple dedicated to the goddess Kali. It is one of the 51 Shakti Peethas and holds great religious significance. Devotees from all over the world visit this temple to seek blessings.', image: 'https://www.trawell.in/admin/images/upload/555418767Kolkata_Kalighat_Temple_Main.jpg' },
    { name: 'Indian Museum', description: 'The Indian Museum is the largest and oldest museum in India. It has a vast collection of artifacts, including sculptures, paintings, and archaeological finds. It is a treasure trove of Indian history and culture.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg' },
    { name: 'Dakshineswar Kali Temple', description: 'Dakshineswar Kali Temple is a renowned Hindu temple located on the eastern bank of the Hooghly River. It is dedicated to Goddess Kali and is known for its beautiful architecture and spiritual ambiance.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG' },
    { name: "St. Paul's Cathedral", description: "St. Paul's Cathedral is a magnificent Anglican cathedral in Kolkata. It is one of the iconic landmarks of the city and showcases Gothic architecture. The cathedral is known for its serene atmosphere and beautiful stained glass windows.", image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/St_Paul%27s_Cathedral.jpg' },
    { name: 'Tipu Sultan Mosque', description: 'Tipu Sultan Mosque is a historic mosque located in Kolkata. It was built in memory of Tipu Sultan, the ruler of Mysore. The mosque is known for its intricate architecture and peaceful ambiance.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Tipu_Sultan_Mosque_Dharmatala_at_Night.jpg' },
    { name: 'Belur Math', description: 'Belur Math is a spiritual retreat and headquarters of the Ramakrishna Math and Ramakrishna Mission. It is located on the banks of the Hooghly River and is known for its serene environment and architectural beauty.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Belur_Math%2C_Howrah.jpg' },
    { name: 'Jorasanko Thakur Bari', description: 'Jorasanko Thakur Bari is the ancestral home of the Tagore family, including the famous poet Rabindranath Tagore. It is now a museum showcasing the life and works of Rabindranath Tagore. The place holds immense cultural and literary significance.', image: 'https://www.backpacknxplore.com/wp-content/uploads/2019/07/jorasanko-thakur-bari-min_thumb.jpg' },
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered reveal">Explore Kolkata</div>
      <h1 className="section-title reveal">Tourist Destinations</h1>
      <div className="tourist-grid">
        {destinations.map((place, i) => (
          <div key={i} className="tourist-card reveal">
            <div className="tourist-img-wrap">
              <img src={place.image} alt={place.name} />
              <div className="tourist-num">{String(i + 1).padStart(2, '0')}</div>
            </div>
            <div className="tourist-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────── */
const Footer = () => (
  <>
    <div className="footer-cta-banner">
      <p>Have questions about ICISS 2027?</p>
      <Link to="/contact" className="btn-primary">Contact Us →</Link>
    </div>

    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="./ICISS2027logo.png" alt="ICISS 2027" className="footer-logo" />
          <p className="footer-tagline">International Conference on Intelligent Systems and Security</p>
          <p className="footer-location">📍 IIEST Shibpur, Howrah, West Bengal, India</p>
        </div>

        <div>
          <div className="footer-nav-title">Navigation</div>
          {[
            { label: 'Home', to: '/' },
            { label: 'Committee', to: '/committee' },
            { label: 'Speakers', to: '/speakers' },
            { label: 'Schedule', href: '/schedule' },
            { label: 'Registration', to: '/registration' },
          ].map(({ label, to, href }) =>
            href ? <a key={label} href={href} className="footer-link">{label}</a>
                 : <Link key={label} to={to} className="footer-link">{label}</Link>
          )}
        </div>

        <div>
          <div className="footer-nav-title">Submission</div>
          {[
            { label: 'Author Guidelines', to: '/guidelines' },
            { label: 'Submit Paper', to: '/submit-paper' },
            { label: 'About ICISS', href: '/#about-iciss' },
            { label: 'About IIEST', href: '/#about-iiest' },
            { label: 'Contact Us', to: '/contact' },
          ].map(({ label, to, href }) =>
            href ? <a key={label} href={href} className="footer-link">{label}</a>
                 : <Link key={label} to={to} className="footer-link">{label}</Link>
          )}
        </div>

        <div>
          <div className="footer-nav-title">Contact</div>
          <a href="mailto:conference.iciss@gmail.com" className="footer-link">conference.iciss@gmail.com</a>
          <a href="mailto:shyamalenduk@it.iiests.ac.in" className="footer-link">shyamalenduk@it.iiests.ac.in</a>
          <span className="footer-link" style={{ cursor: 'default' }}>+91 70031 98150</span>
        </div>
      </div>

      <div className="footer-bottom">
        © 2027 ICISS — IIEST Shibpur. All rights reserved.
      </div>
    </footer>
  </>
);

/* ─────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────── */
export default function App() {
  return (
    <Router>
      <ScrollRevealWrapper>
        <div className="app-root">
          <ParticleCanvas />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <ConferenceDetails />
                  <VenueSection />
                  <AddressSection />
                  <AboutIIESTSection />
                  <AboutICISS />
                  <ImportantDates /> 
                </>
              } />
              <Route path="/committee"           element={<CommitteePage />} />
              <Route path="/contact"             element={<ContactPage />} />
              <Route path="/speakers"            element={<SpeakersPage />} />
              <Route path="/tracks"              element={<ContributionTracksPage />} />
              <Route path="/guidelines"          element={<AuthorGuidelines />} />
              <Route path="/submit-paper"        element={<SubmitPaperPage />} />
              <Route path="/registration"        element={<RegistrationPage />} />
              <Route path="/venue"               element={<VenuePage />} />
              <Route path="/tourist-destinations" element={<TouristDestinationsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
          <RouteHandler />
      </ScrollRevealWrapper>
    </Router>
  );
}
