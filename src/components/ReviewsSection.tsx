
import { Star, ExternalLink } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Maria Silva",
      rating: 5,
      comment: "Qualidade incrível! O biquíni que comprei é perfeito, tecido excelente e muito confortável.",
      date: "Há 2 dias"
    },
    {
      id: 2,
      name: "Ana Costa",
      rating: 5,
      comment: "Atendimento maravilhoso e produtos de altíssima qualidade. Super recomendo!",
      date: "Há 1 semana"
    },
    {
      id: 3,
      name: "Carla Santos",
      rating: 5,
      comment: "Meu maiô favorito é da Julia Paz! Já comprei vários e todos são perfeitos.",
      date: "Há 2 semanas"
    }
  ];

  const handleViewAllReviews = () => {
    // Substitua pela URL real do Google Meu Negócio da loja
    const googleBusinessUrl = "https://www.google.com/maps/place/Julia+Paz";
    window.open(googleBusinessUrl, '_blank');
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-2">
          ⭐ O que nossas clientes dizem
        </h2>
        <p className="text-muted-foreground">
          Depoimentos reais de quem já escolheu a Julia Paz
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 italic">
              "{review.comment}"
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleViewAllReviews}
          className="inline-flex items-center space-x-2 bg-white border-2 border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <span>Ver todos os comentários no Google</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ReviewsSection;
