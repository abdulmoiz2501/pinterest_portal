import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/lib/firebase/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: allProducts = [] } = useProducts();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getById(id!),
    enabled: !!id,
  });

  // Get related products (same category, excluding current)
  const relatedProducts = product
    ? allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <section className="py-4 border-b bg-background">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className={`${aspectRatioClasses[product.aspectRatio]} rounded-2xl overflow-hidden bg-card shadow-soft`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
                    {product.category}
                  </span>
                  <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button size="lg" className="w-full md:w-auto gap-2 text-lg px-8 py-6">
                      <ShoppingBag className="w-5 h-5" />
                      Shop This Product
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    You'll be redirected to our partner store
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
                  You might also like
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                  Related Products
                </h2>
              </div>

              <div className="masonry stagger-children">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="masonry-item">
                    <ProductCard
                      image={relatedProduct.image}
                      name={relatedProduct.name}
                      description={relatedProduct.description}
                      affiliateUrl={relatedProduct.affiliateUrl}
                      aspectRatio={relatedProduct.aspectRatio}
                      productId={relatedProduct.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

