import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/lib/firebase/products";
import type { Product } from "@/data/products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => productsService.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: () => productsService.getByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
  });
};


