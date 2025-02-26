import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Handler to close menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 z-0 bg-[#1D1E22]"></div>
      <nav className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between h-20"
        >
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              {/* Replace "MB" with the logo image */}
              <img
                src="https://i.imgur.com/OumiXA3.png"
                alt="Logo"
                className="h-12 w-auto" // Adjust size as needed
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/biografia"
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
            >
              Biografia
            </Link>
            <Link
              to="/treinamentos"
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
            >
              Treinamentos
            </Link>
            <Link
              to="/inscricoes"
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
            >
              Inscrições
            </Link>
            <Link
              to="/palestras"
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
            >
              Palestras
            </Link>
            <Link
              to="/publicacoes"
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
            >
              Publicações
            </Link>
            <a
              href="https://wa.me/+5571987835827"
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
            >
              Fale Conosco
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </motion.div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden mt-4"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/biografia"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Biografia
              </Link>
              <Link
                to="/treinamentos"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Treinamentos
              </Link>
              <Link
                to="/inscricoes"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Inscrições
              </Link>
              <Link
                to="/palestras"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Palestras
              </Link>
              <Link
                to="/publicacoes"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Publicações
              </Link>
              <a
                href="https://wa.me/+5571987835827"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
