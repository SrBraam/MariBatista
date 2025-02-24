import React from "react";
import { Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";
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

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  company: string;
  notes: string;
  avatar_url: string;
}

export default function Clients() {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentClient, setCurrentClient] = React.useState<Client | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const fetchClients = async () => {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) console.error("Error fetching clients:", error);
    else setClients(data || []);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const clientData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      profession: formData.get("profession"),
      company: formData.get("company"),
      notes: formData.get("notes"),
      avatar_url:
        formData.get("avatar_url") ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.get("name")}`,
    };

    if (isEditing && currentClient) {
      const { error } = await supabase
        .from("clients")
        .update(clientData)
        .eq("id", currentClient.id);

      if (error) console.error("Error updating client:", error);
    } else {
      const { error } = await supabase.from("clients").insert([clientData]);

      if (error) console.error("Error creating client:", error);
    }

    fetchClients();
    setIsEditing(false);
    setCurrentClient(null);
    setDialogOpen(false);
    form.reset();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      const { error } = await supabase.from("clients").delete().eq("id", id);

      if (error) console.error("Error deleting client:", error);
      else fetchClients();
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Clientes</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[#D4AF37] hover:bg-[#C09B30] text-[#1D1E22] font-medium px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
              onClick={() => {
                setIsEditing(false);
                setCurrentClient(null);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1D1E22] text-white border border-[#D4AF37]/20 rounded-md">
            <DialogHeader>
              <DialogTitle className="text-white">
                {isEditing ? "Editar Cliente" : "Novo Cliente"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Nome completo"
                defaultValue={currentClient?.name}
                required
                className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] placeholder-gray-400 rounded-md"
              />
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                defaultValue={currentClient?.email}
                required
                className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] placeholder-gray-400 rounded-md"
              />
              <Input
                name="phone"
                placeholder="Telefone"
                defaultValue={currentClient?.phone}
                required
                className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] placeholder-gray-400 rounded-md"
              />
              <Input
                name="profession"
                placeholder="Profissão"
                defaultValue={currentClient?.profession}
                required
                className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] placeholder-gray-400 rounded-md"
              />
              <Input
                name="company"
                placeholder="Empresa"
                defaultValue={currentClient?.company}
                className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] placeholder-gray-400 rounded-md"
              />
              <Textarea
                name="notes"
                placeholder="Observações"
                defaultValue={currentClient?.notes}
                className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] placeholder-gray-400 rounded-md"
              />
              <Input
                name="avatar_url"
                placeholder="URL do avatar (opcional)"
                defaultValue={currentClient?.avatar_url}
                className="bg-[#2F3036] border-[#1D1E22] text-white focus:border-[#D4AF37] placeholder-gray-400 rounded-md"
              />
              <Button
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#C09B30] text-[#1D1E22] font-medium rounded-md"
              >
                {isEditing ? "Salvar" : "Criar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-gray-300">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-[#1D1E22] p-6 rounded-lg border border-[#D4AF37]/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={client.avatar_url}
                  alt={client.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {client.name}
                  </h3>
                  <p className="text-gray-300">{client.profession}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <span>{client.phone}</span>
                </div>
                {client.company && (
                  <p className="text-gray-300">Empresa: {client.company}</p>
                )}
              </div>
              {client.notes && (
                <p className="text-gray-300 mb-4 text-sm">{client.notes}</p>
              )}
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-[#D4AF37] border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 hover:text-[#C09B30]"
                  onClick={() => {
                    setCurrentClient(client);
                    setIsEditing(true);
                    setDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-red-500/20 text-red-400 border-red-500/20 hover:bg-red-500/30 hover:text-red-300"
                  onClick={() => handleDelete(client.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}