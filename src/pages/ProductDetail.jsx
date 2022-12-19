import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuthContext } from "../components/context/AuthContext";
import { addBasket } from "../config/firebase";

export default function ProductDetail() {
  const navigate = useNavigate();
  const {
    state: {
      product,
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();

  const { user } = useAuthContext();
  const [selected, setSelected] = useState(options && options[0]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCompleted(false);
    }, 3000);
  }, [isCompleted]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = () => {
    user
      ? addBasket(user.uid, product, selected).then(setIsCompleted(true))
      : alert("로그인 후 이용하세요.");
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2  border-b border-gray-400">{`₩${price}`}</p>
          <p>{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              옵션 :
            </label>
            <select
              id="select"
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {isCompleted && <p>장바구니에 추가완료 !!</p>}
          <Button text="장바구니에 추가" onClick={handleClick}></Button>
        </div>
      </section>
    </>
  );
}
