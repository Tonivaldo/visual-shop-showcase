
import { ShoppingBag, Phone } from "lucide-react";

const Header = () => {
  const handleWhatsAppContact = () => {
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const message = "Olá! Gostaria de saber mais sobre os produtos da Julia Paz.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/9833fae8-9d87-4bb5-82c5-16647518fb38.png" 
              alt="Julia Paz" 
              className="w-12 h-12 rounded-full object-cover shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gradient">Julia Paz</h1>
              <p className="text-sm text-muted-foreground">Catálogo de Produtos</p>
            </div>
          </div>

          {/* Contact Button */}
          <button
            onClick={handleWhatsAppContact}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">Contato</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
