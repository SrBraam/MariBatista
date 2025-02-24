import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative">
      {/* Background Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-96 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2"
      >
        {/* Updated Hero Image */}
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-cover"
          src="https://i.imgur.com/bBTj7jE.png" // New hero image URL
          alt="Equipe diversa em reunião estratégica"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent mix-blend-multiply"></div>
      </motion.div>

      {/* Content Section */}
      <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight"
          >
            Transformando Vidas em Conexões de Sucesso
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-400"
          >
            Mentoria, Consultoria e Palestras para contribuições em carreiras e negócios.
            Criando oportunidades e aprimorando habilidades para o sucesso profissional.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-8 flex gap-4"
          >
            {/* Explorar Cursos Button */}
            <a
              href="#cursos"
              className="inline-flex items-center rounded-md px-8 py-4 text-lg font-semibold text-[#1D1E22] shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
              style={{
                background: "#D4AF37",
              }}
            >
              Explorar Treinamentos
            </a>

            {/* Saiba Mais Button */}
            <a
              href="/biografia"
              className="inline-flex items-center rounded-md border-2 border-[#D4AF37] px-8 py-4 text-lg font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1D1E22] shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
            >
              Saiba Mais
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}