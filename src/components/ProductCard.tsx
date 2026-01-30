import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  affiliateUrl: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

const ProductCard = ({
  image,
  name,
  description,
  affiliateUrl,
  aspectRatio = "portrait",
}: ProductCardProps) => {
  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block card-hover"
    >
      <article className="bg-card rounded-2xl overflow-hidden shadow-soft">
        {/* Image */}
        <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          
          {/* Shop Now Badge */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card/95 backdrop-blur-sm rounded-full text-xs font-medium shadow-card">
              Shop Now
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </article>
    </a>
  );
};

export default ProductCard;
