import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#15180F] w-full px-6 sm:px-10 lg:px-16 pb-8 pt-4">
      <div className="container-max">
        <p 
          className="text-[#CBD3B8] opacity-60 text-[12px] text-center lg:text-left"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Designed and built by Hemant. No templates were harmed in the making of this website.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
