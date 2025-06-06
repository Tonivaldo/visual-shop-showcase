
import { MapPin, ExternalLink } from "lucide-react";

const LocationSection = () => {
  const locations = [
    {
      id: 1,
      name: "Julia Paz - Copacabana",
      address: "Av. Atlântica, 1702 - Copacabana, Rio de Janeiro - RJ",
      googleMapsUrl: "https://maps.google.com/?q=Av.+Atlântica,+1702+-+Copacabana,+Rio+de+Janeiro+-+RJ"
    },
    {
      id: 2,
      name: "Julia Paz - Ipanema",
      address: "Rua Visconde de Pirajá, 547 - Ipanema, Rio de Janeiro - RJ",
      googleMapsUrl: "https://maps.google.com/?q=Rua+Visconde+de+Pirajá,+547+-+Ipanema,+Rio+de+Janeiro+-+RJ"
    },
    {
      id: 3,
      name: "Julia Paz - Barra da Tijuca",
      address: "Av. das Américas, 4666 - Barra da Tijuca, Rio de Janeiro - RJ",
      googleMapsUrl: "https://maps.google.com/?q=Av.+das+Américas,+4666+-+Barra+da+Tijuca,+Rio+de+Janeiro+-+RJ"
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-2">
          📍 Nossas Lojas
        </h2>
        <p className="text-muted-foreground">
          Visite uma de nossas lojas físicas e experimente nossos produtos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-2">
                  {location.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {location.address}
                </p>
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  <span>Ver no Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationSection;
