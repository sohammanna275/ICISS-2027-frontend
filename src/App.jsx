import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


const Navbar = () => (
  <header className="bg-iciss-blue pt-4 px-4">
    <nav className="max-w-6xl mx-auto bg-iciss-dark rounded-xl py-2 px-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex-shrink-0">
        <img
          src="./ICISS2027logo.png"
          alt="ICISS 2027 Logo"
          className="h-12 w-auto drop-shadow-md"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-5 text-white text-[13px] font-bold tracking-wide uppercase">
        <Link to="/" className="hover:text-iciss-gold transition">Home</Link>

        <div className="group relative">
          <button className="hover:text-iciss-gold transition flex items-center gap-1 cursor-pointer py-2">
            ABOUT <span className="text-[10px]">▼</span>
          </button>
          <div className="absolute left-0 top-full hidden group-hover:block pt-1 z-50">
            <div className="bg-iciss-dark rounded-lg shadow-2xl py-3 min-w-[260px] border border-white/10 overflow-hidden">
              {/* <Link to="#about-iiest" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                About IIEST
              </Link> */}
              <a
                href="/#about-iiest"
                className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold"
              >
                About IIEST
              </a>
              <a href="https://www.iiests.ac.in/IIEST/AcaUnitDetails/IT" target="_blank" rel="noreferrer" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                Information Technology Department
              </a>
              <a
                href="/#about-iciss"
                className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold"
              >
                About ICISS
              </a>
              {/* <Link to="/#about-iciss" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                About ICISS
              </Link> */}
            </div>
          </div>
        </div>

        <Link to="/committee" className="hover:text-iciss-gold transition">Committee</Link>
        <Link to="/speakers" className="hover:text-iciss-gold transition">Speakers</Link>
        <div className="group relative">
          <button className="hover:text-iciss-gold transition flex items-center gap-1 cursor-pointer py-2">
            CALL FOR PAPERS <span className="text-[10px]">▼</span>
          </button>
          <div className="absolute left-0 top-full hidden group-hover:block pt-1 z-50">
            <div className="bg-iciss-dark rounded-lg shadow-2xl py-3 min-w-[240px] border border-white/10 overflow-hidden">
              <Link to="/" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                Contribution Tracks
              </Link>
              <Link to="/guidelines" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                Author Guidelines
              </Link>
              <Link to="/submit-paper" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                Submit Your Paper
              </Link>
            </div>
          </div>
        </div>
        <a href="/schedule" className="hover:text-iciss-gold transition">Schedule</a>
        <Link to="/registration" className="hover:text-iciss-gold transition">Registration</Link>
        <div className="group relative">
          <button className="hover:text-iciss-gold transition flex items-center gap-1 cursor-pointer py-2">
            VENUE <span className="text-[10px]">▼</span>
          </button>
          <div className="absolute left-0 top-full hidden group-hover:block pt-1 z-50">
            <div className="bg-iciss-dark rounded-lg shadow-2xl py-3 min-w-[240px] border border-white/10 overflow-hidden">
              <Link to="#" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                Visa Information
              </Link>
              <Link to="/venue" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                Venue
              </Link>
              <Link to="/tourist-destinations" className="block px-6 py-2.5 text-white hover:bg-iciss-blue hover:text-iciss-gold normal-case text-sm font-semibold transition-all border-l-4 border-transparent hover:border-iciss-gold">
                Tourist Destinations
              </Link>
            </div>
          </div>
        </div>

        <Link to="/contact" className="hover:text-iciss-gold transition">Contact Us</Link>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section className="bg-iciss-blue pb-10 px-4 pt-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
        <div className="gallery-card h-80">
          <img src="./Vidyasagar_Setu_kolkata.jpg" alt="Vidyasagar Setu" className="w-full h-full object-cover" />
        </div>
        <div className="gallery-card h-96 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
          <img src="./vcm2.jpg" alt="Victoria Memorial" className="w-full h-full object-cover" />
        </div>
        <div className="gallery-card h-80">
          <img src="hwb.jpg" alt="Howrah Bridge" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="hero-text">
        <h1 className="text-2xl md:text-5xl mb-2 leading-tight">
          International Conference On<br />
          Intelligent Systems and Security
        </h1>
        <h2 className="text-3xl md:text-6xl leading-none">
          (ICISS 2027)
        </h2>
      </div>
    </div>
  </section>
);

