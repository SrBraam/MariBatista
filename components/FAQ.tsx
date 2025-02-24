import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Quais são os pré-requisitos para participar dos cursos?",
    answer: (
      <span
        dangerouslySetInnerHTML={{
          __html: `
            Os pré-requisitos podem variar conforme o curso oferecido. Aqui estão algumas opções que você pode considerar e adaptar ao seu negócio: <br> <br>
            ✅ Nenhum pré-requisito específico – Para cursos introdutórios ou livres. <br> 
            ✅ Experiência profissional – Para cursos avançados voltados a líderes, gestores ou profissionais da área. <br> 
            ✅ Formação acadêmica – Para capacitações que exigem conhecimento prévio, como pós-graduação ou especializações. <br> 
            ✅ Acesso a tecnologia – Para cursos online, pode ser necessário um computador, internet estável e familiaridade com plataformas EAD.
          `,
        }}
      />
    ),
  },
  {
    question: "Como funciona o certificado digital?",
    answer: (
      <span
        dangerouslySetInnerHTML={{
          __html: `
            O certificado digital é um documento oficial emitido ao final do curso, garantindo que o participante concluiu a capacitação com êxito. Aqui está como ele funciona: <br> <br>
            ✅ Emissão Automática – Após a conclusão do curso e,  a aprovação na avaliação. <br> 
            ✅ Validade e Autenticidade – Contém nome do participante, carga horária, conteúdo programático e assinatura de Mari Batista. <br>
            ✅ Formato Digital – Enviado em PDF, podendo ser salvo, impresso e compartilhado no LinkedIn ou outras plataformas.
          `,
        }}
      />
    ),
  },
  {
    question: "Qual é a duração média dos cursos?",
    answer: (
      <span
        dangerouslySetInnerHTML={{
          __html: `
            ✅ Carga horária: 2 horas <br> 
            ✅ Formato: Online, com certificado digital ao final. <br> 
            ✅ Objetivo: Aprendizado rápido e prático sobre temas específicos.
          `,
        }}
      />
    ),
  },
  {
    question:
      "O que acontece se eu não conseguir concluir o curso dentro do prazo?",
    answer: (
      <span
        dangerouslySetInnerHTML={{
          __html: `
            ✅ Acesso flexível – O curso fica disponível para ser feito a qualquer momento, conforme sua conveniência. <br> 
            ✅ Certificação rápida – Após o treinamento poderá realizar a prova a qualquer momento. <br> 
            ✅ Sem prazo de conclusão – O participante pode concluir o curso no ritmo que preferir, sem pressa.
          `,
        }}
      />
    ),
  },
  {
    question: "Como posso entrar em contato com o suporte?",
    answer: (
      <span
        dangerouslySetInnerHTML={{
          __html: `
            ✅ Número de WhatsApp para Suporte - +55 (71) 9 8783-5827
          `,
        }}
      />
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-400">
            Tire suas dúvidas sobre nossos cursos e mentorias
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
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
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-[#D4AF37]/20 hover:border-[#1D1E22]/20 bg-transparent"
            >
              {/* Background Color Change on Hover */}
              <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              {/* Content */}
              <div className="relative z-10">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-300 group-hover:text-[#1D1E22]"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="text-lg font-semibold text-white group-hover:text-[#1D1E22]">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400 group-hover:text-[#1D1E22] transition-colors duration-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="http://wa.me/+5571987835827/"
            className="inline-block bg-[#D4AF37] text-[#1D1E22] px-8 py-4 rounded-lg hover:bg-[#D4AF37]/80 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
          >
            Fale com a Equipe
          </a>
        </motion.div>
      </div>
    </section>
  );
}