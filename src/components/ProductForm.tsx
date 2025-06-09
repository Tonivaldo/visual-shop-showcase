
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useForm } from "react-hook-form";
import { Plus, X, Upload, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  section: string;
  images: File[];
}

const ProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "Biquínis",
      section: "verao2025",
      images: [],
    },
  });

  const categories = ["Biquínis", "Maiôs"];
  const sections = [
    { value: "verao2025", label: "Coleção Verão 2025" },
    { value: "promocoes", label: "Promoções" },
    { value: "maisVendidos", label: "Mais Vendidos" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter(file => file.type.startsWith('image/'));
    const remainingSlots = 3 - images.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    if (newFiles.length > remainingSlots) {
      toast({
        title: "Limite de imagens excedido",
        description: `Você pode adicionar no máximo 3 imagens. ${newFiles.length - remainingSlots} arquivo(s) foram ignorados.`,
        variant: "destructive"
      });
    }

    if (filesToAdd.length > 0) {
      const updatedImages = [...images, ...filesToAdd];
      setImages(updatedImages);
      form.setValue("images", updatedImages);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      images: images.map(file => URL.createObjectURL(file)),
      id: Date.now().toString(),
    };
    
    console.log("Produto cadastrado:", productData);
    
    toast({
      title: "Produto cadastrado com sucesso!",
      description: `${data.name} foi adicionado ao catálogo.`,
    });

    // Reset form
    form.reset();
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gradient mb-2">
              Cadastrar Novo Produto
            </CardTitle>
            <p className="text-muted-foreground">
              Adicione um novo produto ao catálogo da Julia Paz
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Nome do Produto */}
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Nome do produto é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Nome do Produto</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Biquíni Tropical Paradise"
                          className="border-border focus:border-primary focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preço */}
                <FormField
                  control={form.control}
                  name="price"
                  rules={{ required: "Preço é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Preço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: R$ 149,90"
                          className="border-border focus:border-primary focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Descrição */}
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "Descrição é obrigatória" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Descrição</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Descreva o produto em detalhes..."
                          className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categoria e Seção */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">Categoria</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            {...field}
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">Seção</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            {...field}
                          >
                            {sections.map((section) => (
                              <option key={section.value} value={section.value}>
                                {section.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Imagens */}
                <div className="space-y-4">
                  <Label className="text-foreground font-medium">
                    Imagens do Produto (máximo 3)
                  </Label>
                  
                  {/* Drag & Drop Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="imageInput"
                      multiple
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                      disabled={images.length >= 3}
                    />
                    
                    {images.length < 3 ? (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm mb-2">
                          Arraste e solte suas imagens aqui ou
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('imageInput')?.click()}
                          className="mx-auto"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Selecionar Imagens
                        </Button>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Limite máximo de 3 imagens atingido
                      </p>
                    )}
                  </div>

                  {/* Botão adicional para mais imagens */}
                  {images.length > 0 && images.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('imageInput')?.click()}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Mais Imagens ({images.length}/3)
                    </Button>
                  )}

                  {/* Image preview */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  Cadastrar Produto
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductForm;
