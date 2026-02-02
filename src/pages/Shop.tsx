import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts, useProductsByCategory } from "@/hooks/useProducts";

type CategoryFilter = "all" | "fashion" | "home" | "beauty" | "lifestyle";

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const { data: allProducts = [], isLoading: isLoadingAll } = useProducts();
  const { data: categoryProducts = [], isLoading: isLoadingCategory } = useProductsByCategory(
    activeFilter !== "all" ? activeFilter : ""
  );

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    { label: "Fashion", value: "fashion" },
    { label: "Home", value: "home" },
    { label: "Beauty", value: "beauty" },
    { label: "Lifestyle", value: "lifestyle" },
  ];

  const isLoading = activeFilter === "all" ? isLoadingAll : isLoadingCategory;
  const filteredProducts =
    activeFilter === "all"
      ? allProducts
      : categoryProducts;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 md:py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Shop All Picks
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Discover our complete collection of curated favorites, hand-picked just for you.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeFilter === filter.value
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
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
                  {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
                </div>

                <div className="masonry stagger-children">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="masonry-item">
                      <ProductCard
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        affiliateUrl={product.affiliateUrl}
                        aspectRatio={product.aspectRatio}
                        productId={product.id}
                      />
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">No products found in this category.</p>
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

export default Shop;
