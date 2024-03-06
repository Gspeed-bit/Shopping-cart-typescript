import { useContext } from "react";
import { UseCartContextType } from "../context/CartProvider";
import CartContext from "../context/CartProvider";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};  

export  default useCart;