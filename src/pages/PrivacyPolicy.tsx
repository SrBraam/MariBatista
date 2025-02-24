import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg prose-invert mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8">
            Política de Privacidade
          </h1>
          <div className="text-gray-300 space-y-6">
            <p>
              A sua privacidade é importante para nós. É política da <strong>Mari Batista - Treinamentos e Desenvolvimento Profissional</strong> respeitar a sua privacidade em relação a qualquer
              informação sua que possamos coletar em nosso site.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Informações que coletamos
            </h2>
            <p>
              Coletamos informações quando você se registra em nossos cursos, se
              inscreve em nossa newsletter ou preenche algum formulário em nosso
              site. As informações coletadas incluem seu nome, e-mail e número
              de telefone.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Como usamos suas informações
            </h2>
            <p>Utilizamos as informações que coletamos para:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Personalizar sua experiência</li>
              <li>Melhorar nosso site</li>
              <li>Enviar e-mails periódicos</li>
              <li>Processar transações</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
