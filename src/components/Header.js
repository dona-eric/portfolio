// src/components/Header.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Menu burger

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Accueil", path: "/" },
    { label: "À propos", path: "/about" },
    { label: "Projets", path: "/projects" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo / Nom */}
        <h1 className="text-2xl font-bold">Éric KOULODJI</h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6">
          {links.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `transition-colors duration-300 font-medium ${
                  isActive ? "text-purple-400" : "text-gray-300 hover:text-purple-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden bg-slate-800 px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              onClick={() => setIsOpen(false)} // ferme le menu au clic
              className={({ isActive }) =>
                `transition-colors duration-300 font-medium ${
                  isActive ? "text-purple-400" : "text-gray-300 hover:text-purple-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
