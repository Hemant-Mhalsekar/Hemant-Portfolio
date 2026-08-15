import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#15180F] border-t border-[#39471F]/40 py-12 md:py-16 w-full">
      <div className="container-max px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center gap-6">
        
        {/* Name */}
        <h2 
          className="text-[#F1ECDD] font-bold text-[22px]"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Hemant
        </h2>

        {/* Links Row */}
        <div 
          className="flex flex-wrap items-center justify-center gap-3 text-[#CBD3B8] text-[13px]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <a 
            href="https://github.com/Hemant-Mhalsekar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#DE9F2E] transition-colors duration-200"
          >
            GitHub
          </a>
          <span className="opacity-40">·</span>
          <a 
            href="https://www.linkedin.com/in/hemant-mhalsekar-464a50244/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#DE9F2E] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <span className="opacity-40">·</span>
          <a 
            href="mailto:hemantmhalsekar1@gmail.com" 
            className="hover:text-[#DE9F2E] transition-colors duration-200"
          >
            Email
          </a>
          <span className="opacity-40">·</span>
          <a 
            href="/resume.pdf" 
            download
            className="hover:text-[#DE9F2E] transition-colors duration-200"
          >
            Resume
          </a>
        </div>

        {/* Bottom Line */}
        <p 
          className="text-[#CBD3B8] opacity-50 text-[12px] mt-2 max-w-md"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Designed and built by Hemant. No templates were harmed in the making of this website.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