const ConferenceDetails = () => (
  <div className="bg-iciss-blue px-4 py-6">
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-10 px-4 text-center rounded-2xl shadow-2xl">
      <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 uppercase tracking-wide">Conference Date:</h3>
      <p className="text-white text-xl md:text-3xl font-medium">14<sup>th</sup> to 16<sup>nd</sup> January 2027</p>
    </div>
  </div>
);

const VenueSection = () => (
  <div className="bg-iciss-blue px-4 py-6">
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-16 px-4 text-center rounded-2xl shadow-2xl">
      <h3 className="text-white text-2xl md:text-4xl font-bold mb-6 uppercase tracking-wide">Venue</h3>
      <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.634645281488!2d88.3045!3d22.5552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzE4LjciTiA4OMKwMTgnMTYuMiJF!5e0!3m2!1sen!2sin!4v1634567890123" width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="IIEST Shibpur Map"></iframe>
      </div>
    </div>
  </div>
);

const AddressSection = () => (
  <div className="bg-iciss-blue px-4 py-6">
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-10 px-4 text-center text-white rounded-2xl shadow-2xl border-t border-white/10">
      <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Address :</h3>
      <p className="text-lg leading-relaxed font-medium">
        Indian Institute of Engineering Science and Technology,<br />
        Botanical Garden Area, Howrah, West Bengal 711103, India
      </p>
    </div>
  </div>
);

const AboutIIESTSection = () => (
  <section id="about-iiest" className="bg-iciss-blue px-4 py-6 scroll-mt-20">
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-16 px-8 rounded-2xl shadow-2xl">
      <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border-4 border-white/5">
        <img
          src="https://iciss2024.in/static/media/clg1.2c7df5d561629cc3f013.png"
          alt="IIEST Shibpur Campus Aerial View"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="text-white">
        <h2 className="text-4xl font-bold mb-6 border-b border-white/20 pb-4 tracking-tight">
          About IIEST
        </h2>

        <div className="space-y-4 text-sm md:text-base leading-relaxed font-normal opacity-90">
          <p>
            IIEST Shibpur, the Indian Institute of Engineering Science and Technology Shibpur, is a well-respected technical college located in Shibpur, West Bengal, India.
          </p>
          <p>
            Established in 1856, it holds a notable place among the oldest engineering colleges in the country. IIEST Shibpur is known for its commitment to promoting research and innovation.
          </p>
          <p>
            The college provides ample opportunities for students and faculty to engage in research activities across various disciplines. With its dedicated research facilities and experienced faculty members, IIEST Shibpur offers a conducive environment for students to explore new ideas and contribute to the advancement of knowledge.
          </p>
        </div>
        <a href = "https://www.iiests.ac.in/IIEST/About#:~:text=About%20IIEST%2C%20Shibpur,-IIEST%2C%20Shibpur%20(Erstwhile&text=The%20Institute%20has%20a%20rich,16%20departments%20and%208%20schools.">
        <button className="mt-8 px-6 py-2 bg-white text-[#1e1b4b] font-bold rounded-md hover:bg-gray-200 transition-colors text-sm uppercase">
          Know More
        </button>
        </a>
      </div>
    </div>
  </section>
);


