import React from "react";
import { motion } from "framer-motion";
import { Quote, BookOpen } from "lucide-react";

const testimonials = [
  {
    name: "Carla Mendes",
    role: "Consultora de Vendas",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    text: "Sempre achei que precisava de anos de experiência para me destacar na minha área. Mari Batista mudou completamente minha visão! Em poucas horas, aprendi estratégias que apliquei e consegui ter reconhecimento no trabalho!",
    featured: true,
    size: "small",
  },
  {
    name: "Rafael Souza",
    role: "Analista Comercial",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    text: "Já fiz vários cursos online, mas nenhum me trouxe tanto resultado em tão pouco tempo como esse. O conteúdo é direto ao ponto e aplicável. Depois do curso, fechei minha primeira grande venda usando técnicas que aprendi aqui!",
    size: "small",
  },
  {
    name: "Fernanda Oliveira",
    role: "Empreendedora",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    text: "Antes do curso, eu tinha muitas inseguranças sobre como me posicionar no mercado. Agora, me sinto muito mais confiante para vender meus serviços e me comunicar com clientes. A Mari ensina de um jeito leve e envolvente.",
    size: "small",
  },
  {
    name: "Lucas Martins",
    role: "Estudante e futuro profissional",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rgb-1.2.1&auto=format&fit=crop&w=500&q=80",
    text: "Sempre tive medo de entrar no mercado de trabalho sem experiência. O curso me mostrou que o mais importante é ter as estratégias certas. Agora sei como me destacar nas entrevistas e já até recebi propostas para estágio!",
    featured: true,
    size: "small",
  },
  {
    name: "Camila Batista",
    role: "Gestora Comercial",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rgb-1.2.1&auto=format&fit=crop&w=500&q=80",
    text: "A palestra da Mari Batista foi transformadora! Com uma abordagem dinâmica e conteúdo altamente relevante, ela conseguiu prender a atenção do público do início ao fim. Saímos não apenas motivados, mas com insights.",
    featured: true,
    size: "small",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24" id="depoimentos">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-lg text-gray-400">
            Depoimentos de profissionais que transformaram suas carreiras
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {testimonials.map((testimonial, index) => {
            const isLarge = testimonial.size === "large";
            const isMedium = testimonial.size === "medium";
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
                className={`group relative bg-[#1D1E22] p-6 rounded-xl shadow-md hover:shadow-lg border border-[#D4AF37]/20 hover:border-[#1D1E22]/20 flex flex-col overflow-hidden transition-all duration-300
                  ${isLarge ? "lg:col-span-2 lg:row-span-2" : ""}
                  ${isMedium ? "lg:col-span-2" : ""}`}
              >
                <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-[#D4AF37] mb-4 opacity-50 group-hover:text-[#1D1E22] group-hover:opacity-100 transition-all duration-300" />
                  <p
                    className={`text-gray-300 mb-6 group-hover:text-[#1D1E22] transition-all duration-300
                    ${isLarge ? "text-lg" : "text-base"}
                    line-clamp-8`}
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div className="mt-auto flex items-center">
                    <div className="relative w-12 h-12">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover border-2 border-[#D4AF37]/50 group-hover:border-[#1D1E22]/20 transition-colors"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#1D1E22] transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-400 group-hover:text-[#1D1E22] transition-colors">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {/* Card para redirecionar para a página de palestras */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: testimonials.length * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="group relative bg-[#D4AF37] p-6 rounded-xl shadow-md hover:shadow-lg border border-[#1D1E22]/20 hover:border-[#D4AF37]/20 flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
            onClick={() => (window.location.href = "/palestras")}
          >
            <div className="absolute inset-0 bg-[#1D1E22] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
              <BookOpen className="w-12 h-12 text-[#1D1E22] mb-4 opacity-50 group-hover:text-[#D4AF37] group-hover:opacity-100 transition-all duration-300" />
              <h3 className="text-xl font-bold text-[#1D1E22] group-hover:text-[#D4AF37] transition-colors">
                Confira nossas Palestras
              </h3>
              <p className="text-[#1D1E22] group-hover:text-[#D4AF37] transition-colors mt-2">
                Descubra insights valiosos e aprendizados práticos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}