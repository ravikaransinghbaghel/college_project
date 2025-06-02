// import React from 'react';
import React, { useRef } from "react";

function About() {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <h1>Welcome to My Page</h1>

      <button onClick={scrollToAbout} className="bg-red-500">Go to About Section</button>
      <button onClick={scrollToContact} className="bg-pink-700">Go to Contact Section</button>

      <div style={{ height: "1000px" }}></div>

      <div
        ref={aboutRef}
        style={{ height: "200px", background: "#add8e6", padding: "20px" }}
      >
        <h2>About Us</h2>
        <p>This is the About section of the page.</p>
      </div>

      <div style={{ height: "1000px" }}></div>

      <div
        ref={contactRef}
        style={{ height: "200px", background: "#90ee90", padding: "20px" }}
      >
        <h2>Contact Us</h2>
        <p>This is the Contact section of the page.</p>
      </div>
    </div>
  );


}

export default About;
