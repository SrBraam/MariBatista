import React from "react";
import { motion } from "framer-motion";
import { 
  Book, 
  Globe, 
  Cog as Yoga, 
  Palette, 
  Award, 
  Users, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Heart 
} from "lucide-react";

export default function Biography() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Mari Batista</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Publicitária, Pedagoga e Especialista em Transformação de Conhecimentos em Resultados Práticos
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-lg overflow-hidden shadow-lg group"
          >
            <img
              src="https://i.imgur.com/FR2A0b9.png"
              alt="Mari Batista"
              className="w-full h-auto rounded-lg object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>

          {/* Right Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-10"
          >
            {/* Experience Section */}
            <div className="flex items-center space-x-4">
              <Award className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-white">Experiência Profissional</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              Mari Batista, com mais de 10 anos de experiência em Marketing Digital, Gestão de Pessoas, Docência e EAD, conecta teoria e prática. Desenvolve treinamentos personalizados, impulsionando habilidades e resultados. Apaixonada por educação, faz MBA em Gestão Comercial, aprimorando estratégias para negócios e carreiras, transformando conhecimento em diferencial.
            </p>

            {/* Mission Section */}
            <div className="flex items-center space-x-4">
              <Target className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-white">Missão</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              Acreditamos em transformar conhecimento em resultados práticos. Capacitamos profissionais e equipes com treinamentos objetivos e personalizados, gerando impacto real. Focamos em competências técnicas, comportamentais e estratégicas, ajudando empresas e indivíduos a superar desafios e se destacar, proporcionando confiança, autonomia e propósito.
            </p>
            {/* Methodology Section */}
            <div className="flex items-center space-x-4">
              <Palette className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold text-white">Metodologia</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              Aprender é experimentar, aplicar e transformar. Mari Batista une metodologias ativas, aprendizado experiencial e tecnologia para criar treinamentos personalizados. Além de transmitir conhecimento, desenvolve habilidades práticas, engajamento e autonomia, garantindo que o aprendizado se converta em realizações concretas e resultados reais no dia a dia.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
