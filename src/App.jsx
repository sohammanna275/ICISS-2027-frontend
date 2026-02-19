// // import React from 'react';
// // import './App.css'

// // const Navbar = () => (
// //   <nav className="bg-[#2b5a9e] py-4 px-6 shadow-lg">
// //     <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
// //       {/* Logo Container */}
// //       <div className="bg-[#1e3a5f] p-2 rounded-xl border border-blue-400 shadow-inner">
// //         <img 
// //           src="./icisslogo.ico" 
// //           alt="ICISS 2024 Logo" 
// //           className="h-16 w-auto"
// //         />
// //       </div>

// //       {/* Menu Links */}
// //       <div className="flex flex-wrap justify-center gap-4 text-white text-sm font-medium">
// //         <a href="#" className="hover:text-iciss-gold transition">Home</a>
// //         <div className="group relative">
// //           <button className="hover:text-iciss-gold transition">About ▾</button>
// //         </div>
// //         <a href="#" className="hover:text-iciss-gold transition">Committee</a>
// //         <a href="#" className="hover:text-iciss-gold transition">Speakers</a>
// //         <a href="#" className="hover:text-iciss-gold transition">Call for Papers ▾</a>
// //         <a href="#" className="hover:text-iciss-gold transition">Schedule</a>
// //         <a href="#" className="hover:text-iciss-gold transition">Registration</a>
// //         <a href="#" className="hover:text-iciss-gold transition">Venue ▾</a>
// //         <a href="#" className="hover:text-iciss-gold transition">Contact Us</a>
// //       </div>
// //     </div>
// //   </nav>
// // );

// // const ImageGallery = () => (
// //   <div className="bg-[#4a82d3] py-8 px-4">
// //     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
// //       <div className="h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition">
// //         <img src="./Vidyasagar_Setu_kolkata.jpg" alt="Vidyasagar Setu" className="w-full h-full object-cover" />
// //       </div>
// //       <div className="h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition">
// //         <img src="./vcm2.jpg" alt="Victoria Memorial" className="w-full h-full object-cover" />
// //       </div>
// //       <div className="h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition">
// //         <img src="hwb.jpg" alt="Howrah Bridge" className="w-full h-full object-cover" />
// //       </div>
// //     </div>
// //     <h1 className="text-white text-center text-4xl md:text-6xl font-black mt-12 tracking-tight uppercase">
// //       International Conference On <br />
// //       Intelligent Systems and Security
// //     </h1>
// //   </div>
// // );

// // const InfoSection = ({ title, children }) => (
// //   <section className="py-12 px-6 max-w-5xl mx-auto">
// //     <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 border-b-2 border-gray-200 pb-2">{title}</h2>
// //     <div className="text-gray-700 leading-relaxed text-lg">{children}</div>
// //   </section>
// // );

// // export default function App() {
// //   return (
// //     <div className="min-h-screen bg-white">
// //       <Navbar />
// //       <ImageGallery />

// //       <InfoSection title="About IIEST">
// //         <p>
// //           IIEST Shibpur, the Indian Institute of Engineering Science and Technology Shibpur, 
// //           is a well-respected technical college located in Shibpur, West Bengal, India. 
// //           Established in 1856, it holds a notable place among the oldest engineering colleges in the country.
// //         </p>
// //         <button className="mt-4 px-4 py-2 bg-gray-200 text-sm rounded border border-gray-400 hover:bg-gray-300">
// //           Know More
// //         </button>
// //       </InfoSection>

// //       <InfoSection title="About International Conference">
// //         <p>
// //           The International Conference on Intelligent Systems and Security (ICISS 2024) is set to 
// //           take place in December 2024, and will bring together industry experts, practitioners, 
// //           and researchers in the field.
// //         </p>
// //         <div className="mt-6 font-bold text-[#1e3a5f]">Aim:</div>
// //         <p>To foster the exchange of ideas, advances, and innovations in the field of intelligent systems and security.</p>
// //       </InfoSection>
// //     </div>
// //   );
// // }