const AboutICISS = () => (
  <section id="about-iciss" className="bg-iciss-blue px-4 py-12 scroll-mt-20">
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-20 px-10 md:px-20 rounded-[2.5rem] shadow-2xl border border-white/5">
      <div className="text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 border-b border-white/20 pb-6 tracking-tight leading-tight">
          About International Conference <br />
          on Intelligent Systems and Security
        </h2>
        <div className="space-y-8 text-base md:text-lg leading-relaxed font-normal opacity-90">
          <p>
            The International Conference on Intelligent Systems and Security is set to take place in December 2024, and will bring together industry experts, practitioners, and researchers in the field.
            Attendees will have the opportunity to network and collaborate with other professionals in the field. This conference is highly recommended for those looking to stay up-to-date with the latest developments in intelligent systems and security, and to exchange ideas and collaborate on future projects.
          </p>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">Aim:</h3>
            <p>
              The aim of ICISS 2024 is to bring together researchers, practitioners, and industry experts from around the world to foster the exchange of ideas, advances, and innovations in the field of intelligent systems and security. By promoting collaboration and knowledge sharing, ICISS aims to drive the development and adoption of intelligent systems and security technologies.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">Scope:</h3>
            <p>
              ICISS welcomes contributions in the form of research papers, case studies, and industry presentations, covering a wide range of topics related to intelligent systems and security. The conference encourages multidisciplinary approaches and invites submissions that explore the union and intersection of intelligent systems and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);


