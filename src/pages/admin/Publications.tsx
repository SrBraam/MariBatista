import React from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { motion } from "framer-motion";

interface Publication {
  id: string;
  title: string;
  type: string;
  description: string;
  content: string;
  image_url: string;
  link: string;
}

export default function AdminPublications() {
  const [publications, setPublications] = React.useState<Publication[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPublication, setCurrentPublication] =
    React.useState<Publication | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const fetchPublications = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching publications:", error);
      setPublications([]);
    } else {
      setPublications(data || []);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchPublications();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const publicationData = {
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      image_url: formData.get("image_url") as string,
      link: formData.get("link") as string || null,
      created_at: new Date().toISOString(),
    };

    try {
      if (isEditing && currentPublication) {
        const { error } = await supabase
          .from("publications")
          .update(publicationData)
          .eq("id", currentPublication.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("publications")
          .insert([publicationData]);
        if (error) throw error;
      }
      await fetchPublications();
      setIsEditing(false);
      setCurrentPublication(null);
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving publication:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta publicação?")) {
      try {
        const { error } = await supabase
          .from("publications")
          .delete()
          .eq("id", id);
        if (error) throw error;
        await fetchPublications();
      } catch (error) {
        console.error("Error deleting publication:", error);
      }
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium text-white tracking-tight">
          Publicações
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-[#D4AF37] hover:bg-[#C09B30] text-[#1D1E22] font-medium px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentPublication(null);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="bg-[#1D1E22] text-white border border-[#D4AF37]/20 rounded-md max-w-md p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-white tracking-tight">
                {isEditing ? "Editar Publicação" : "Nova Publicação"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Título
                </label>
                <Input
                  name="title"
                  placeholder="Título da publicação"
                  defaultValue={currentPublication?.title}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Tipo
                </label>
                <Input
                  name="type"
                  placeholder="Ex: Artigo, E-book"
                  defaultValue={currentPublication?.type}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Descrição
                </label>
                <Textarea
                  name="description"
                  placeholder="Descrição"
                  defaultValue={currentPublication?.description}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md resize-none h-16 text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Conteúdo
                </label>
                <Textarea
                  name="content"
                  placeholder="Conteúdo"
                  defaultValue={currentPublication?.content}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md resize-none h-16 text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  URL da Imagem
                </label>
                <Input
                  name="image_url"
                  placeholder="URL da imagem"
                  defaultValue={currentPublication?.image_url}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Link (opcional)
                </label>
                <Input
                  name="link"
                  placeholder="Link externo"
                  defaultValue={currentPublication?.link}
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDialogOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-[#2F3036] rounded-md px-3 py-1.5 border border-[#1D1E22] transition-colors duration-200"
                  >
                    Cancelar
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#C09B30] text-[#1D1E22] font-medium rounded-md px-4 py-2 shadow-sm transition-colors duration-200"
                  >
                    {isEditing ? "Salvar" : "Criar"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1D1E22] rounded-md border border-[#D4AF37]/20 p-4 animate-pulse"
            >
              <div className="w-full h-32 bg-[#2F3036] rounded-md mb-3"></div>
              <div className="h-3 bg-[#2F3036] rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-[#2F3036] rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-[#2F3036] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : publications.length === 0 ? (
        <div className="text-center text-gray-300 py-6 text-sm">
          Nenhuma publicação disponível
        </div>
      ) : (
        /* Publications Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publications.map((publication) => (
            <motion.div
              key={publication.id}
              className="bg-[#1D1E22] rounded-md border border-[#D4AF37]/20 p-4"
              whileHover={{ y: -2, borderColor: "rgba(212, 175, 55, 0.4)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <img
                src={publication.image_url}
                alt={publication.title}
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
              />
              <div className="space-y-1.5">
                <span className="inline-block bg-[#D4AF37] text-[#1D1E22] text-xs font-medium px-1.5 py-0.5 rounded-md">
                  {publication.type}
                </span>
                <h3 className="text-base font-medium text-white line-clamp-1">
                  {publication.title}
                </h3>
                <p className="text-gray-300 text-xs line-clamp-2">
                  {publication.description}
                </p>
                <div className="flex justify-end space-x-1 pt-1">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentPublication(publication);
                        setIsEditing(true);
                        setDialogOpen(true);
                      }}
                      className="text-[#D4AF37] hover:text-[#C09B30] hover:bg-[#D4AF37]/10 rounded-md p-2 transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(publication.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md p-2 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
