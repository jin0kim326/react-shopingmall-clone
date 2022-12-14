import React from "react";
import { getProducts } from "../config/firebase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  return (
    <>
      {isLoading && <h1>loading...</h1>}
      {error && <h1>{error}</h1>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
