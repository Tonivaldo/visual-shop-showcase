
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useForm } from "react-hook-form";
import { Plus, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  section: string;
  images: string[];
}

const ProductForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
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

  const addImage = () => {
    if (newImageUrl.trim() && !images.includes(newImageUrl.trim())) {
      const updatedImages = [...images, newImageUrl.trim()];
      setImages(updatedImages);
      form.setValue("images", updatedImages);
      setNewImageUrl("");
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
      images,
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
    setNewImageUrl("");
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
                  <Label className="text-foreground font-medium">Imagens do Produto</Label>
                  
                  {/* Add new image */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="URL da imagem"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 border-border focus:border-primary focus:ring-primary/20"
                    />
                    <Button
                      type="button"
                      onClick={addImage}
                      size="icon"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Image preview */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
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

                  {images.length === 0 && (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">
                        Adicione URLs das imagens do produto
                      </p>
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
