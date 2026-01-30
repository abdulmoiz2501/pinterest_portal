import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
        <div className="max-w-2xl mx-auto stagger-children">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 bg-primary/15 text-primary-foreground text-xs font-medium rounded-full mb-6">
            ✨ Curated with love
          </span>
          
          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-balance">
            Curated Finds You'll Love
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-8 text-balance">
            Discover handpicked favorites for your home, wardrobe, and self-care rituals. All the aesthetic essentials in one place.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
            >
              Shop All Picks
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center px-8 py-3 bg-card border border-border font-medium rounded-full hover:bg-secondary transition-colors"
            >
              Browse Collections
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
