import React from "react";
import { motion } from "framer-motion";

export default function Terms() {
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
            Termos de Serviço
          </h1>
          <div className="text-gray-300 space-y-6">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar este site, você aceita e concorda em cumprir
              estes termos e condições de uso. Se você não concordar com
              qualquer parte destes termos, não deverá usar nosso site.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              2. Serviços Oferecidos
            </h2>
            <p>
              Oferecemos cursos, treinamentos e consultorias na área de
              desenvolvimento profissional. Todos os serviços estão sujeitos à
              disponibilidade e podem ser modificados ou descontinuados sem
              aviso prévio.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              3. Pagamentos
            </h2>
            <p>
              Os pagamentos são processados de forma segura através de pix. Sendo a chave de e-mail: <strong>maribatista.treinamentos@gmail.com</strong>
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              4. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo disponibilizado em nossos cursos e site é
              protegido por direitos autorais. Não é permitida a reprodução,
              distribuição ou modificação sem autorização prévia.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              5. Responsabilidades
            </h2>
            <p>
              Nos esforçamos para manter as informações precisas e atualizadas,
              mas não nos responsabilizamos por eventuais erros ou omissões. O
              uso dos nossos serviços é de sua inteira responsabilidade.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              6. Alterações nos Termos
            </h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento. As alterações entram em vigor imediatamente após sua
              publicação no site.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
