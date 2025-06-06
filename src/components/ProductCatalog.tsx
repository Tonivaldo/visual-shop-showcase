
import { useState, useMemo } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import ProductCard from "./ProductCard";

// Dados de exemplo dos produtos
const sampleProducts = [
  {
    id: "1",
    name: "Bolsa Elegante Premium",
    price: "R$ 199,90",
    description: "Bolsa de couro sintético de alta qualidade, perfeita para o dia a dia e ocasiões especiais.",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
    ],
    category: "Bolsas"
  },
  {
    id: "2",
    name: "Conjunto de Mesa Moderna",
    price: "R$ 899,90",
    description: "Mesa de centro moderna com design contemporâneo, ideal para salas de estar elegantes.",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
    ],
    category: "Móveis"
  },
  {
    id: "3",
    name: "Acessório Pet Comfort",
    price: "R$ 79,90",
    description: "Acessório confortável para pets, feito com materiais macios e duráveis.",
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop"
    ],
    category: "Pet"
  },
  {
    id: "4",
    name: "Decoração Artesanal",
    price: "R$ 149,90",
    description: "Peça decorativa artesanal única, perfeita para dar um toque especial ao seu ambiente.",
    images: [
      "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
    ],
    category: "Decoração"
  },
  {
    id: "5",
    name: "Kit Gourmet Premium",
    price: "R$ 259,90",
    description: "Kit completo para experiências gastronômicas especiais, com produtos selecionados.",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop"
    ],
    category: "Gourmet"
  },
  {
    id: "6",
    name: "Sofá Confort Style",
    price: "R$ 1.299,90",
    description: "Sofá confortável com design moderno, ideal para momentos de relaxamento em casa.",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
    ],
    category: "Móveis"
  }
];

const categories = ["Todos", "Bolsas", "Móveis", "Pet", "Decoração", "Gourmet"];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa coleção cuidadosamente selecionada de produtos premium
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-border">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "grid" ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "list" ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1 max-w-4xl mx-auto"
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros ou termo de busca
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Não encontrou o que procurava?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Entre em contato conosco! Temos muito mais produtos disponíveis.
            </p>
            <button
              onClick={() => {
                const phoneNumber = "5511999999999";
                const message = "Olá! Gostaria de ver mais produtos da Julia Paz.";
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
