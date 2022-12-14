import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getBasket } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import useBasket from "../hooks/useBasket";

export default function BasketStatus() {
  const {
    basketQuery: { data: products },
  } = useBasket();

  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2 ">
          {products.length}
        </p>
      )}
    </div>
  );
}
