import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addOrUpdateBasket,
  getBasket,
  removeFromBasket,
} from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useBasket() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  // 사용자별로 캐시대도록 키 설정 (로그인한 유저가 아니면 쿼리실행x)
  const basketQuery = useQuery(["basket", uid || ""], () => getBasket(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateBasket(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["basket", uid]);
      },
    }
  );

  const removeItem = useMutation((id) => removeFromBasket(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["basket", uid]);
    },
  });
  return { basketQuery, addOrUpdateItem, removeItem };
}
