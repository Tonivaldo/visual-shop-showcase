
import { useState, useMemo } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import ProductCard from "./ProductCard";
import LocationSection from "./LocationSection";
import ReviewsSection from "./ReviewsSection";

// Produtos de moda praia
const swimwearProducts = [
  // Coleção Verão 2025
  {
    id: "1",
    name: "Biquíni Tropical Paradise",
    price: "R$ 149,90",
    description: "Biquíni com estampa tropical vibrante, top com bojo e calcinha de amarração lateral.",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop"
    ],
    category: "Biquínis",
    section: "verao2025"
  },
  {
    id: "2",
    name: "Maiô Ocean Dreams",
    price: "R$ 199,90",
    description: "Maiô elegante com recortes estratégicos e proteção UV50+. Perfeito para o verão.",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop"
    ],
    category: "Maiôs",
    section: "verao2025"
  },
  {
    id: "3",
    name: "Biquíni Sunset Vibes",
    price: "R$ 139,90",
    description: "Biquíni tie-dye com cores do pôr do sol, top triangular e calcinha brasileira.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop"
    ],
    category: "Biquínis",
    section: "verao2025"
  },

  // Promoções
  {
    id: "4",
    name: "Maiô Classic Black",
    price: "R$ 89,90",
    description: "Maiô clássico preto com detalhes dourados. Elegância atemporal com desconto especial.",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop"
    ],
    category: "Maiôs",
    section: "promocoes"
  },
  {
    id: "5",
    name: "Biquíni Flores do Campo",
    price: "R$ 79,90",
    description: "Biquíni floral delicado com top de bojo removível. Promoção por tempo limitado!",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop"
    ],
    category: "Biquínis",
    section: "promocoes"
  },

  // Mais Vendidos
  {
    id: "6",
    name: "Biquíni Brazilian Style",
    price: "R$ 169,90",
    description: "O favorito das clientes! Biquíni com top cortininha e calcinha fio dental.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop"
    ],
    category: "Biquínis",
    section: "maisVendidos"
  },
  {
    id: "7",
    name: "Maiô Goddess",
    price: "R$ 219,90",
    description: "Maiô luxuoso com aplicações de pedrarias. O mais vendido da temporada!",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop"
    ],
    category: "Maiôs",
    section: "maisVendidos"
  },
  {
    id: "8",
    name: "Biquíni Neon Beach",
    price: "R$ 159,90",
    description: "Biquíni neon que brilha na praia! Top com franzido e calcinha de lacinho.",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0f06ba14d8f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop"
    ],
    category: "Biquínis",
    section: "maisVendidos"
  }
];

const categories = ["Todos", "Biquínis", "Maiôs"];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeSection, setActiveSection] = useState("verao2025");

  const filteredProducts = useMemo(() => {
    return swimwearProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getProductsBySection = (section: string) => {
    return filteredProducts.filter(product => product.section === section);
  };

  const sections = [
    { id: "verao2025", title: "🌞 Coleção Verão 2025", subtitle: "As mais novas tendências para a temporada" },
    { id: "promocoes", title: "🔥 Promoções", subtitle: "Ofertas imperdíveis por tempo limitado" },
    { id: "maisVendidos", title: "⭐ Mais Vendidos", subtitle: "Os favoritos das nossas clientes" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Moda Praia Julia Paz
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Biquínis e maiôs que realçam sua beleza natural. Qualidade, estilo e conforto em cada peça.
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
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-border">
            <div className="flex space-x-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {section.title.split(' ').slice(1).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Section */}
        {sections.map((section) => (
          activeSection === section.id && (
            <div key={section.id} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient mb-2">
                  {section.title}
                </h2>
                <p className="text-muted-foreground">
                  {section.subtitle}
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {getProductsBySection(section.id).map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>

              {getProductsBySection(section.id).length === 0 && (
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
            </div>
          )
        ))}

        {/* Location Section */}
        <LocationSection />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ficou com alguma dúvida?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Entre em contato conosco! Estamos aqui para te ajudar a escolher o look perfeito.
            </p>
            <button
              onClick={() => {
                const phoneNumber = "5511999999999";
                const message = "Olá! Gostaria de mais informações sobre os produtos da Julia Paz.";
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
