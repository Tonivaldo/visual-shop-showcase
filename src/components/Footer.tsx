
import { Instagram, Heart } from "lucide-react";

const Footer = () => {
  const handleInstagramClick = () => {
    // Substitua pelo Instagram real da Julia Paz
    const instagramUrl = "https://www.instagram.com/juliapaz_modapraia";
    window.open(instagramUrl, '_blank');
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "5511999999999";
    const message = "Olá! Gostaria de mais informações sobre os produtos da Julia Paz.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/9833fae8-9d87-4bb5-82c5-16647518fb38.png" 
                alt="Julia Paz" 
                className="w-12 h-12 rounded-full object-cover shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-gradient">Julia Paz</h3>
                <p className="text-sm text-muted-foreground">Moda Praia</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Biquínis e maiôs que realçam sua beleza natural. Qualidade, estilo e conforto em cada peça.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Links Rápidos</h4>
            <div className="space-y-2">
              <button 
                onClick={() => document.getElementById('verao2025')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Coleção Verão 2025
              </button>
              <button 
                onClick={() => document.getElementById('promocoes')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Promoções
              </button>
              <button 
                onClick={() => document.getElementById('maisVendidos')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Mais Vendidos
              </button>
              <button 
                onClick={handleWhatsAppContact}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Contato
              </button>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Nos siga</h4>
            <button
              onClick={handleInstagramClick}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">@juliapaz_modapraia</span>
            </button>
            <p className="text-sm text-muted-foreground">
              Acompanhe nossos lançamentos e bastidores no Instagram!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center space-x-1">
            <span>© 2025 Julia Paz Moda Praia. Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>para você.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
