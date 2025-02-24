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

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  price: number;
  image_url: string;
}

export default function Courses() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentCourse, setCurrentCourse] = React.useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } else {
      setCourses(data || []);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const courseData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      duration: formData.get("duration") as string,
      format: formData.get("format") as string,
      price: parseFloat(formData.get("price") as string),
      image_url: formData.get("image_url") as string,
    };

    try {
      if (isEditing && currentCourse) {
        const { error } = await supabase
          .from("courses")
          .update(courseData)
          .eq("id", currentCourse.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("courses").insert([courseData]);
        if (error) throw error;
      }
      await fetchCourses();
      setIsEditing(false);
      setCurrentCourse(null);
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      try {
        const { error } = await supabase.from("courses").delete().eq("id", id);
        if (error) throw error;
        await fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium text-white tracking-tight">Cursos</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-[#D4AF37] hover:bg-[#C09B30] text-[#1D1E22] font-medium px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentCourse(null);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="bg-[#1D1E22] text-white border border-[#D4AF37]/20 rounded-md max-w-md p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-white tracking-tight">
                {isEditing ? "Editar Curso" : "Novo Curso"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Título
                </label>
                <Input
                  name="title"
                  placeholder="Título do curso"
                  defaultValue={currentCourse?.title}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Descrição
                </label>
                <Textarea
                  name="description"
                  placeholder="Descrição"
                  defaultValue={currentCourse?.description}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md resize-none h-16 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Duração
                </label>
                <Input
                  name="duration"
                  placeholder="Duração"
                  defaultValue={currentCourse?.duration}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Formato
                </label>
                <Input
                  name="format"
                  placeholder="Formato"
                  defaultValue={currentCourse?.format}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Preço (R$)
                </label>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Preço"
                  defaultValue={currentCourse?.price}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  URL da Imagem
                </label>
                <Input
                  name="image_url"
                  placeholder="URL da imagem"
                  defaultValue={currentCourse?.image_url}
                  required
                  className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] rounded-md text-sm"
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
              <div className="flex justify-between">
                <div className="h-4 bg-[#2F3036] rounded w-1/4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-[#2F3036] rounded-md"></div>
                  <div className="h-8 w-8 bg-[#2F3036] rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center text-gray-300 py-6 text-sm">
          Nenhum curso disponível
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-[#1D1E22] rounded-md border border-[#D4AF37]/20 p-4"
              whileHover={{ y: -2, borderColor: "rgba(212, 175, 55, 0.4)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
              />
              <h3 className="text-base font-medium text-white line-clamp-1">
                {course.title}
              </h3>
              <p className="text-gray-300 text-xs line-clamp-2 mb-3">
                {course.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#D4AF37] font-medium text-sm">
                  R$ {course.price.toFixed(2)}
                </span>
                <div className="flex space-x-1">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentCourse(course);
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
                      onClick={() => handleDelete(course.id)}
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