// import React from 'react';
// import './App.css';

// const Navbar = () => (

//   <header className="bg-[#4a82d3] pt-6 px-4">
//     {/* The floating dark blue navbar card */}
//     <nav className="max-w-6xl mx-auto bg-[#1e3a5f] rounded-xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
//       <div className="flex-shrink-0">
//         <img 
//           src="./icisslogo.ico" 
//           alt="ICISS 2024 Logo" 
//           className="h-14 w-auto drop-shadow-lg"
//         />
//       </div>

//       <div className="flex flex-wrap justify-center gap-5 text-white text-sm font-semibold tracking-wide">
//         <a href="#" className="hover:text-iciss-gold transition border-b-2 border-transparent hover:border-iciss-gold pb-1">Home</a>
//         <button className="hover:text-iciss-gold transition">About ▾</button>
//         <a href="#" className="hover:text-iciss-gold transition">Committee</a>
//         <a href="#" className="hover:text-iciss-gold transition">Speakers</a>
//         <button className="hover:text-iciss-gold transition">Call for Papers ▾</button>
//         <a href="#" className="hover:text-iciss-gold transition">Schedule</a>
//         <a href="#" className="hover:text-iciss-gold transition">Registration</a>
//         <button className="hover:text-iciss-gold transition">Venue ▾</button>
//         <a href="#" className="hover:text-iciss-gold transition">Contact Us</a>
//       </div>
//     </nav>
//   </header>
// );

// const Hero = () => (
//   <section className="bg-[#4a82d3] pb-16 px-4">
//     <div className="max-w-6xl mx-auto pt-10">
//       {/* 3-Column Image Gallery with high rounding */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         <div className="gallery-card h-80">
//           <img src="./Vidyasagar_Setu_kolkata.jpg" alt="Vidyasagar Setu" className="w-full h-full object-cover" />
//         </div>
//         <div className="gallery-card h-80 md:scale-105"> {/* Center image slightly larger */}
//           <img src="./vcm2.jpg" alt="Victoria Memorial" className="w-full h-full object-cover" />
//         </div>
//         <div className="gallery-card h-80">
//           <img src="hwb.jpg" alt="Howrah Bridge" className="w-full h-full object-cover" />
//         </div>
//       </div>

//       {/* Heavy Typography to match image_6c88e5.png */}
//       <div className="text-center text-white px-4">
//         <h1 className="text-4xl md:text-7xl font-[900] uppercase leading-tight tracking-tight">
//           International Conference On <br />
//           Intelligent Systems and Security
//         </h1>
//         <h2 className="text-3xl md:text-6xl font-[900] uppercase mt-4">
//           (ICISS 2024)
//         </h2>
//       </div>
//     </div>
//   </section>
// );

// const InfoSection = ({ title, children }) => (
//   <section className="py-16 px-6 max-w-5xl mx-auto">
//     <h2 className="text-4xl font-black text-[#1e3a5f] mb-6 border-b-4 border-[#4a82d3] inline-block pb-2">
//       {title}
//     </h2>
//     <div className="text-gray-800 leading-relaxed text-xl font-medium mt-4">
//       {children}
//     </div>
//   </section>
// );

// export default function App() {
//   return (
//     <div className="min-h-screen bg-white selection:bg-iciss-gold selection:text-iciss-dark">
//       <Navbar />
//       <Hero />

//       <div className="bg-white">
//         <InfoSection title="About IIEST">
//           <p>
//             IIEST Shibpur, the Indian Institute of Engineering Science and Technology Shibpur, 
//             is a well-respected technical college located in Shibpur, West Bengal, India. 
//             Established in 1856, it holds a notable place among the oldest engineering colleges in the country.
//           </p>
//           <button className="mt-8 px-8 py-3 bg-gray-100 font-bold text-[#1e3a5f] rounded-lg border-2 border-gray-300 hover:bg-gray-200 transition shadow-sm">
//             Know More
//           </button>
//         </InfoSection>

