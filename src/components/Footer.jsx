import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#15180F] border-t border-[#39471F]/40 py-12 md:py-16 w-full">
      <div className="container-max px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2">
          <h2 
            className="text-[#F1ECDD] font-bold text-[22px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Hemant Mhalsekar
          </h2>
          <p
            className="text-[#CBD3B8] opacity-60 text-[12px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Built with React, coffee, and mild sleep deprivation.
          </p>
        </div>

        {/* Bottom Line */}
        <p 
          className="text-[#CBD3B8] opacity-50 text-[12px] mt-2 max-w-md"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Designed and built by me. No templates were harmed in the making of this website.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
