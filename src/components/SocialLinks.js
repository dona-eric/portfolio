import React from "react";
import { Github, Mail, Linkedin, MessageCircle } from "lucide-react";

function SocialLinks() {
  const links = [
    { Icon: Github, href: "https://github.com/dona-eric", label: "GitHub" },
    { Icon: Mail, href: "mailto:donaerickoulodji@gmail.com", label: "Email" },
    { Icon: MessageCircle, href: "https://wa.me/2290151344289", label: "WhatsApp" },
    { Icon: Linkedin, href: "https://linkedin.com/in/dona-erick", label: "LinkedIn" },
  ];

  return (
    <div className="flex gap-4">
      {links.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <Icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors duration-300" />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