//         <InfoSection title="About International Conference">
//           <p>
//             The International Conference on Intelligent Systems and Security (ICISS 2024) is set to 
//             take place in December 2024, and will bring together industry experts, practitioners, 
//             and researchers in the field.
//           </p>
//           <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-8 border-[#1e3a5f]">
//             <span className="font-black text-2xl text-[#1e3a5f] block mb-2">Aim:</span>
//             <p className="italic">To foster the exchange of ideas, advances, and innovations in the field of intelligent systems and security.</p>
//           </div>
//         </InfoSection>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import './App.css';
// const Navbar = () => (
//   <header className="bg-iciss-blue pt-8 px-4">
   
//     <nav className="max-w-6xl mx-auto bg-iciss-dark rounded-xl p-4 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
//       <div className="flex-shrink-0">
//         <img
//           src="./icisslogo.ico"
//           alt="ICISS 2024 Logo"
//           className="h-14 w-auto drop-shadow-md"
//         />
//       </div>

//       <div className="flex flex-wrap justify-center gap-6 text-white text-sm font-bold tracking-wide uppercase">
//         <a href="#" className="hover:text-iciss-gold transition">Home</a>
//         <button className="hover:text-iciss-gold transition">About ▾</button>
//         <a href="#" className="hover:text-iciss-gold transition">Committee</a>
//         <a href="#" className="hover:text-iciss-gold transition">Speakers</a>
//         <button className="hover:text-iciss-gold transition">Call for Papers ▾</button>
//         <a href="#" className="hover:text-iciss-gold transition">Schedule</a>
//         <a href="#" className="hover:text-iciss-gold transition">Registration</a>
//         <button className="hover:text-iciss-gold transition">Venue ▾</button>
//         <a href="#" className="hover:text-iciss-gold transition">Contact Us</a>
//       </div>
//     </nav>
//   </header>
// );

// const Hero = () => (
//   <section className="bg-iciss-blue pb-20 px-4 pt-12">
//     <div className="max-w-7xl mx-auto">
//       {/* 3-Column Gallery with extra-rounded corners */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-center">
//         <div className="gallery-card h-80">
//           <img src="./Vidyasagar_Setu_kolkata.jpg" alt="Vidyasagar Setu" className="w-full h-full object-cover" />
//         </div>
//         <div className="gallery-card h-96 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
//           <img src="./vcm2.jpg" alt="Victoria Memorial" className="w-full h-full object-cover" />
//         </div>
//         <div className="gallery-card h-80">
//           <img src="hwb.jpg" alt="Howrah Bridge" className="w-full h-full object-cover" />
//         </div>
//       </div>
//       <div className="hero-text">
//         <h1 className="text-2xl md:text-5xl mb-4">
//           International Conference On
//           Intelligent Systems and Security
//         </h1>
//         <h2 className="text-3xl md:text-6xl">
//           (ICISS 2027)
//         </h2>
//       </div>
//     </div>
//   </section>
// );

