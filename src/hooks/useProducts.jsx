import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts as fetchProducts } from "../config/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addProduct(product, url),
    { onSuccess: () => queryClient.invalidate(["products"]) }
  );

  return { productsQuery, addProduct };
}
