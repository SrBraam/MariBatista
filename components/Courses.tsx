import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  price: number;
  image_url: string;
}

const courseImages = {
  "Liderança Eficaz": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "Gestão de Equipes": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "Marketing Digital": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "Estratégias Comerciais": "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "Gestão Educacional": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "Metodologias Ativas": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "Gestão de Projetos": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "Desenvolvimento de Líderes": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
};

export default function Courses({ viewMode = "slider" }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("title");

      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        const updatedCourses = data?.map(course => ({
          ...course,
          image_url: courseImages[course.title] || course.image_url
        })) || [];
        setCourses(updatedCourses);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden" id="cursos">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-white">Carregando cursos...</p>
        </div>
      </section>
    );
  }

  const cardWidth = windowWidth > 1024 ? 350 : 300;
  const dragLimit = -(courses.length - 1) * cardWidth + cardWidth - 32;

  if (viewMode === "blocks") {
    return (
      <section className="py-24 relative overflow-hidden" id="cursos">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Treinamentos Transformadores
            </h2>
            <p className="text-lg text-gray-400">
              Desenvolvidos para impulsionar sua carreira ao próximo nível
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group relative min-w-[300px] lg:min-w-[350px] bg-[#1D1E22] rounded-xl shadow-md hover:shadow-lg border border-yellow-500/20 hover:border-[#1D1E22]/20 flex flex-col overflow-hidden transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1D1E22]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative mb-4 overflow-hidden rounded-t-xl">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500 group-hover:scale-100"
                  />
                  <div className="absolute bottom-0 left-0 bg-[#D4AF37] text-[#1D1E22] px-4 py-1 rounded-tr-lg font-medium group-hover:bg-[#1D1E22] group-hover:text-[#D4AF37] transition-colors duration-500">
                    <span className="text-sm">
                      {course.duration} • {course.format}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#1D1E22] transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-3 group-hover:text-[#1D1E22] transition-colors duration-300">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[#D4AF37] font-bold group-hover:text-[#1D1E22] transition-colors duration-300">
                      {`R$ ${course.price.toFixed(2)}`}
                    </span>
                    <motion.a
                      href="/inscricoes"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#D4AF37] text-[#1D1E22] px-6 py-2 rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 group-hover:bg-[#1D1E22] group-hover:text-[#D4AF37]"
                    >
                      Matricule-se
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
              className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#1D1E22] rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
            >
              <span>Faça sua Inscrição Agora →</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden" id="cursos">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Treinamentos Transformadores
          </h2>
          <p className="text-lg text-gray-400">
            Desenvolvidos para impulsionar sua carreira ao próximo nível
          </p>
        </motion.div>

        <motion.div
          className="flex gap-8 pb-8 overflow-x-hidden scrollbar-hide snap-x snap-mandatory px-4"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: dragLimit }}
            dragElastic={0.1}
            className="flex gap-8 cursor-grab"
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group relative min-w-[300px] lg:min-w-[350px] bg-[#1D1E22] rounded-xl shadow-md hover:shadow-lg border border-yellow-500/20 hover:border-[#1D1E22]/20 flex flex-col overflow-hidden transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1D1E22]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative mb-4 overflow-hidden rounded-t-xl">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500 group-hover:scale-100"
                  />
                  <div className="absolute bottom-0 left-0 bg-[#D4AF37] text-[#1D1E22] px-4 py-1 rounded-tr-lg font-medium group-hover:bg-[#1D1E22] group-hover:text-[#D4AF37] transition-colors duration-500">
                    <span className="text-sm">
                      {course.duration} • {course.format}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#1D1E22] transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-3 group-hover:text-[#1D1E22] transition-colors duration-300">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[#D4AF37] font-bold group-hover:text-[#1D1E22] transition-colors duration-300">
                      {`R$ ${course.price.toFixed(2)}`}
                    </span>
                    <motion.a
                      href="/inscricoes"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#D4AF37] text-[#1D1E22] px-6 py-2 rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 group-hover:bg-[#1D1E22] group-hover:text-[#D4AF37]"
                    >
                      Matricule-se
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/treinamentos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#1D1E22] rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
          >
            <span>Explorar Todos os Treinamentos</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
