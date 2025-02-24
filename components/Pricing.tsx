import React from "react";
import { motion } from "framer-motion";
import { Star, Rocket, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    icon: Star,
    name: "Carreira Inicial",
    price: "R$ 50,00",
    originalPrice: "R$ 65,00",
    description: "Comece sua jornada de transformação profissional",
    features: [
      "1 curso estratégico",
      "Acesso vitalício",
      "Certificados digitais",
    ],
    popular: false,
  },
  {
    icon: Rocket,
    name: "Acelerar Profissão",
    price: "R$ 135,00",
    originalPrice: "R$ 150,00",
    description: "(R$ 45,00 por curso – 10% de desconto)",
    features: [
      "3 cursos estratégicos",
      "Acesso vitalício",
      "Certificados digitais",
    ],
    popular: true,
  },
  {
    icon: Crown,
    name: "Transformação Total",
    price: "R$ 340,00",
    originalPrice: "R$ 400,00",
    description: "(R$ 42,50 por curso – 15% de desconto)",
    features: [
      "8 cursos estratégicos",
      "Acesso vitalício",
      "Certificados digitais",
    ],
    popular: false,
  },
  {
    icon: Sparkles,
    name: "Corporativo",
    price: "R$ 600,00",
    originalPrice: "R$ 750,00 ",
    description: "(R$ 40,00 por curso – 20% de desconto)",
    features: [
      "15 cursos estratégicos",
      "Acesso vitalício",
      "Certificados digitais",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24" id="planos">
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
            Invista em Seu Futuro
          </h2>
          <p className="text-lg text-gray-400">
            Escolha o plano ideal para acelerar sua carreira
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className={`group relative rounded-xl p-8 flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${plan.popular ? "border-2 border-[#D4AF37]" : "bg-[#1D1E22] border border-[#D4AF37]/20 hover:border-[#1D1E22]/20"}`}
              >
                {/* Background Color Change on Hover */}
                <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 bg-[#D4AF37] text-[#1D1E22] group-hover:bg-[#1D1E22] group-hover:text-[#D4AF37]">
                      Mais Popular
                    </div>
                  )}
                  {/* Icon Section */}
                  <div className="relative z-10 w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1D1E22]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300" />
                  </div>
                  {/* Title and Price */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#1D1E22] transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-sm text-[#D4AF37] line-through ml-2 group-hover:text-[#1D1E22] transition-colors duration-300">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  {/* Description */}
                  <p className="text-gray-300 mb-6 line-clamp-3 group-hover:text-[#1D1E22] transition-colors duration-300">
                    {plan.description}
                  </p>
                  {/* Features List */}
                  <ul className="space-y-3 mt-auto">
                    {plan.features.map((feature, idx) => (
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
                  {/* Button */}
                  <a 
                    href="/inscricoes" 
                    className="mt-6 w-full py-3 px-4 font-semibold rounded-lg text-center transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 group-hover:bg-[#1D1E22] group-hover:text-[#D4AF37] bg-[#D4AF37] text-[#1D1E22]"
                  >
                    Comece Agora
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}