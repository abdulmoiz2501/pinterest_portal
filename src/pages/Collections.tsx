import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

const Collections = () => {
  const { data: products = [] } = useProducts();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 md:py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Browse Collections
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Explore our carefully curated collections, organized by the things you love most.
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 stagger-children">
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
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
