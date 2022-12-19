import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { addOrUpdateBasket, removeFromBasket } from "../config/firebase";

const ICON_CLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105";

export default function CartItem({
  product,
  product: { id, title, image, option, quantity, price },
  uid,
}) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateBasket(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateBasket(uid, { ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => removeFromBasket(uid, id);
  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>₩{price}</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} className={ICON_CLASS} />
          <RiDeleteBin5Fill onClick={handleDelete} className={ICON_CLASS} />
        </div>
      </div>
    </li>
  );
}
