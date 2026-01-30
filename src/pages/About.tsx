import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <Heart className="w-4 h-4 text-primary fill-primary" />
                Nice to meet you
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                Hey, I'm the curator behind Pinned Picks ✨
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I spend way too much time scrolling Pinterest, hunting for the prettiest home finds, 
                the coziest fashion pieces, and the most satisfying self-care products. So I figured, 
                why not share the good stuff?
              </p>
            </div>
          </div>
        </section>

        {/* Values / Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 stagger-children">
              <div className="text-center p-6 bg-blush-light/30 rounded-2xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  Carefully Curated
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every single product is hand-picked by me. If it doesn't make me say "ooh, I need that," it doesn't make the cut.
                </p>
              </div>

              <div className="text-center p-6 bg-accent/30 rounded-2xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sage/30 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-sage-dark" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  Aesthetic First
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Life's too short for ugly things. I only share products that are as beautiful as they are functional.
                </p>
              </div>

              <div className="text-center p-6 bg-cream rounded-2xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  No Gatekeeping
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When I find something amazing, I share it. All my links are in one place so you can shop my picks easily.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="py-12 md:py-16 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-2xl font-semibold mb-4">
                A Little Note 💕
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Some of the links on this site are affiliate links, which means I may earn a small 
                commission if you decide to make a purchase. This doesn't cost you anything extra—it 
                just helps me keep curating and sharing finds I love. Thank you for supporting!
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
              Ready to explore?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
              >
                Shop All Picks
              </Link>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-card border border-border font-medium rounded-full hover:bg-secondary transition-colors"
              >
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

export default About;
