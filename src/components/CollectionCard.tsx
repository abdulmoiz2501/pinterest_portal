import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  itemCount: number;
}

const CollectionCard = ({
  title,
  description,
  image,
  slug,
  itemCount,
}: CollectionCardProps) => {
  return (
    <Link to={`/collections/${slug}`} className="group block card-hover">
      <article className="relative bg-card rounded-2xl overflow-hidden shadow-soft">
        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-card">
          <span className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1 block">
            {itemCount} Items
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-semibold leading-tight mb-1">
            {title}
          </h3>
          <p className="text-sm opacity-90 mb-3 line-clamp-2">
            {description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all">
            Explore
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default CollectionCard;