const Navbar = () => (
  // Reduced pt-8 to pt-4
  <header className="bg-iciss-blue pt-4 px-4">
    {/* Reduced p-4 to py-2 px-4 to make the bar thinner */}
    <nav className="max-w-6xl mx-auto bg-iciss-dark rounded-xl py-2 px-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex-shrink-0">
        <img
          src="./icisslogo.ico"
          alt="ICISS 2024 Logo"
          // Reduced height slightly to keep the bar slim
          className="h-12 w-auto drop-shadow-md"
        />
      </div>

      {/* Reduced gap-6 to gap-4 or gap-5 for a tighter fit */}
      <div className="flex flex-wrap justify-center gap-5 text-white text-[13px] font-bold tracking-wide uppercase">
        <a href="#" className="hover:text-iciss-gold transition">Home</a>
        <button className="hover:text-iciss-gold transition">About ▾</button>
        <a href="#" className="hover:text-iciss-gold transition">Committee</a>
        <a href="#" className="hover:text-iciss-gold transition">Speakers</a>
        <button className="hover:text-iciss-gold transition">Call for Papers ▾</button>
        <a href="#" className="hover:text-iciss-gold transition">Schedule</a>
        <a href="#" className="hover:text-iciss-gold transition">Registration</a>
        <button className="hover:text-iciss-gold transition">Venue ▾</button>
        <a href="#" className="hover:text-iciss-gold transition">Contact Us</a>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section className="bg-iciss-blue pb-10 px-4 pt-6"> {/* Reduced top padding from pt-12 to pt-6 */}
    <div className="max-w-7xl mx-auto">
      {/* Reduced bottom margin from mb-16 to mb-8 */}
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
        {/* Added leading-tight and reduced margin */}
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
// const ConferenceDetails = () => (
//   <div className="bg-[#1e1b4b] py-10 px-4 text-center border-b-4 border-iciss-blue">
//     <div className="max-w-4xl mx-auto">
//       <h3 className="text-white text-2xl md:text-4xl font-bold mb-2">
//         Conference Date:
//       </h3>
//       <p className="text-white text-xl md:text-3xl font-medium mb-4">
//         20<sup>th</sup> to 22<sup>nd</sup> December 2027
//       </p>
//       <button className="text-[#fbbf24] hover:text-yellow-300 text-xl md:text-3xl font-bold transition-all duration-500 uppercase tracking-wider underline decoration-2 underline-offset-8 animate-pulse hover:scale-110 active:scale-95 cursor-pointer">
//         View Best Paper Awards
//       </button>
//     </div>
//   </div>
// );

// const ConferenceDetails = () => (
//   // Increased vertical padding from py-10 to py-16
//   <div className="bg-[#1e1b4b] py-16 px-4 text-center border-b-4 border-iciss-blue">
//     <div className="max-w-4xl mx-auto">
//       {/* Added mb-4 for more space below the heading */}
//       <h3 className="text-white text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide">
//         Conference Date:
//       </h3>
//       {/* Increased mb-4 to mb-8 to separate the date from the button */}
//       <p className="text-white text-xl md:text-3xl font-medium mb-8">
//         20<sup>th</sup> to 22<sup>nd</sup> December 2027
//       </p>
//       <button className="text-[#fbbf24] hover:text-yellow-300 text-xl md:text-3xl font-bold transition-all duration-500 uppercase tracking-wider underline decoration-2 underline-offset-8 animate-pulse hover:scale-110 active:scale-95 cursor-pointer">
//         View Best Paper Awards
//       </button>
//     </div>
//   </div>
// );

// const VenueSection = () => (
//   <section className="bg-[#1e1b4b] py-16 px-4">
//     <div className="max-w-6xl mx-auto text-center">
//       <h2 className="text-white text-4xl md:text-5xl font-black uppercase mb-12 tracking-tight">
//         Venue
//       </h2>

//       {/* Map Container */}
//       <div className="max-w-xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.632065879685!2d88.30485987604477!3d22.555455633947473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279c66914619b%3A0xe63989e248f3b6a9!2sIndian%20Institute%20of%20Engineering%20Science%20and%20Technology%2C%20Shibpur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
//           width="100%"
//           height="350"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//           title="IIEST Shibpur Map"
//         ></iframe>
//       </div>
//     </div>

//   </section>
// );

const ConferenceDetails = () => (
  <div className="bg-iciss-blue px-4 py-6"> {/* Blue background wrapper */}
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-10 px-4 text-center rounded-2xl shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 uppercase tracking-wide">
          Conference Date:
        </h3>
        <p className="text-white text-xl md:text-3xl font-medium mb-4">
          20<sup>th</sup> to 22<sup>nd</sup> December 2027
        </p>
        <button className="text-[#fbbf24] hover:text-yellow-300 text-xl md:text-3xl font-bold transition-all duration-500 uppercase tracking-wider underline underline-offset-8 cursor-pointer">
          View Best Paper Awards
        </button>
      </div>
    </div>
  </div>
);

const VenueSection = () => (
  <div className="bg-iciss-blue px-4 py-6"> 
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-16 px-4 text-center rounded-2xl shadow-2xl">
      {/* <h3 className="text-white text-4xl md:text-5xl font-black uppercase mb-12 tracking-tight">
        Venue
      </h3> */}
      <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 uppercase tracking-wide">
          Venue
        </h3>

      <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.743114515286!2d88.30452607594966!3d22.55127823374825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279c91a32997b%3A0xc399f928a68b4491!2sIndian%20Institute%20of%20Engineering%20Science%20and%20Technology%2C%20Shibpur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="IIEST Shibpur Map"
        ></iframe>
      </div>
    </div>
  </div>
);

const AddressSection = () => (
  <div className="bg-iciss-blue px-4 py-6">
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-10 px-4 text-center text-white rounded-2xl shadow-2xl border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-xl"></span>
          <h3 className="text-2xl font-bold uppercase tracking-widest">Address :</h3>
          <span className="text-xl"></span>
        </div>
        <p className="text-lg leading-relaxed font-medium">
          Indian Institute of Engineering Science and Technology,<br />
          Botanical Garden Area, Howrah, West Bengal 711103, India
        </p>
      </div>
    </div>
  </div>
);
const PartnerGrid = ({ title, partners }) => (
  <section className="bg-iciss-blue py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-white text-center text-3xl font-bold mb-12 uppercase tracking-wide">
        {title}
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {partners.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-4 group">
            <div className="bg-white p-4 rounded-2xl w-48 h-48 flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
              <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-white font-semibold text-sm text-center max-w-[180px]">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// const AboutIIESTSection = () => (
//   <section className="bg-[#1e1b4b] py-20 px-6">
//     <div className="max-w-6xl mx-auto">
//       {/* Aerial Campus Image */}
//       <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border-4 border-white/5">
//         <img 
//           src="./iiest_campus_aerial.jpg" 
//           alt="IIEST Shibpur Campus Aerial View" 
//           className="w-full h-auto object-cover"
//         />
//       </div>

//       {/* About Content */}
//       <div className="text-white">
//         <h2 className="text-4xl font-bold mb-6 border-b border-white/20 pb-4 tracking-tight">
//           About IIEST
//         </h2>
        
//         <div className="space-y-4 text-sm md:text-base leading-relaxed font-normal opacity-90">
//           <p>
//             IIEST Shibpur, the Indian Institute of Engineering Science and Technology Shibpur, is a well-respected technical college located in Shibpur, West Bengal, India.
//           </p>
//           <p>
//             Established in 1856, it holds a notable place among the oldest engineering colleges in the country. IIEST Shibpur is known for its commitment to promoting research and innovation.
//           </p>
//           <p>
//             The college provides ample opportunities for students and faculty to engage in research activities across various disciplines. With its dedicated research facilities and experienced faculty members, IIEST Shibpur offers a conducive environment for students to explore new ideas and contribute to the advancement of knowledge. The college's focus on research adds depth to its academic programs and helps students develop critical thinking and problem-solving skills.
//           </p>
//         </div>

//         <button className="mt-8 px-6 py-2 bg-white text-[#1e1b4b] font-bold rounded-md hover:bg-gray-200 transition-colors text-sm uppercase">
//           Know More
//         </button>
//       </div>
//     </div>
//   </section>
// );

const AboutIIESTSection = () => (
  <section className="bg-iciss-blue px-4 py-6"> {/* Blue background wrapper */}
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-16 px-8 rounded-2xl shadow-2xl">
      {/* Aerial Campus Image */}
      <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border-4 border-white/5">
        <img 
          src="https://iciss2024.in/static/media/clg1.2c7df5d561629cc3f013.png" 
          alt="IIEST Shibpur Campus Aerial View" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* About Content */}
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

        <button className="mt-8 px-6 py-2 bg-white text-[#1e1b4b] font-bold rounded-md hover:bg-gray-200 transition-colors text-sm uppercase">
          Know More
        </button>
      </div>
    </div>
  </section>
);

// const ConferenceInfoSection = () => (
//   <section className="bg-[#1e1b4b] py-20 px-6 border-t border-white/10">
//     <div className="max-w-6xl mx-auto text-white">
//       <h2 className="text-4xl font-bold mb-8 tracking-tight">
//         About International Conference <br />
//         on Intelligent Systems and Security
//       </h2>
      
//       <div className="space-y-8 opacity-90 leading-relaxed text-sm md:text-base">
//         <p>
//           The International Conference on Intelligent Systems and Security is set to take place in December 2024, and will bring together industry experts, practitioners, and researchers in the field. Attendees will have the opportunity to network and collaborate with other professionals in the field. This conference is highly recommended for those looking to stay up-to-date with the latest developments in intelligent systems and security, and to exchange ideas and collaborate on future projects.
//         </p>

//         <div>
//           <h3 className="text-2xl font-black mb-3 text-white">Aim:</h3>
//           <p>
//             The aim of ICISS 2024 is to bring together researchers, practitioners, and industry experts from around the world to foster the exchange of ideas, advances, and innovations in the field of intelligent systems and security. By promoting collaboration and knowledge sharing, ICISS aims to drive the development and adoption of intelligent systems and security technologies, addressing the emerging challenges and opportunities in various domains.
//           </p>
//         </div>

//         <div>
//           <h3 className="text-2xl font-black mb-3 text-white">Scope:</h3>
//           <p className="mb-6">
//             ICISS welcomes contributions in the form of research papers, case studies, and industry presentations, covering a wide range of topics related to intelligent systems and security. The conference encourages multidisciplinary approaches and invites submissions that explore the union and intersection of intelligent systems and security.
//           </p>
          
//           <div className="bg-white/5 p-6 rounded-xl border border-white/10">
//             <p className="flex flex-wrap items-center gap-2">
//               <span className="font-bold">Note:</span> All Accepted and presented papers will be published by 
//               <span className="bg-white px-2 py-1 rounded inline-flex items-center">
//                 <img src="https://iciss2024.in/static/media/springer.702b8006.png" alt="Springer" className="h-4" />
//               </span> 
//               in a book series of "Lecture Notes in Networks and Systems (LNNS)" (Confirmed) That Is Indexed By SCOPUS, INSPEC, WTI Frankfurt EG, ZbMATH, SCImago, Web of Science.
//             </p>
//             <p className="mt-4 italic text-sm">
//               Best papers (1st, 2nd and 3rd) in each track of the conference may be considered for publication in Journal of The Institution of Engineers (India): Series B (SCImago and SCOPUS indexed) with appropriate enhancement (up to 80%) and suitable peer review process of the Journal.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

const ConferenceInfoSection = () => (
  <section className="bg-iciss-blue px-4 py-6"> {/* Blue background wrapper */}
    <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-16 px-8 rounded-2xl shadow-2xl">
      <div className="text-white">
        <h2 className="text-4xl font-bold mb-8 tracking-tight">
          About International Conference <br />
          on Intelligent Systems and Security
        </h2>
        
        <div className="space-y-8 opacity-90 leading-relaxed text-sm md:text-base">
          <p>
            The International Conference on Intelligent Systems and Security is set to take place in December 2024, and will bring together industry experts, practitioners, and researchers in the field. Attendees will have the opportunity to network and collaborate with other professionals in the field.
          </p>

          <div>
            <h3 className="text-2xl font-black mb-3 text-white">Aim:</h3>
            <p>
              The aim of ICISS 2024 is to bring together researchers, practitioners, and industry experts from around the world to foster the exchange of ideas, advances, and innovations in the field of intelligent systems and security.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-3 text-white">Scope:</h3>
            <p className="mb-6">
              ICISS welcomes contributions in the form of research papers, case studies, and industry presentations, covering a wide range of topics related to intelligent systems and security.
            </p>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-bold">Note:</span> All Accepted and presented papers will be published by 
                <span className="bg-white px-2 py-1 rounded inline-flex items-center mx-1">
                  <img src="data:image/png;base64,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" alt="Springer" className="h-4" />
                </span> 
                in a book series of "Lecture Notes in Networks and Systems (LNNS)".
              </p>
              <p className="mt-4 italic text-sm border-t border-white/10 pt-4">
                Best papers (1st, 2nd and 3rd) in each track of the conference may be considered for publication in Journal of The Institution of Engineers (India): Series B.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TimelineSection = () => {
  const timelineData = [
    { event: "Paper Submissions Deadline", date: "September 15, 2027", status: "Closed" },
    { event: "Notification of Final Acceptance", date: "October 25, 2027", status: "" },
    { event: "Camera Ready Paper Submission", date: "November 3, 2027", status: "" },
    { event: "Author Registration Deadline", date: "November 10, 2027", status: "" },
    { event: "Conference Date", date: "December 20-22, 2027", status: "" },
  ];

  return (
    <section className="bg-iciss-blue px-4 py-6">
      <div className="max-w-6xl mx-auto bg-[#1e1b4b] py-16 px-4 md:px-12 rounded-2xl shadow-2xl text-center">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-2 tracking-tight">
          Timeline of Events
        </h2>
        <p className="text-red-500 font-bold mb-10 text-lg uppercase tracking-widest">
          (Hard Deadline)
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-white/20 text-white text-left md:text-center">
            <thead>
              <tr className="bg-white/10 text-xl">
                <th className="p-4 border border-white/20 font-black uppercase">Event</th>
                <th className="p-4 border border-white/20 font-black uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {timelineData.map((item, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 border border-white/20 font-semibold">{item.event}</td>
                  <td className="p-4 border border-white/20 font-medium">
                    {item.status === "Closed" ? (
                      <span className="line-through opacity-60">{item.date}</span>
                    ) : (
                      item.date
                    )}
                    {item.status && (
                      <span className="ml-2 text-red-400 font-bold italic">{item.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
const Footer = () => (
  <>
    {/* Contact CTA Section */}
    <section className="bg-iciss-blue pb-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <button className="bg-iciss-dark text-white px-10 py-4 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-xl cursor-pointer border border-white/10">
          Contact us for any other queries
        </button>
      </div>
    </section>

    {/* Light Blue Footer */}
    <footer className="bg-[#e0f7fa] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          {['Home', 'About', 'FAQs', 'Contact Us', 'Register', 'Submit a Paper'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-[#4a82d3] text-2xl font-bold hover:opacity-70 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 text-lg font-medium">
          © ICISS
        </div>
      </div>
    </footer>
  </>
);
export default function App() {
  const associationData = [
    { name: "CDAC, Kolkata", logo: "https://iciss2024.in/static/media/cdac.a0a6f15a7657ff6695e6.jpeg" },
    { name: "Kolkata Police", logo: "https://iciss2024.in/kolkatapolice.svg" },
    { name: "WEBEL, Govt. of West Bengal", logo: "https://iciss2024.in/webel_logo.jpg" },
    { name: "Springer", logo: "https://iciss2024.in/springer_logo.webp" },
  ];
  const sponsorData = [
    { name: "WEBEL, Govt. of West Bengal", logo: "https://iciss2024.in/webel_logo.jpg" },
    { name: "DST - SERB, Govt. of India", logo: "https://iciss2024.in/serb.png" },
    { name: "DRDO, Govt. of India", logo: "https://iciss2024.in/drdo_logo.png" },
  ];
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ConferenceDetails />
      <VenueSection />
      <AddressSection />
      {/* <PartnerGrid title="In Association with" partners={associationData} /> */}
      {/* <PartnerGrid title="Sponsored by" partners={sponsorData} /> */}
      <AboutIIESTSection />
      {/* <ConferenceInfoSection /> */}
      {/* <TimelineSection /> */}
      <Footer />
      <div className="max-w-5xl mx-auto py-20 px-6">

        

      </div>
    </div>
  );
}