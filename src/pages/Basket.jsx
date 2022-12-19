import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getBasket } from "../config/firebase";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";

const SHIPPING = 3000; //배송비 상수

export default function Basket() {
  const { user } = useAuthContext();
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["basket"], () =>
    getBasket(uid)
  );

  //   const handlePlus = (id) => {
  //     const findIndex = baskets.findIndex((product) => product.id === id);
  //     const copyBaskets = [...baskets];

  //     copyBaskets[findIndex] = {
  //       ...copyBaskets[findIndex],
  //       count: copyBaskets[findIndex].count + 1,
  //     };
  //     setBaskets(copyBaskets);
  //   };

  //   const handleMinus = (id) => {
  //     const findIndex = baskets.findIndex((product) => product.id === id);
  //     const copyBaskets = [...baskets];

  //     copyBaskets[findIndex] = {
  //       ...copyBaskets[findIndex],
  //       count:
  //         copyBaskets[findIndex].count === 0
  //           ? 0
  //           : copyBaskets[findIndex].count - 1,
  //     };
  //     setBaskets(copyBaskets);
  //   };

  //   const handleRemove = (id) => {
  //     const findIndex = baskets.findIndex((product) => product.id === id);
  //     const copyBaskets = [...baskets];

  //     copyBaskets.splice(findIndex, 1);
  //     setBaskets(copyBaskets);
  //   };

  //   const sumPrice =
  //     baskets && baskets.length
  //       ? baskets.reduce((sum, product) => {
  //           return product.price * product.count + sum;
  //         }, 0)
  //       : 0;
  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 담긴 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
}
