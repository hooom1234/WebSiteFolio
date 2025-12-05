import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterComponent = () => {
  return (
    <div className="notranslate mt-5 text-3xl font-bold">
      <Typewriter
        options={{
          strings: ["Cybersecurity", "Frontend", "Backend", "Fullstack"],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TypewriterComponent;
