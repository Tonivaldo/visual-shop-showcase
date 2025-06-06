
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  category: string;
}

const ProductCard = ({ id, name, price, description, images, category }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "5511999999999";
    const message = `Olá! Tenho interesse no produto:

📦 *${name}*
💰 Preço: ${price}
📝 ${description}

Gostaria de mais informações!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setShowNewsletterModal(true);
    }
  };

  const handleShare = () => {
    const shareText = `Confira este produto incrível da Julia Paz Moda Praia!\n\n${name}\n${price}\n\nVeja mais em: ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${name} - Julia Paz`,
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleNewsletterSubmit = () => {
    if (whatsappNumber) {
      const phoneNumber = "5511999999999";
      const message = `Olá! Gostaria de receber promoções, descontos e novidades da Julia Paz no WhatsApp: ${whatsappNumber}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setShowNewsletterModal(false);
      setWhatsappNumber("");
    }
  };

  return (
    <>
      <div className="group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border hover:border-primary/20 transform hover:-translate-y-1">
        {/* Image Carousel */}
        <div className="relative aspect-square overflow-hidden bg-gradient-soft">
          <img
            src={images[currentImageIndex]}
            alt={`${name} - Imagem ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-medium px-3 py-1 rounded-full">
              {category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleLike}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
            >
              <Heart 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
            {name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">
              {price}
            </div>
            
            <button
              onClick={handleWhatsAppOrder}
              className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">Comprar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <Dialog open={showNewsletterModal} onOpenChange={setShowNewsletterModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-gradient">
              💕 Obrigada por curtir!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Quer receber nossas promoções exclusivas, descontos e novidades em primeira mão?
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Seu WhatsApp:</label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowNewsletterModal(false)}
                className="flex-1"
              >
                Agora não
              </Button>
              <Button
                onClick={handleNewsletterSubmit}
                className="flex-1"
                disabled={!whatsappNumber}
              >
                Quero receber!
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
