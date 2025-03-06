import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Publication {
  id: string;
  title: string;
  type: string;
  description: string;
  content: string;
  image_url: string;
  link: string;
  created_at: string; // Add this field
}

export default function Publications() {
  const [publications, setPublications] = React.useState<Publication[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPublications = async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order('created_at', { ascending: false }); // Add this line to sort by creation date

      if (error) console.error("Error fetching publications:", error);
      else setPublications(data || []);
      setIsLoading(false);
    };
    fetchPublications();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Publicações</h1>
          <p className="text-lg text-gray-300">
            Conteúdo especializado para impulsionar sua carreira
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[#1D1E22] rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pub.image_url}
                  alt={pub.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1E22] to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#1D1E22] px-3 py-1 rounded-full text-sm font-semibold">
                  {pub.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                  {pub.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 flex-grow line-clamp-3">
                  {pub.description}
                </p>

                {/* Link */}
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-[#D4AF37] hover:text-[#C09B30] transition-colors duration-300 mt-4"
                >
                  <span>Ler mais</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
