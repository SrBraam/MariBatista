import React from "react";
import { motion } from "framer-motion";
import { Users, Megaphone, GraduationCap, ClipboardList } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Gestão de Pessoas e Liderança",
    description:
      "Desenvolvimento de competências para líderes de equipes de forma eficiente e motivada.",
    features: [
      "Liderança Eficaz",
      "Desenvolvimento de Lideres",
      "Gestão de Equipes",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing Digital e Estratégias Comerciais",
    description:
      "Abordagem prática para alavancar negócios no ambiente digital e gerenciar leads com eficiência.",
    features: [
      "Marketing Digital",
      "Estratégias Comerciais",
      "Gestão de Leads",
    ],
  },
  {
    icon: GraduationCap,
    title: "Gestão Educacional",
    description:
      "Formação e capacitação para professores e gestores educacionais, com foco em metodologias ativas e tutoria EAD.",
    features: ["Gestão Educacional", "Metodologias Ativas", "Tutoria EAD"],
  },
  {
    icon: ClipboardList,
    title: "Planejamento e Coordenação de Projetos",
    description:
      "Estruturando processos e objetivos alinhados ao sucesso organizacional.",
    features: [
      "Gestão de Projetos",
      "Planejamento Estratégico",
      "Sucesso Organizacional",
    ],
  },
];

export default function Services() {
  return (
    <section className="py-24" id="solucoes">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Soluções que Transformam Carreiras
          </h2>
          <p className="text-lg text-gray-400">
            Metodologia comprovada por mais de 1000 profissionais transformados
          </p>
        </motion.div>
        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group relative bg-[#1D1E22] p-8 rounded-xl shadow-md hover:shadow-lg border border-[#D4AF37]/20 hover:border-[#1D1E22]/20 flex flex-col overflow-hidden transition-all duration-300"
              >
                {/* Background Color Change on Hover */}
                <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                {/* Icon Section */}
                <div className="relative z-10 w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1D1E22]/20 transition-colors">
                  <Icon className="w-8 h-8 text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300" />
                </div>
                {/* Title and Description */}
                <h3 className="relative z-10 text-xl font-bold mb-4 text-white group-hover:text-[#1D1E22] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="relative z-10 text-gray-300 mb-6 line-clamp-3 group-hover:text-[#1D1E22] transition-colors duration-300">
                  {service.description}
                </p>
                {/* Features List */}
                <ul className="relative z-10 space-y-3 mt-auto">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 group-hover:text-[#1D1E22] transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/inscricoes"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block text-[#1D1E22] px-8 py-4 rounded-lg hover:brightness-90 transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
            style={{
              background: "#D4AF37",
            }}
            tabIndex={0}
          >
            Faça sua Inscrição Agora →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}