import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getCollectionBySlug } from "@/data/products";
import { useProductsByCategory } from "@/hooks/useProducts";
import { ArrowLeft } from "lucide-react";

const CollectionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug || "");
  const { data: categoryProducts = [], isLoading } = useProductsByCategory(slug || "");

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold mb-4">Collection Not Found</h1>
            <Link to="/collections" className="text-primary hover:underline">
              Browse all collections
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8 md:pb-12 text-card">
              <Link
                to="/collections"
                className="inline-flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                All Collections
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-2">
                {collection.title}
              </h1>
              <p className="text-lg opacity-90 max-w-md">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-sm text-muted-foreground">
                  {categoryProducts.length} {categoryProducts.length === 1 ? "item" : "items"}
                </div>

                <div className="masonry stagger-children">
                  {categoryProducts.map((product) => (
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

                {categoryProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">No products in this collection yet.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
