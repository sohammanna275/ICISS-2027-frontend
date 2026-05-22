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
          International Conference on<br />
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
              All Accepted and presented papers will be published by{' '}
              <strong>Springer</strong> in a{' '}
              <strong>SCOPUS and Web of Science indexed book series</strong>{' '}
              <em>(Proposal Submitted)</em>
            </p>
            <div className="pub-springer-logo-wrap">
              <img
                src="./springer_logo.png"
                alt="Springer"
                className="pub-springer-logo"
                onError={e => {
                  /* fallback SVG inline if image fails */
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Inline Springer text fallback */}
              <div className="springer-text-fallback" style={{ display: 'none' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="4" fill="#1B3A6B"/>
                  <path d="M8 16C8 11.6 11.6 8 16 8C18.8 8 21.3 9.4 22.8 11.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M24 16C24 20.4 20.4 24 16 24C13.2 24 10.7 22.6 9.2 20.5" stroke="#E85D26" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span style={{ color: '#1B3A6B', fontWeight: 700, fontSize: '1.2rem', marginLeft: '6px' }}>Springer</span>
              </div>
            </div>
            <div className="pub-index-badges">
              <span className="pub-badge scopus">SCOPUS Indexed</span>
              <span className="pub-badge wos">Web of Science</span>
            </div>
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

                {/* Important dates for ICISS 2026 */}
                <div className="earlier-conf-dates">
                  <div className="conf-date-row"><span className="conf-date-key">Paper Submission Deadline</span><span className="conf-date-val">September 30, 2026</span></div>
                  <div className="conf-date-row"><span className="conf-date-key">Notification of Acceptance</span><span className="conf-date-val">October 20, 2026</span></div>
                  <div className="conf-date-row"><span className="conf-date-key">Camera Ready Submission</span><span className="conf-date-val">November 3, 2026</span></div>
                  <div className="conf-date-row"><span className="conf-date-key">Author Registration Deadline</span><span className="conf-date-val">November 15, 2026</span></div>
                  <div className="conf-date-row highlight"><span className="conf-date-key">Conference Date</span><span className="conf-date-val">January 14–16, 2027</span></div>
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
    { category: 'Patron', members: [{ name: 'Prof. V M S R Murthy', title: 'Director, IIEST, Shibpur, India' }] },
    { category: 'General Chairs', members: [{ name: 'Santi Prasad Maity', title: 'IIEST, Shibpur, India' }, { name: 'Arindam Biswas', title: 'IIEST, Shibpur, India' }] },
    { category: 'General Co-Chairs', members: [] },
    { category: 'Organizing Chair', members: [{ name: 'Shyamalendu Kandar', title: 'IIEST, Shibpur, India' }] },
    { category: 'Organizing Co-Chairs', members: [] },
    { category: 'Program Chairs', members: [{name: 'Indrajit Ray', title: 'Colorado State University, USA'}, { name: 'Debasis Giri', title: 'MAKAUT, India' }, { name: 'Shyamalendu Kandar', title: 'IIEST, Shibpur, India' }] },
    { category: 'International Advisory Committee', members: [] },
    { category: 'Website Committee', members: [{ name: 'Indrajit Banerjee', title: 'IIEST, Shibpur, India' }, { name: 'Soham Manna', title: 'IIEST, Shibpur, India' }, { name: 'Subarno Mandal', title: 'IIEST, Shibpur, India' }] },
    { category: 'Organizing Committee', members: [
      { name: 'Dr. Sukanta Das', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Chandan Giri', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Indrajit Banerjee', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Tuhina Samanta', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Surajit Kumar Roy', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Ruchira Naskar', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Binanda Sengupta', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Basabdatta Palit', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Surajit Ghosh', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Nirnay Ghosh', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Malay Kule', title: 'IIEST, Shibpur, India' },
      { name: 'Dr. Samit Biswas', title: 'IIEST, Shibpur, India' },
    ]},
    { category: 'Finance Committee', members: [
      { name: 'Dr. Surajit Kumar Roy', title: 'IIEST, Shibpur, India' },
    ] },
    { category: 'Event Management Committee', members: [] },
    { category: 'Technical Program Committee', members: [] },
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