const ContactPage = () => (
  <section className="bg-iciss-blue min-h-screen pt-24 px-4 pb-12">
    <div className="max-w-4xl mx-auto bg-[#1e1b4b] py-16 px-6 md:px-16 rounded-[2.5rem] shadow-2xl border border-white/5">
      <h2 className="text-white text-center text-3xl md:text-4xl font-bold mb-12 tracking-wide uppercase">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {[
          { title: "General Contact", email: "conference.iciss@gmail.com" },
          { title: "Shyamlendu Kandar", email: "shyamalenduk@it.iiests.ac.in", phone: "+91 70031 98150" },
          { title: "Ruchira Naskar", email: "ruchira@it.iiests.ac.in" },
          { title: "Chandan Giri", email: "chandan@it.iiests.ac.in" }
        ].map((contact, idx) => (
          <div key={idx} className="bg-[#241b5e]/50 border border-white/5 p-8 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]">
            <h3 className="text-white text-xl font-bold mb-4">{contact.title}</h3>
            <div className="space-y-3">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/90 hover:text-iciss-gold transition-colors text-lg">
                <span className="text-xl">✉</span> <span className="underline underline-offset-4">{contact.email}</span>
              </a>
              {contact.phone && (
                <div className="flex items-center gap-3 text-white/90 text-lg">
                  <span className="text-xl">📞</span> <span>{contact.phone}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SpeakersPage = () => {
  const speakers = [
    {
      name: "Professor Ajoy Kumar Ray",
      title: "Indian Institute of Technology Kharagpur, India",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Ajoy_Kumar_Ray_-_Kolkata_2015-11-17_5154.JPG/500px-Ajoy_Kumar_Ray_-_Kolkata_2015-11-17_5154.JPG" // Using placeholder or your actual link
    }
  ];

  return (
    <section className="bg-iciss-blue min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-center text-4xl md:text-6xl font-black mb-16 tracking-tight">
          Our Speakers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {speakers.map((s, idx) => (
            <div key={idx} className="bg-[#1e1b4b] p-4 rounded-2xl shadow-2xl border border-white/10 group">
              <div className="bg-[#4a82d3]/20 rounded-xl overflow-hidden border border-black/20">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5 bg-[#4a82d3]/40">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    {s.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base font-medium italic">
                    {s.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const CommitteePage = () => {
  const committeeData = [
    {
      category: "Chief Patron:",
      members: [{ name: "Prof. V M S R Murthy", title: "Director, IIEST, Shibpur, India" }]
    },
    {
      category: "Patron:",
      members: [
      ]
    },
    {
      category: "General Chairs:",
      members: [
        { name: "Santi Prasad Maity", title: "IIEST, Shibpur, India" },
        { name: "Arindam Biswas", title: "IIEST, Shibpur, India" },
      ]
    },
    {
      category: "General Co-Chairs:",
      members: [
      ]
    },

    {
      category: "Organizing Chair:",
      members: [
        { name: "Shyamalendu Kandar", title: "IIEST, Shibpur, India" }
      ]
    },
    {
      category: "Organizing Co-Chairs:",
      members: [
      ]
    },
    {
      category: "Program Chairs:",
      members: [
        { name: "Debasis Giri", title: "IIEST, Shibpur, India" },
        { name: "Shyamalendu Kandar", title: "IIEST, Shibpur, India" }

      ]
    },
    {
      category: "International Advisory Committee:",
      members: [


      ]
    },
    {
      category: "Website Committee:",
      members: [
        { name: "Indrajit Banerjee", title: "IIEST, Shibpur, India" },
        { name: "Soham Manna", title: "IIEST, Shibpur, India" },
        { name: "Subarno Mandal", title: "IIEST, Shibpur, India" }

      ]
    },
    {
      category: "Organizing Committee:",
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
    {
      category: "Event Management Committee:",
      members: [

      ]
    },
    {
      category: "Technical Program Committee:",
      members: [

      ]
    },
  ];

  return (
    <section className="bg-iciss-blue min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {committeeData.map((group, idx) => (
          <div key={idx} className="text-center">
            <h2 className="text-white text-3xl md:text-5xl font-black mb-8 tracking-tight">
              {group.category}
            </h2>

            <div className="bg-[#1e1b4b] rounded-[2rem] shadow-2xl overflow-hidden border border-white/5">
              {group.members.map((member, mIdx) => (
                <div
                  key={mIdx}
                  className={`py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-start gap-4 transition-colors hover:bg-white/5 ${mIdx !== group.members.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                >
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    {member.name}
                  </span>
                  <span className="text-white/70 text-lg md:text-xl italic font-medium">
                    {member.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  
};

const AuthorGuidelines = () => {
  const guidelines = [
    "Each paper must be original and unpublished work, not submitted for publication elsewhere. Authors are responsible for avoiding any copyright infringement issues. Papers should be written in good English.",
    "Submissions must be anonymous, without author name(s), affiliation(s), acknowledgments, or obvious references in LNNS Format (Word, Latex).",
    "The recommended font size is 11 points, and reasonable margins should be used.",
    "Authors are encouraged to follow the given guidelines when preparing their submissions. The papers must be in PDF format and should be submitted electronically through the CMT platform.",
    "All submitted papers that adhere to the submission guidelines will undergo evaluation. The evaluation criteria include originality, technical and/or research content/depth, correctness, relevance to the conference, contributions, and readability.",
    "Authors are expected to ensure that the similarity index of their submitted paper remains below the threshold of < 12% and < 2% from a single source.",
    "The authors of accepted papers will have an opportunity to make corrections based on the suggestions of the reviewers. They must submit the final camera-ready versions of their papers within the specified deadline.",
    "Kindly note that the permissible page length for manuscript submissions is limited to 12 pages. In the event of exceeding this limit, an additional charge of INR 600 per page or $15 per page will apply. The maximum page count with the surcharge is set at 15 pages",
    "To explore the topics of interest in detail, please visit the About ICISS Page.",

  ];

  return (
    <section className="bg-iciss-blue min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-12 tracking-tight">
          Author's Guidelines
        </h1>

        <div className="space-y-8">
          {guidelines.map((text, index) => (
            <div key={index} className="flex gap-4 text-white/90 text-lg md:text-xl leading-relaxed">
              <span className="font-bold min-w-[25px]">{index + 1}.</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-6 mt-16 pt-8 border-t border-white/10">
          <a 
            href="https://iciss2024.in/ICISS_LNNS_Word_Template.docx" 
            className="text-white text-xl md:text-2xl font-bold underline underline-offset-8 decoration-2 hover:text-iciss-gold transition-colors text-center"
          >
            Click Here For Sample Springer Paper Format (Word Template)
          </a>
          <a 
            href="https://iciss2024.in/ICISS_LNNS_latex_Template.zip" 
            className="text-white text-xl md:text-2xl font-bold underline underline-offset-8 decoration-2 hover:text-iciss-gold transition-colors text-center"
          >
            Click Here For Sample Springer Paper Format (Latex Template)
          </a>
        </div>
      </div>
    </section>
  );
};

const SubmitPaperPage = () => {
  const content = [
    "The authors are pleasingly invited to submit the full paper of their original, unpublished, research contribution which is not currently under review by another conference or journal. Only the accepted and registered papers will be allowed to present at the conference.",
    "Submissions for the conference must be made online using CMT Portal.",
    "Click on 'Submit Your Paper' button below to proceed with submission."
  ];

  return (
    <section className="bg-iciss-blue min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-12 tracking-tight">
          Submit Your Paper
        </h1>
        
        <div className="space-y-8 text-white/90 text-lg md:text-xl leading-relaxed mb-12">
          {content.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <div className="mt-10">
          <a 
            href="https://cmt3.research.microsoft.com/" 
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-[#e5e7eb] text-[#2b5a9e] px-10 py-4 rounded-xl text-xl font-bold hover:bg-white transition-colors shadow-lg border border-white/20"
          >
            Submit Your Paper
          </a>
        </div>
      </div>
    </section>
  );
};

const RegistrationPage = () => {
  const fees = [
    { category: "Academia (Author)", indianEarly: "₹7000 (per paper)", indianLate: "₹8000 (per paper)", foreignEarly: "$200 (per paper)", foreignLate: "$250 (per paper)" },
    { category: "Industry/ R & D organization (Author)", indianEarly: "₹8000 (per paper)", indianLate: "₹9000 (per paper)", foreignEarly: "$250 (per paper)", foreignLate: "$300 (per paper)" },
    { category: "Attending only (Academia)", indianEarly: "₹3000 (per person)", indianLate: "₹3000 (per person)", foreignEarly: "$120 (per person)", foreignLate: "$120 (per person)" },
    { category: "Industry Attendee", indianEarly: "₹5000 (per person)", indianLate: "₹5000 (per person)", foreignEarly: "$150 (per person)", foreignLate: "$150 (per person)" },
    { category: "Accompanying Person", indianEarly: "₹2000 (per person)", indianLate: "₹2000 (per person)", foreignEarly: "$100 (per person)", foreignLate: "$100 (per person)" },
  ];

  return (
    <section className="bg-iciss-blue min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-white text-center text-3xl md:text-5xl font-bold mb-10 tracking-tight">
          Conference Registration Fee
        </h1>

        <div className="overflow-x-auto bg-[#1e1b4b] rounded-2xl shadow-2xl p-4 md:p-8">
          <table className="w-full border-collapse text-white text-xs md:text-sm">
            <thead>
              <tr className="bg-white/10">
                <th rowSpan="2" className="border border-white/20 p-4">Category</th>
                <th colSpan="2" className="border border-white/20 p-2 text-center">Indian Participant</th>
                <th colSpan="2" className="border border-white/20 p-2 text-center">Foreign Participant</th>
              </tr>
              <tr className="bg-white/5 text-[10px] md:text-xs">
                <th className="border border-white/20 p-2 text-center">On or before November 10, 2027</th>
                <th className="border border-white/20 p-2 text-center">After November 10, 2027</th>
                <th className="border border-white/20 p-2 text-center">On or before November 10, 2027</th>
                <th className="border border-white/20 p-2 text-center">After November 10, 2027</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="border border-white/20 p-4 font-semibold">{row.category}</td>
                  <td className="border border-white/20 p-2 text-center">{row.indianEarly}</td>
                  <td className="border border-white/20 p-2 text-center">{row.indianLate}</td>
                  <td className="border border-white/20 p-2 text-center">{row.foreignEarly}</td>
                  <td className="border border-white/20 p-2 text-center">{row.foreignLate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-2 border-white/30 p-6 rounded-xl bg-[#1e1b4b]">
          <p className="text-yellow-400 text-sm md:text-base font-medium leading-relaxed">
            Kindly note that the permissible page length is limited to 12 pages according to available template. 
            In the event of exceeding this limit, an additional charge of INR 600 per page or $15 per page will apply.
          </p>
          <p className="text-yellow-400 text-sm md:text-base font-medium mt-4">
            Presentation Certificate will be provided to only one presenter per paper.
          </p>
        </div>

        <div className="flex justify-center py-6">
          <button className="bg-white text-[#2b5a9e] px-10 py-3 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg">
            Register
          </button>
        </div>

        <div className="max-w-2xl mx-auto overflow-hidden rounded-xl border border-white/20">
          <table className="w-full text-white text-sm bg-[#1e1b4b]">
            <tbody>
              {[
                ["Account Name", "CONTINUING EDUCATION CENTRE IIESTS"],
                ["Bank Name", "PUNJAB NATIONAL BANK"],
                ["Branch Name", "IIESTS BRANCH"],
                ["Account Number", "1532010011063"],
                ["IFSC", "PUNB0153220"],
                ["MICR Code", "700024356"]
              ].map(([label, value], i) => (
                <tr key={i} className="border-b border-white/10 last:border-0">
                  <td className="p-4 font-bold border-r border-white/10 w-1/3">{label}</td>
                  <td className="p-4 uppercase">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-white/60 text-center text-xs mt-8">
           Last date of author's registration is 10th Nov 2027. After that, an additional fee of ₹1000 for Indian participants and $50 for foreign participants must be paid.
        </p>
      </div>
    </section>
  );
};

const VenuePage = () => {
  const reachData = [
    {
      title: "Nearest Airport",
      points: [
        { name: "Netaji Subhash Chandra Bose International Airport", detail: "22 km" }
      ]
    },
    {
      title: "Nearest Railway Stations",
      points: [
        { name: "Howrah Railway Station", detail: "5 km" },
        { name: "Shalimar Railway Station", detail: "2 km" },
        { name: "Sealdah Railway Station", detail: "12 km" }
      ]
    }
  ];

  return (
    <section className="bg-iciss-blue min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-white text-center text-4xl md:text-6xl font-black uppercase tracking-tight">
          Venue
        </h1>

        <div className="max-w-xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.63216834163!2d88.30452391081518!3d22.5554170335032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279c916f27217%3A0x643666d987d3a01!2sIIEST%20Shibpur!5e0!3m2!1sen!2sin!4v1711812000000"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="IIEST Shibpur Map"
          ></iframe>
        </div>

        <div className="max-w-2xl mx-auto bg-[#1e1b4b] p-8 rounded-2xl shadow-xl border border-white/10 text-center">
          <div className="flex justify-center items-center gap-3 mb-4 text-iciss-gold">
            <span className="text-2xl">⚙</span>
            <h3 className="text-2xl font-bold uppercase tracking-widest text-white">Address :</h3>
          </div>
          <p className="text-white/90 text-lg leading-relaxed">
            Indian Institute of Engineering Science and Technology,<br />
            Botanical Garden Area, Howrah, West Bengal 711103, India
          </p>
        </div>

        <h2 className="text-white text-center text-4xl md:text-6xl font-black uppercase mt-16">
          How to Reach ?
        </h2>

        <div className="max-w-4xl mx-auto bg-[#1e1b4b] py-12 px-8 md:px-16 rounded-[2.5rem] shadow-2xl border border-white/5 space-y-10">
          {reachData.map((section, idx) => (
            <div key={idx} className="border-b border-white/10 pb-8 last:border-0">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.points.map((p, pIdx) => (
                  <li key={pIdx} className="text-white/80 text-lg md:text-xl">
                    <div className="flex items-start gap-2">
                      <span className="text-iciss-gold mt-1">•</span>
                      <div>
                        <p className="font-semibold text-white">{p.name}</p>
                        <p className="text-sm italic opacity-70">{p.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TouristDestinationsPage = () => {
  const destinations = [
    {
      name: "Victoria Memorial",
      description: "The Victoria Memorial is a large marble building in Kolkata, West Bengal, India. It is dedicated to the memory of Queen Victoria and is now a museum and tourist destination. It is known for its stunning architecture and beautiful gardens.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Victoria-Memorial-Kolkata-India.jpg"
    },
    {
      name: "Kalighat",
      description: "Kalighat is a famous Hindu temple dedicated to the goddess Kali. It is one of the 51 Shakti Peethas and holds great religious significance. Devotees from all over the world visit this temple to seek blessings.",
      image: "https://www.trawell.in/admin/images/upload/555418767Kolkata_Kalighat_Temple_Main.jpg"
    },
    {
      name: "Indian Museum",
      description: "The Indian Museum is the largest and oldest museum in India. It has a vast collection of artifacts, including sculptures, paintings, and archaeological finds. It is a treasure trove of Indian history and culture.",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg"
    },
    {
      name: "Dakshineswar Kali Temple",
      description: "Dakshineswar Kali Temple is a renowned Hindu temple located on the eastern bank of the Hooghly River. It is dedicated to Goddess Kali and is known for its beautiful architecture and spiritual ambiance.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG"
    },
    {
      name: "St. Paul's Cathedral",
      description: "St. Paul's Cathedral is a magnificent Anglican cathedral in Kolkata. It is one of the iconic landmarks of the city and showcases Gothic architecture. The cathedral is known for its serene atmosphere and beautiful stained glass windows.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/St_Paul%27s_Cathedral.jpg"
    },
    {
      name: "Tipu Sultan Mosque",
      description: "Tipu Sultan Mosque is a historic mosque located in Kolkata. It was built in memory of Tipu Sultan, the ruler of Mysore. The mosque is known for its intricate architecture and peaceful ambiance.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Tipu_Sultan_Mosque_Dharmatala_at_Night.jpg"
    },
    {
      name: "Belur Math",
      description: "Belur Math is a spiritual retreat and headquarters of the Ramakrishna Math and Ramakrishna Mission. It is located on the banks of the Hooghly River and is known for its serene environment and architectural beauty.",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Belur_Math%2C_Howrah.jpg"
    },
    {
      name: "Jorasanko Thakur Bari",
      description: "Jorasanko Thakur Bari is the ancestral home of the Tagore family, including the famous poet Rabindranath Tagore. It is now a museum showcasing the life and works of Rabindranath Tagore. The place holds immense cultural and literary significance.",
      image: "https://www.backpacknxplore.com/wp-content/uploads/2019/07/jorasanko-thakur-bari-min_thumb.jpg"
    }
  ];

  return (
    <section className="bg-iciss-blue min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-center text-4xl md:text-6xl font-black mb-16 tracking-tight uppercase">
          Tourist Destinations
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {destinations.map((place, idx) => (
            <div key={idx} className="bg-[#1e1b4b] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col">
              <div className="h-64 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              {/* Content Area */}
              <div className="p-8">
                <h3 className="text-iciss-gold text-2xl md:text-3xl font-bold mb-4">
                  {place.name}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {place.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <>
    <section className="bg-iciss-blue pb-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <Link to="/contact" className="inline-block bg-iciss-dark text-white px-10 py-4 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-xl border border-white/10">
          Contact us for any other queries
        </Link>
      </div>
    </section>
    <footer className="bg-[#e0f7fa] py-16 px-4 text-center">
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
        {['Home', 'About', 'FAQs', 'Contact Us', 'Register', 'Submit a Paper'].map((link) => (
          <Link key={link} to={link === 'Contact Us' ? '/contact' : '/'} className="text-[#4a82d3] text-2xl font-bold hover:opacity-70 transition-opacity">
            {link}
          </Link>
        ))}
      </div>
      <div className="text-gray-600 text-lg font-medium">© ICISS</div>
    </footer>
  </>
);


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />

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

        <Footer />
      </div>
    </Router>
  );
}