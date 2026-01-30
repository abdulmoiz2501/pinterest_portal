import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: products = [], isLoading } = useProducts();
  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Collections */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
                Browse by
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                Curated Collections
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 stagger-children">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  title={collection.title}
                  description={collection.description}
                  image={collection.image}
                  slug={collection.slug}
                  itemCount={products.filter(p => p.category === collection.category).length}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products - Masonry Grid */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
                  Hand-picked
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                  Today's Favorites
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Masonry Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <div className="masonry stagger-children">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="masonry-item">
                    <ProductCard
                      image={product.image}
                      name={product.name}
                      description={product.description}
                      affiliateUrl={product.affiliateUrl}
                      aspectRatio={product.aspectRatio}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Mobile View All */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-foreground transition-colors"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-blush">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-lg mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                Never Miss a Find ✨
              </h2>
              <p className="text-muted-foreground mb-6">
                Follow along on Pinterest for daily curated picks and aesthetic inspiration.
              </p>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
                Follow on Pinterest
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
