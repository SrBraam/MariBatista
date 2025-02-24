import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, GraduationCap, Mic, Briefcase, Lightbulb, Megaphone, Handshake, Headphones, Smile } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Lecture {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  spots: number;
  image_url: string;
}

const iconMap = {
  "Marketing Digital": Megaphone,
  "Empregabilidade e Carreira": Briefcase,
  "Soft Skills": Smile,
  "Empreendedorismo e Inovação": Lightbulb,
  "Gestão de Pessoas": Users,
  "Oratória e Comunicação para Profissionais": Mic,
  "Atendimento ao Cliente e Experiência do Consumidor": Headphones,
  "Produtividade e Gestão do Tempo": Clock,
  "Vendas e Negociação": Handshake
};

export default function Lectures() {
  const [lectures, setLectures] = React.useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLectures = async () => {
      const { data, error } = await supabase.from("lectures").select("*");
      if (error) console.error("Error fetching lectures:", error);
      else setLectures(data || []);
      setIsLoading(false);
    };
    fetchLectures();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white">Carregando palestras...</p>
          </div>
        </div>
      </section>
    );
  }

  // If no lectures are loaded from the database, use these as fallback
  if (lectures.length === 0) {
    const defaultLectures: Lecture[] = [
      {
        id: "1",
        title: "Estratégia e Direcionamento para o Sucesso",
        date: "2025-04-15",
        time: "19:00 - 21:00",
        location: "Online",
        description: (
          <span
            dangerouslySetInnerHTML={{
              __html: `
                O crescimento profissional exige mais do que conhecimento – exige estratégia, foco e ação. Nossa mentoria personalizada ajuda profissionais e empresas a acelerarem resultados e superarem desafios com mais segurança e eficiência.
                <br> <br>
                Com mais de 10 anos de experiência em Educação, especialista em Marketing, Gestão de Pessoas, Docência e Liderança, Mari Batista combina teoria e prática para guiar você no melhor caminho para o seu desenvolvimento. <br> <br>

                <strong>Áreas de Atuação:</strong><br><br>

                ✅ <strong>Carreira e Empregabilidade –</strong> Estratégias para se destacar no mercado de trabalho. <br> 
                ✅ <strong>Gestão de Pessoas e Soft Skills –</strong> Desenvolvimento de habilidades interpessoais e liderança. <br> 
                ✅ <strong>Marketing Pessoal no LinkedIn –</strong> Como construir uma presença forte e estratégica na plataforma. <br><br> 

                Pronto para impulsionar sua carreira? descubra como a mentoria pode acelerar o seu sucesso!
              `,
            }}
          />
        ),
        spots: 100,
        image_url: "https://i.imgur.com/k2THxJS.jpeg",
      },
    ];
    setLectures(defaultLectures);
  }

  const topics = [
    {
      title: "Marketing Digital",
      description:
        "Estratégias para o Novo Mercado. Como construir uma presença digital forte e utilizar o marketing online para alavancar negócios e carreiras.",
    },
    {
      title: "Empregabilidade e Carreira",
      description:
        "Como Se Destacar no Mercado de Trabalho. Dicas práticas para jovens profissionais desenvolverem um perfil competitivo e conquistarem melhores oportunidades.",
    },
    {
      title: "Soft Skills",
      description:
        "As Habilidades que o Mercado Exige. Comunicação, inteligência emocional e trabalho em equipe como diferenciais para o sucesso profissional.",
    },
    {
      title: "Empreendedorismo e Inovação",
      description:
        "Transformando Ideias em Negócios. Os primeiros passos para empreender com segurança e criar negócios sustentáveis.",
    },
    {
      title: "Gestão de Pessoas",
      description:
        "Como Liderar e Engajar Equipes. Os pilares da liderança eficaz e estratégias para motivar equipes e aumentar a produtividade.",
    },
    {
      title: "Oratória e Comunicação para Profissionais",
      description:
        "Como falar com confiança, persuadir e se destacar em apresentações e reuniões.",
    },
    {
      title: "Atendimento ao Cliente e Experiência do Consumidor",
      description:
        "Boas práticas para encantar clientes e criar um diferencial competitivo através do atendimento.",
    },
    {
      title: "Produtividade e Gestão do Tempo",
      description:
        "Como Fazer Mais em Menos Tempo. Técnicas para organizar tarefas, definir prioridades e aumentar a eficiência no trabalho e nos estudos.",
    },
    {
      title: "Vendas e Negociação",
      description:
        "Como Fechar Negócios de Sucesso. Os segredos da persuasão, da escuta ativa e das estratégias comerciais que geram resultados.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Introductory Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Palestras Inspiradoras e Transformadoras
          </h2>
          <p className="text-gray-300 text-lg text-center mb-8">
            Nossas palestras são dinâmicas, envolventes e focadas no desenvolvimento de habilidades essenciais para o mercado de trabalho. Com duração de 1 a 1,5 hora, cada palestra é estruturada para gerar insights práticos, reflexões profundas e motivação para o crescimento profissional e pessoal.
          </p>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const Icon = iconMap[topic.title] || GraduationCap; // Default to GraduationCap if no icon matches
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
                  className="group relative bg-[#1D1E22] p-6 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 flex flex-col h-full min-h-[260px] overflow-hidden"
                >
                  {/* Background Color Change on Hover */}
                  <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 rounded-xl"></div>
                  {/* Icon Section */}
                  <div className="relative z-10 w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#1D1E22]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300" />
                  </div>
                  {/* Title and Description */}
                  <h3 className="relative z-10 text-xl font-bold mb-3 text-white group-hover:text-[#1D1E22] transition-colors duration-300 line-clamp-2">
                    {topic.title}
                  </h3>
                  <p className="relative z-10 text-gray-300 group-hover:text-[#1D1E22] transition-colors duration-300 text-sm flex-grow line-clamp-4">
                    {topic.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center space-y-4">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-semibold text-white"
            >
              📢 Quer levar uma{" "}
              <span className="text-[#D4AF37]">palestra inspiradora</span> para
              sua empresa, escola ou evento?
            </motion.p>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300 text-lg"
            >
              Entre em contato e descubra como podemos criar uma experiência
              transformadora para o seu público!
            </motion.p>
            <motion.a
              href="http://wa.me/5571987835827"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-xl hover:bg-[#D4AF37] hover:text-[#1D1E22] transition-all duration-300 font-semibold"
            >
              <span>Entre em Contato</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}