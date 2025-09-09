import React from "react";
import SocialLinks from "./SocialLinks";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-8 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-4">
      <SocialLinks />
      <p className="text-sm text-center lg:text-right">
        © 2025 Éric KOULODJI - Data Scientist & Machine Learning Engineer
      </p>
    </footer>
  );
}

export default Footer;
