import homeCozy from "@/assets/home-cozy.jpg";
import fashionNeutral from "@/assets/fashion-neutral.jpg";
import beautySelfcare from "@/assets/beauty-selfcare.jpg";
import homeReading from "@/assets/home-reading.jpg";
import jewelryGold from "@/assets/jewelry-gold.jpg";
import lifestyleSummer from "@/assets/lifestyle-summer.jpg";
import kitchenMug from "@/assets/kitchen-mug.jpg";
import fashionSweater from "@/assets/fashion-sweater.jpg";
import homeCandle from "@/assets/home-candle.jpg";
import fashionSneakers from "@/assets/fashion-sneakers.jpg";
import beautyScrunchies from "@/assets/beauty-scrunchies.jpg";
import homeBasket from "@/assets/home-basket.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: "fashion" | "home" | "beauty" | "lifestyle";
  affiliateUrl: string;
  aspectRatio: "square" | "portrait" | "landscape";
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cozy Linen Throw",
    description: "The softest beige linen throw for your reading nook. Perfect for chilly evenings.",
    image: homeCozy,
    category: "home",
    affiliateUrl: "https://example.com/affiliate/throw",
    aspectRatio: "portrait",
  },
  {
    id: "2",
    name: "Neutral Workwear Set",
    description: "Effortlessly chic cream blouse and tailored trousers. Office to dinner ready.",
    image: fashionNeutral,
    category: "fashion",
    affiliateUrl: "https://example.com/affiliate/workwear",
    aspectRatio: "portrait",
  },
  {
    id: "3",
    name: "Self-Care Ritual Kit",
    description: "Jade roller, gua sha, and luxe serums for your evening pamper routine.",
    image: beautySelfcare,
    category: "beauty",
    affiliateUrl: "https://example.com/affiliate/skincare",
    aspectRatio: "square",
  },
  {
    id: "4",
    name: "Reading Nook Essentials",
    description: "Create the coziest corner with a plush throw and curated book stack.",
    image: homeReading,
    category: "home",
    affiliateUrl: "https://example.com/affiliate/reading",
    aspectRatio: "portrait",
  },
  {
    id: "5",
    name: "Minimal Gold Jewelry",
    description: "Dainty hoops and delicate necklace. The everyday essentials you'll never take off.",
    image: jewelryGold,
    category: "fashion",
    affiliateUrl: "https://example.com/affiliate/jewelry",
    aspectRatio: "square",
  },
  {
    id: "6",
    name: "Summer Essentials Set",
    description: "Linen tote, tortoise sunnies, and the perfect straw hat for beach days.",
    image: lifestyleSummer,
    category: "lifestyle",
    affiliateUrl: "https://example.com/affiliate/summer",
    aspectRatio: "portrait",
  },
  {
    id: "7",
    name: "Handmade Ceramic Mug",
    description: "Sage green artisan mug for your morning latte ritual. Holds 12oz of happiness.",
    image: kitchenMug,
    category: "home",
    affiliateUrl: "https://example.com/affiliate/mug",
    aspectRatio: "square",
  },
  {
    id: "8",
    name: "Cashmere Crewneck",
    description: "The softest cream cashmere sweater you'll reach for every single day.",
    image: fashionSweater,
    category: "fashion",
    affiliateUrl: "https://example.com/affiliate/sweater",
    aspectRatio: "portrait",
  },
  {
    id: "9",
    name: "Vanilla Soy Candle",
    description: "Hand-poured vanilla bean candle with wooden wick. 50+ hour burn time.",
    image: homeCandle,
    category: "home",
    affiliateUrl: "https://example.com/affiliate/candle",
    aspectRatio: "portrait",
  },
  {
    id: "10",
    name: "Classic White Sneakers",
    description: "The perfect everyday sneaker. Clean lines, all-day comfort.",
    image: fashionSneakers,
    category: "fashion",
    affiliateUrl: "https://example.com/affiliate/sneakers",
    aspectRatio: "portrait",
  },
  {
    id: "11",
    name: "Silk Scrunchie Set",
    description: "Pastel silk scrunchies that are gentle on your hair. Set of 3.",
    image: beautyScrunchies,
    category: "beauty",
    affiliateUrl: "https://example.com/affiliate/scrunchies",
    aspectRatio: "square",
  },
  {
    id: "12",
    name: "Rattan Storage Basket",
    description: "Handwoven storage basket for blankets, magazines, or plants.",
    image: homeBasket,
    category: "home",
    affiliateUrl: "https://example.com/affiliate/basket",
    aspectRatio: "portrait",
  },
];

export interface Collection {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  category: "fashion" | "home" | "beauty" | "lifestyle";
}

export const collections: Collection[] = [
  {
    id: "1",
    title: "Cozy Home Finds",
    description: "Transform your space into a warm, inviting retreat.",
    slug: "home",
    image: homeReading,
    category: "home",
  },
  {
    id: "2",
    title: "Everyday Fashion",
    description: "Timeless pieces for effortless everyday style.",
    slug: "fashion",
    image: fashionNeutral,
    category: "fashion",
  },
  {
    id: "3",
    title: "Self-Care Favorites",
    description: "Pamper yourself with these beauty must-haves.",
    slug: "beauty",
    image: beautySelfcare,
    category: "beauty",
  },
  {
    id: "4",
    title: "Lifestyle Essentials",
    description: "Curated picks for living your best life.",
    slug: "lifestyle",
    image: lifestyleSummer,
    category: "lifestyle",
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

export const getCollectionBySlug = (slug: string) => {
  return collections.find((collection) => collection.slug === slug);
};
