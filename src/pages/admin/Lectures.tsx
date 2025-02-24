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

export default function Lectures() {
  const [lectures, setLectures] = React.useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentLecture, setCurrentLecture] = React.useState<Lecture | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const fetchLectures = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("lectures").select("*");
    if (error) {
      console.error("Error fetching lectures:", error);
      setLectures([]);
    } else {
      setLectures(data || []);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchLectures();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const lectureData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      spots: parseInt(formData.get("spots") as string),
      image_url: formData.get("image_url") as string,
    };

    try {
      if (isEditing && currentLecture) {
        const { error } = await supabase
          .from("lectures")
          .update(lectureData)
          .eq("id", currentLecture.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("lectures").insert([lectureData]);
        if (error) throw error;
      }
      await fetchLectures();
      setIsEditing(false);
      setCurrentLecture(null);
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving lecture:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta palestra?")) {
      try {
        const { error } = await supabase.from("lectures").delete().eq("id", id);
        if (error) throw error;
        await fetchLectures();
      } catch (error) {
        console.error("Error deleting lecture:", error);
      }
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium text-white tracking-tight">Palestras</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-[#D4AF37] hover:bg-[#C09B30] text-[#1D1E22] font-medium px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentLecture(null);
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
                {isEditing ? "Editar Palestra" : "Nova Palestra"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Título
                </label>
                <Input
                  name="title"
                  placeholder="Título da palestra"
                  defaultValue={currentLecture?.title}
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
                  defaultValue={currentLecture?.description}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md resize-none h-16 text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Data
                </label>
                <Input
                  name="date"
                  type="date"
                  defaultValue={currentLecture?.date}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Horário
                </label>
                <Input
                  name="time"
                  type="time"
                  defaultValue={currentLecture?.time}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Local
                </label>
                <Input
                  name="location"
                  placeholder="Local"
                  defaultValue={currentLecture?.location}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Vagas
                </label>
                <Input
                  name="spots"
                  type="number"
                  placeholder="Número de vagas"
                  defaultValue={currentLecture?.spots}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  URL da Imagem
                </label>
                <Input
                  name="image_url"
                  placeholder="URL da imagem"
                  defaultValue={currentLecture?.image_url}
                  required
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
              <div className="h-4 bg-[#2F3036] rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-[#2F3036] rounded w-full mb-3"></div>
              <div className="space-y-2 mb-3">
                <div className="h-3 bg-[#2F3036] rounded w-1/2"></div>
                <div className="h-3 bg-[#2F3036] rounded w-1/3"></div>
                <div className="h-3 bg-[#2F3036] rounded w-2/3"></div>
              </div>
              <div className="flex justify-end space-x-2">
                <div className="h-8 w-8 bg-[#2F3036] rounded-md"></div>
                <div className="h-8 w-8 bg-[#2F3036] rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : lectures.length === 0 ? (
        <div className="text-center text-gray-300 py-6 text-sm">
          Nenhuma palestra disponível
        </div>
      ) : (
        /* Lectures Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lectures.map((lecture) => (
            <motion.div
              key={lecture.id}
              className="bg-[#1D1E22] rounded-md border border-[#D4AF37]/20 p-4"
              whileHover={{ y: -2, borderColor: "rgba(212, 175, 55, 0.4)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <img
                src={lecture.image_url}
                alt={lecture.title}
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
              />
              <h3 className="text-base font-medium text-white line-clamp-1">
                {lecture.title}
              </h3>
              <p className="text-gray-300 text-xs line-clamp-2 mb-3">
                {lecture.description}
              </p>
              <div className="space-y-1 mb-3 text-gray-300 text-xs">
                <p>Data: {lecture.date}</p>
                <p>Horário: {lecture.time}</p>
                <p>Local: {lecture.location}</p>
                <p>Vagas: {lecture.spots}</p>
              </div>
              <div className="flex justify-end space-x-1">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentLecture(lecture);
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
                    onClick={() => handleDelete(lecture.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md p-2 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}