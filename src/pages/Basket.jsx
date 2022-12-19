import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getBasket } from "../config/firebase";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
export default function Basket() {
  const { user } = useAuthContext();
  const [baskets, setBaskets] = useState([]);
  const {
    isLoading,
    error,
    data: basket,
  } = useQuery(["basket", user.uid], () =>
    getBasket(user.uid).then(setBaskets(basket))
  );

  const handlePlus = (id) => {
    const findIndex = baskets.findIndex((product) => product.id === id);
    const copyBaskets = [...baskets];

    copyBaskets[findIndex] = {
      ...copyBaskets[findIndex],
      count: copyBaskets[findIndex].count + 1,
    };
    setBaskets(copyBaskets);
  };

  const handleMinus = (id) => {
    const findIndex = baskets.findIndex((product) => product.id === id);
    const copyBaskets = [...baskets];

    copyBaskets[findIndex] = {
      ...copyBaskets[findIndex],
      count:
        copyBaskets[findIndex].count === 0
          ? 0
          : copyBaskets[findIndex].count - 1,
    };
    setBaskets(copyBaskets);
  };

  const handleRemove = (id) => {
    const findIndex = baskets.findIndex((product) => product.id === id);
    const copyBaskets = [...baskets];

    copyBaskets.splice(findIndex, 1);
    setBaskets(copyBaskets);
  };

  const sumPrice =
    baskets && baskets.length
      ? baskets.reduce((sum, product) => {
          return product.price * product.count + sum;
        }, 0)
      : 0;

  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {baskets &&
        baskets.map((product) => {
          const { id, count, image, title, selected, price } = product;
          return (
            <>
              <section key={id}>
                <div>
                  <img src={image} alt={title} />
                  <h6> {selected} </h6>
                  <p>{price}</p>
                </div>
                <div className="flex">
                  <AiOutlinePlusSquare onClick={() => handlePlus(id)} />
                  <span>{count}</span>
                  <AiOutlineMinusSquare onClick={() => handleMinus(id)} />
                  <BsTrashFill onClick={() => handleRemove(id)} />
                </div>
              </section>
            </>
          );
        })}
      {baskets && <h1>{sumPrice}</h1>}
    </>
  );
}
