import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

/*  NAVBAR  */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const DropdownItem = ({ href, to, children }) =>
    href ? (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer" className="dropdown-item">{children}</a>
    ) : (
      <Link to={to} className="dropdown-item">{children}</Link>
    );

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo-wrap">
          <img src="./ICISS2027logo.png" alt="ICISS 2027 Logo" className="navbar-logo" />
        </Link>

        {/* Desktop nav */}
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>

          <div className="nav-dropdown-wrap">
            <button className="nav-link nav-btn">About <span className="chevron">›</span></button>
            <div className="dropdown-panel">
              <DropdownItem href="/#about-iiest">About IIEST</DropdownItem>
              <DropdownItem href="https://www.iiests.ac.in/IIEST/AcaUnitDetails/IT">
                Information Technology Department
              </DropdownItem>
              <DropdownItem href="/#about-iciss">About ICISS</DropdownItem>
            </div>
          </div>

          <Link to="/committee" className="nav-link">Committee</Link>
          <Link to="/speakers" className="nav-link">Speakers</Link>

          <div className="nav-dropdown-wrap">
            <button className="nav-link nav-btn">Call for Papers <span className="chevron">›</span></button>
            <div className="dropdown-panel">
              <DropdownItem to="/">Contribution Tracks</DropdownItem>
              <DropdownItem to="/guidelines">Author Guidelines</DropdownItem>
              <DropdownItem to="/submit-paper">Submit Your Paper</DropdownItem>
            </div>
          </div>

          <a href="/schedule" className="nav-link">Schedule</a>
          <Link to="/registration" className="nav-link">Registration</Link>

          <div className="nav-dropdown-wrap">
            <button className="nav-link nav-btn">Venue <span className="chevron">›</span></button>
            <div className="dropdown-panel">
              <DropdownItem to="#">Visa Information</DropdownItem>
              <DropdownItem to="/venue">Venue</DropdownItem>
              <DropdownItem to="/tourist-destinations">Tourist Destinations</DropdownItem>
            </div>
          </div>

          <Link to="/contact" className="nav-link">Contact Us</Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu">
          <span className={`ham-line ${mobileOpen ? 'open-1' : ''}`}></span>
          <span className={`ham-line ${mobileOpen ? 'open-2' : ''}`}></span>
          <span className={`ham-line ${mobileOpen ? 'open-3' : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {[
            { label: 'Home', to: '/' },
            { label: 'About IIEST', href: '/#about-iiest' },
            { label: 'IT Department', href: 'https://www.iiests.ac.in/IIEST/AcaUnitDetails/IT' },
            { label: 'About ICISS', href: '/#about-iciss' },
            { label: 'Committee', to: '/committee' },
            { label: 'Speakers', to: '/speakers' },
            { label: 'Author Guidelines', to: '/guidelines' },
            { label: 'Submit Paper', to: '/submit-paper' },
            { label: 'Schedule', href: '/schedule' },
            { label: 'Registration', to: '/registration' },
            { label: 'Venue', to: '/venue' },
            { label: 'Tourist Destinations', to: '/tourist-destinations' },
            { label: 'Contact Us', to: '/contact' },
          ].map(({ label, to, href }) =>
            href ? (
              <a key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer" className="mobile-link" onClick={() => setMobileOpen(false)}>
                {label}
              </a>
            ) : (
              <Link key={label} to={to} className="mobile-link" onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

/*  HERO  */
const Hero = () => (
  <section className="hero-section">
    <div className="hero-bg-grid" />
    <div className="hero-glow hero-glow-1" />
    <div className="hero-glow hero-glow-2" />

    <div className="hero-inner">
      {/* Gallery trio */}
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

      {/* Title block */}
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
        <div className="hero-cta-row">
          <Link to="/submit-paper" className="btn-primary">Submit Paper</Link>
          <Link to="/registration" className="btn-secondary">Register Now</Link>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="scroll-indicator">
      <div className="scroll-dot" />
    </div>
  </section>
);

/*  CONFERENCE DATE BANNER  */
const ConferenceDetails = () => (
  <section className="conf-date-section">
    <div className="conf-date-inner">
      <div className="conf-date-item">
        <span className="conf-date-icon">📅</span>
        <div>
          <div className="conf-date-label">Conference Dates</div>
          <div className="conf-date-value">14<sup>th</sup> – 16<sup>th</sup> January 2027</div>
        </div>
      </div>
      <div className="conf-date-divider" />
      <div className="conf-date-item">
        <span className="conf-date-icon">📍</span>
        <div>
          <div className="conf-date-label">Venue</div>
          <div className="conf-date-value">IIEST Shibpur, Howrah, India</div>
        </div>
      </div>
      <div className="conf-date-divider" />
      <div className="conf-date-item">
        <span className="conf-date-icon">📄</span>
        <div>
          <div className="conf-date-label">Paper Submission Deadline</div>
          <div className="conf-date-value">TBA</div>
        </div>
      </div>
    </div>
  </section>
);

/*  VENUE MAP  */
const VenueSection = () => (
  <section className="map-section">
    <div className="section-tag">Find Us</div>
    <h2 className="section-title">Venue</h2>
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.634645281488!2d88.3045!3d22.5552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzE4LjciTiA4OMKwMTgnMTYuMiJF!5e0!3m2!1sen!2sin!4v1634567890123"
        width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
        title="IIEST Shibpur Map"
      />
    </div>
  </section>
);

/*  ADDRESS  */
const AddressSection = () => (
  <section className="address-section">
    <div className="address-card">
      <div className="address-pin">📌</div>
      <h3>Address</h3>
      <p>Indian Institute of Engineering Science and Technology,<br />
        Botanical Garden Area, Howrah, West Bengal 711103, India
      </p>
    </div>
  </section>
);

/*  ABOUT IIEST  */
const AboutIIESTSection = () => (
  <section id="about-iiest" className="about-section scroll-mt-24">
    <div className="about-inner">
      <div className="about-img-wrap">
        <img
          src="https://iciss2024.in/static/media/clg1.2c7df5d561629cc3f013.png"
          alt="IIEST Shibpur Campus Aerial View"
        />
        <div className="about-img-badge">Est. 1856</div>
      </div>
      <div className="about-text">
        <div className="section-tag">About</div>
        <h2 className="section-title left-align">About IIEST</h2>
        <p>IIEST Shibpur, the Indian Institute of Engineering Science and Technology Shibpur, is a well-respected technical college located in Shibpur, West Bengal, India.</p>
        <p>Established in 1856, it holds a notable place among the oldest engineering colleges in the country. IIEST Shibpur is known for its commitment to promoting research and innovation.</p>
        <p>The college provides ample opportunities for students and faculty to engage in research activities across various disciplines. With its dedicated research facilities and experienced faculty members, IIEST Shibpur offers a conducive environment for students to explore new ideas and contribute to the advancement of knowledge.</p>
        <a
          href="https://www.iiests.ac.in/IIEST/About#:~:text=About%20IIEST%2C%20Shibpur,-IIEST%2C%20Shibpur%20(Erstwhile&text=The%20Institute%20has%20a%20rich,16%20departments%20and%208%20schools."
          target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
          Know More →
        </a>
      </div>
    </div>
  </section>
);

/*  ABOUT ICISS  */
const AboutICISS = () => (
  <section id="about-iciss" className="about-iciss-section scroll-mt-24">
    <div className="about-iciss-inner">
      <div className="section-tag centered">About the Conference</div>
      <h2 className="section-title centered">About International Conference on<br />Intelligent Systems and Security</h2>

      <p className="about-iciss-lead">
        The International Conference on Intelligent Systems and Security is set to take place in January 2027, and will bring together industry experts, practitioners, and researchers in the field. Attendees will have the opportunity to network and collaborate with other professionals in the field. This conference is highly recommended for those looking to stay up-to-date with the latest developments in intelligent systems and security, and to exchange ideas and collaborate on future projects.
      </p>

      <div className="about-iciss-cards">
        <div className="iciss-card">
          <div className="iciss-card-icon">🎯</div>
          <h3>Aim</h3>
          <p>The aim of ICISS 2027 is to bring together researchers, practitioners, and industry experts from around the world to foster the exchange of ideas, advances, and innovations in the field of intelligent systems and security. By promoting collaboration and knowledge sharing, ICISS aims to drive the development and adoption of intelligent systems and security technologies.</p>
        </div>
        <div className="iciss-card">
          <div className="iciss-card-icon">🔭</div>
          <h3>Scope</h3>
          <p>ICISS welcomes contributions in the form of research papers, case studies, and industry presentations, covering a wide range of topics related to intelligent systems and security. The conference encourages multidisciplinary approaches and invites submissions that explore the union and intersection of intelligent systems and security.</p>
        </div>
      </div>
    </div>
  </section>
);

/*  CONTACT PAGE  */
const ContactPage = () => (
  <section className="page-section">
    <div className="section-tag centered">Reach Out</div>
    <h1 className="section-title centered">Contact Information</h1>
    <div className="contact-grid">
      {[
        { title: "General Contact", email: "conference.iciss@gmail.com" },
        { title: "Shyamlendu Kandar", email: "shyamalenduk@it.iiests.ac.in", phone: "+91 70031 98150" }
      ].map((contact, idx) => (
        <div key={idx} className="contact-card">
          <div className="contact-card-icon">✉️</div>
          <h3>{contact.title}</h3>
          <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
          {contact.phone && <div className="contact-phone">📞 {contact.phone}</div>}
        </div>
      ))}
    </div>
  </section>
);

/*  SPEAKERS PAGE  */
const SpeakersPage = () => {
  const speakers = [
    {
      name: "Professor Ajoy Kumar Ray",
      title: "Indian Institute of Technology Kharagpur, India",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Ajoy_Kumar_Ray_-_Kolkata_2015-11-17_5154.JPG/500px-Ajoy_Kumar_Ray_-_Kolkata_2015-11-17_5154.JPG"
    }
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered">Keynotes</div>
      <h1 className="section-title centered">Our Speakers</h1>
      <div className="speakers-grid">
        {speakers.map((s, idx) => (
          <div key={idx} className="speaker-card">
            <div className="speaker-img-wrap">
              <img src={s.image} alt={s.name} />
            </div>
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

/*  COMMITTEE PAGE  */
const CommitteePage = () => {
  const committeeData = [
    {
      category: "Chief Patron",
      members: [{ name: "Prof. V M S R Murthy", title: "Director, IIEST, Shibpur, India" }]
    },
    { category: "Patron", members: [] },
    {
      category: "General Chairs",
      members: [
        { name: "Santi Prasad Maity", title: "IIEST, Shibpur, India" },
        { name: "Arindam Biswas", title: "IIEST, Shibpur, India" },
      ]
    },
    { category: "General Co-Chairs", members: [] },
    {
      category: "Organizing Chair",
      members: [{ name: "Shyamalendu Kandar", title: "IIEST, Shibpur, India" }]
    },
    { category: "Organizing Co-Chairs", members: [] },
    {
      category: "Program Chairs",
      members: [
        { name: "Debasis Giri", title: "IIEST, Shibpur, India" },
        { name: "Shyamalendu Kandar", title: "IIEST, Shibpur, India" }
      ]
    },
    { category: "International Advisory Committee", members: [] },
    {
      category: "Website Committee",
      members: [
        { name: "Indrajit Banerjee", title: "IIEST, Shibpur, India" },
        { name: "Soham Manna", title: "IIEST, Shibpur, India" },
        { name: "Subarno Mandal", title: "IIEST, Shibpur, India" }
      ]
    },
    {
      category: "Organizing Committee",
      members: [
        { name: "Tuhina Samanta", title: "IIEST, Shibpur, India" },
        { name: "Hafizur Rahman", title: "IIEST, Shibpur, India" },
        { name: "Sukanta Das", title: "IIEST, Shibpur, India" },
        { name: "Prasun Ghosal", title: "IIEST, Shibpur, India" },
        { name: "Surajit Kumar Roy", title: "IIEST, Shibpur, India" },
        { name: "Indrajit Banerjee", title: "IIEST, Shibpur, India" },
        { name: "Binanda Sengupta", title: "IIEST, Shibpur, India" },
        { name: "Chandan Giri", title: "IIEST, Shibpur, India" },
        { name: "Dipanjyoti Paul", title: "IIEST, Shibpur, India" },
        { name: "Basabdatta Palit", title: "IIEST, Shibpur, India" },
      ]
    },
    { category: "Event Management Committee", members: [] },
    { category: "Technical Program Committee", members: [] },
  ];

  const nonEmpty = committeeData.filter(g => g.members.length > 0);
  const empty = committeeData.filter(g => g.members.length === 0);

  return (
    <section className="page-section">
      <div className="section-tag centered">Team</div>
      <h1 className="section-title centered">Conference Committee</h1>

      <div className="committee-sections">
        {nonEmpty.map((group, idx) => (
          <div key={idx} className="committee-block">
            <div className="committee-category">{group.category}</div>
            <div className="committee-members-grid">
              {group.members.map((m, mIdx) => (
                <div key={mIdx} className="committee-member-card">
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

        {/* TBA sections */}
        {empty.length > 0 && (
          <div className="committee-block">
            <div className="committee-category tba-category">To Be Announced</div>
            <div className="tba-grid">
              {empty.map((group, idx) => (
                <div key={idx} className="tba-badge">{group.category}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/*  AUTHOR GUIDELINES  */
const AuthorGuidelines = () => {
  const guidelines = [
    "Each paper must be original and unpublished work, not submitted for publication elsewhere. Authors are responsible for avoiding any copyright infringement issues. Papers should be written in good English.",
    "Submissions must be anonymous, without author name(s), affiliation(s), acknowledgments, or obvious references in LNNS Format (Word, Latex).",
    "The recommended font size is 11 points, and reasonable margins should be used.",
    "Authors are encouraged to follow the given guidelines when preparing their submissions. The papers must be in PDF format and should be submitted electronically through the CMT platform.",
    "All submitted papers that adhere to the submission guidelines will undergo evaluation. The evaluation criteria include originality, technical and/or research content/depth, correctness, relevance to the conference, contributions, and readability.",
    "Authors are expected to ensure that the similarity index of their submitted paper remains below the threshold of < 12% and < 2% from a single source.",
    "The authors of accepted papers will have an opportunity to make corrections based on the suggestions of the reviewers. They must submit the final camera-ready versions of their papers within the specified deadline.",
    "Kindly note that the permissible page length for manuscript submissions is limited to 12 pages. In the event of exceeding this limit, an additional charge of INR 600 per page or $15 per page will apply. The maximum page count with the surcharge is set at 15 pages.",
    "To explore the topics of interest in detail, please visit the About ICISS Page.",
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered">Submission</div>
      <h1 className="section-title centered">Author's Guidelines</h1>
      <div className="guidelines-list">
        {guidelines.map((text, i) => (
          <div key={i} className="guideline-item">
            <div className="guideline-num">{String(i + 1).padStart(2, '0')}</div>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="guidelines-downloads">
        <a href="https://iciss2024.in/ICISS_LNNS_Word_Template.docx" className="download-btn">
          <span>📄</span> Word Template (LNNS)
        </a>
        <a href="https://iciss2024.in/ICISS_LNNS_latex_Template.zip" className="download-btn">
          <span>📦</span> LaTeX Template (LNNS)
        </a>
      </div>
    </section>
  );
};

/*  SUBMIT PAPER  */
const SubmitPaperPage = () => {
  const content = [
    "The authors are pleasingly invited to submit the full paper of their original, unpublished, research contribution which is not currently under review by another conference or journal. Only the accepted and registered papers will be allowed to present at the conference.",
    "Submissions for the conference must be made online using CMT Portal.",
    "Click on 'Submit Your Paper' button below to proceed with submission."
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered">Paper Submission</div>
      <h1 className="section-title centered">Submit Your Paper</h1>
      <div className="submit-card">
        {content.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        <a
          href="https://cmt3.research.microsoft.com/"
          target="_blank" rel="noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', marginTop: '2rem' }}>
          Submit Your Paper →
        </a>
      </div>
    </section>
  );
};

/*  REGISTRATION  */
const RegistrationPage = () => {
  const fees = [
    { category: "Academia (Author)", indianEarly: "₹7,000", indianLate: "₹8,000", foreignEarly: "$200", foreignLate: "$250" },
    { category: "Industry / R&D Organization (Author)", indianEarly: "₹8,000", indianLate: "₹9,000", foreignEarly: "$250", foreignLate: "$300" },
    { category: "Attending Only (Academia)", indianEarly: "₹3,000", indianLate: "₹3,000", foreignEarly: "$120", foreignLate: "$120" },
    { category: "Industry Attendee", indianEarly: "₹5,000", indianLate: "₹5,000", foreignEarly: "$150", foreignLate: "$150" },
    { category: "Accompanying Person", indianEarly: "₹2,000", indianLate: "₹2,000", foreignEarly: "$100", foreignLate: "$100" },
  ];

  const bankDetails = [
    ["Account Name", "CONTINUING EDUCATION CENTRE IIESTS"],
    ["Bank Name", "PUNJAB NATIONAL BANK"],
    ["Branch Name", "IIESTS BRANCH"],
    ["Account Number", "1532010011063"],
    ["IFSC", "PUNB0153220"],
    ["MICR Code", "700024356"]
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered">Register</div>
      <h1 className="section-title centered">Conference Registration Fee</h1>

      {/* Fee Table */}
      <div className="reg-table-wrap">
        <table className="reg-table">
          <thead>
            <tr>
              <th rowSpan="2" className="reg-th-cat">Category</th>
              <th colSpan="2" className="reg-th-group">Indian Participant</th>
              <th colSpan="2" className="reg-th-group">Foreign Participant</th>
            </tr>
            <tr>
              <th className="reg-th-sub">On or before<br />Nov 10, 2027</th>
              <th className="reg-th-sub">After<br />Nov 10, 2027</th>
              <th className="reg-th-sub">On or before<br />Nov 10, 2027</th>
              <th className="reg-th-sub">After<br />Nov 10, 2027</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((row, i) => (
              <tr key={i} className="reg-row">
                <td className="reg-td-cat">{row.category}<br /><span className="reg-unit">(per paper/person)</span></td>
                <td className="reg-td">{row.indianEarly}</td>
                <td className="reg-td">{row.indianLate}</td>
                <td className="reg-td">{row.foreignEarly}</td>
                <td className="reg-td">{row.foreignLate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notice */}
      <div className="reg-notice">
        <div className="reg-notice-icon">⚠️</div>
        <div>
          <p>Kindly note that the permissible page length is limited to 12 pages according to the available template. In the event of exceeding this limit, an additional charge of <strong>INR 600 per page</strong> or <strong>$15 per page</strong> will apply.</p>
          <p style={{ marginTop: '0.5rem' }}>Presentation Certificate will be provided to only one presenter per paper.</p>
        </div>
      </div>

      {/* Register CTA */}
      <div className="reg-cta">
        <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>Register Now</button>
      </div>

      {/* Bank Details */}
      <div className="bank-table-wrap">
        <h3 className="bank-title">Bank Transfer Details</h3>
        <table className="bank-table">
          <tbody>
            {bankDetails.map(([label, value], i) => (
              <tr key={i}>
                <td className="bank-label">{label}</td>
                <td className="bank-value">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="reg-footnote">
        Last date of author's registration is 10th Nov 2027. After that, an additional fee of ₹1,000 for Indian participants and $50 for foreign participants must be paid.
      </p>
    </section>
  );
};

/*  VENUE PAGE  */
const VenuePage = () => {
  const reachData = [
    {
      title: "Nearest Airport",
      icon: "✈️",
      points: [{ name: "Netaji Subhash Chandra Bose International Airport", detail: "22 km" }]
    },
    {
      title: "Nearest Railway Stations",
      icon: "🚆",
      points: [
        { name: "Howrah Railway Station", detail: "5 km" },
        { name: "Shalimar Railway Station", detail: "2 km" },
        { name: "Sealdah Railway Station", detail: "12 km" }
      ]
    }
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered">Location</div>
      <h1 className="section-title centered">Venue</h1>

      <div className="venue-map-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.63216834163!2d88.30452391081518!3d22.5554170335032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279c916f27217%3A0x643666d987d3a01!2sIIEST%20Shibpur!5e0!3m2!1sen!2sin!4v1711812000000"
          width="100%" height="100%" style={{ border: 0 }}
          allowFullScreen="" loading="lazy" title="IIEST Shibpur Map"
        />
      </div>

      <div className="venue-address-card">
        <span className="venue-pin">📌</span>
        <div>
          <div className="venue-address-label">Address</div>
          <div className="venue-address-text">
            Indian Institute of Engineering Science and Technology,<br />
            Botanical Garden Area, Howrah, West Bengal 711103, India
          </div>
        </div>
      </div>

      <div className="section-tag centered" style={{ marginTop: '3rem' }}>How to Reach</div>
      <h2 className="section-title centered">Getting Here</h2>

      <div className="reach-grid">
        {reachData.map((section, idx) => (
          <div key={idx} className="reach-card">
            <div className="reach-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            {section.points.map((p, pIdx) => (
              <div key={pIdx} className="reach-point">
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

/*  TOURIST DESTINATIONS  */
const TouristDestinationsPage = () => {
  const destinations = [
    { name: "Victoria Memorial", description: "The Victoria Memorial is a large marble building in Kolkata, West Bengal, India. It is dedicated to the memory of Queen Victoria and is now a museum and tourist destination. It is known for its stunning architecture and beautiful gardens.", image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Victoria-Memorial-Kolkata-India.jpg" },
    { name: "Kalighat", description: "Kalighat is a famous Hindu temple dedicated to the goddess Kali. It is one of the 51 Shakti Peethas and holds great religious significance. Devotees from all over the world visit this temple to seek blessings.", image: "https://www.trawell.in/admin/images/upload/555418767Kolkata_Kalighat_Temple_Main.jpg" },
    { name: "Indian Museum", description: "The Indian Museum is the largest and oldest museum in India. It has a vast collection of artifacts, including sculptures, paintings, and archaeological finds. It is a treasure trove of Indian history and culture.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg" },
    { name: "Dakshineswar Kali Temple", description: "Dakshineswar Kali Temple is a renowned Hindu temple located on the eastern bank of the Hooghly River. It is dedicated to Goddess Kali and is known for its beautiful architecture and spiritual ambiance.", image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG" },
    { name: "St. Paul's Cathedral", description: "St. Paul's Cathedral is a magnificent Anglican cathedral in Kolkata. It is one of the iconic landmarks of the city and showcases Gothic architecture. The cathedral is known for its serene atmosphere and beautiful stained glass windows.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/St_Paul%27s_Cathedral.jpg" },
    { name: "Tipu Sultan Mosque", description: "Tipu Sultan Mosque is a historic mosque located in Kolkata. It was built in memory of Tipu Sultan, the ruler of Mysore. The mosque is known for its intricate architecture and peaceful ambiance.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Tipu_Sultan_Mosque_Dharmatala_at_Night.jpg" },
    { name: "Belur Math", description: "Belur Math is a spiritual retreat and headquarters of the Ramakrishna Math and Ramakrishna Mission. It is located on the banks of the Hooghly River and is known for its serene environment and architectural beauty.", image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Belur_Math%2C_Howrah.jpg" },
    { name: "Jorasanko Thakur Bari", description: "Jorasanko Thakur Bari is the ancestral home of the Tagore family, including the famous poet Rabindranath Tagore. It is now a museum showcasing the life and works of Rabindranath Tagore. The place holds immense cultural and literary significance.", image: "https://www.backpacknxplore.com/wp-content/uploads/2019/07/jorasanko-thakur-bari-min_thumb.jpg" }
  ];

  return (
    <section className="page-section">
      <div className="section-tag centered">Explore Kolkata</div>
      <h1 className="section-title centered">Tourist Destinations</h1>
      <div className="tourist-grid">
        {destinations.map((place, idx) => (
          <div key={idx} className="tourist-card">
            <div className="tourist-img-wrap">
              <img src={place.image} alt={place.name} />
              <div className="tourist-num">{String(idx + 1).padStart(2, '0')}</div>
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

const Footer = () => (
  <>
    {/* CTA Banner */}
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

        <div className="footer-nav-col">
          <div className="footer-nav-title">Quick Links</div>
          {[
            { label: 'Home', to: '/' },
            { label: 'Committee', to: '/committee' },
            { label: 'Speakers', to: '/speakers' },
            { label: 'Schedule', href: '/schedule' },
            { label: 'Registration', to: '/registration' },
          ].map(({ label, to, href }) =>
            href ? (
              <a key={label} href={href} className="footer-link">{label}</a>
            ) : (
              <Link key={label} to={to} className="footer-link">{label}</Link>
            )
          )}
        </div>

        <div className="footer-nav-col">
          <div className="footer-nav-title">Submission</div>
          {[
            { label: 'Author Guidelines', to: '/guidelines' },
            { label: 'Submit Paper', to: '/submit-paper' },
            { label: 'About ICISS', href: '/#about-iciss' },
            { label: 'About IIEST', href: '/#about-iiest' },
            { label: 'Contact Us', to: '/contact' },
          ].map(({ label, to, href }) =>
            href ? (
              <a key={label} href={href} className="footer-link">{label}</a>
            ) : (
              <Link key={label} to={to} className="footer-link">{label}</Link>
            )
          )}
        </div>

        <div className="footer-nav-col">
          <div className="footer-nav-title">Contact</div>
          <a href="mailto:conference.iciss@gmail.com" className="footer-link">conference.iciss@gmail.com</a>
          <a href="mailto:shyamalenduk@it.iiests.ac.in" className="footer-link">shyamalenduk@it.iiests.ac.in</a>
          <span className="footer-link" style={{ cursor: 'default' }}>+91 70031 98150</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2027 ICISS — IIEST Shibpur. All rights reserved.</span>
      </div>
    </footer>
  </>
);

/*  APP  */
export default function App() {
  return (
    <Router>
      <div className="app-root">
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
            <Route path="/committee" element={<CommitteePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/guidelines" element={<AuthorGuidelines />} />
            <Route path="/submit-paper" element={<SubmitPaperPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/venue" element={<VenuePage />} />
            <Route path="/tourist-destinations" element={<TouristDestinationsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
