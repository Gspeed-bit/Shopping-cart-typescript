import { ReactElement } from "react";
import { UseProductsContextType } from "../context/ProductsProvider";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import Product from "./Product";
const ProductList = () => {

  const {dispatch, REDUCER_ACTIONS, cart} = useCart();
  const {products} = useProducts()

let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>
  if (products?.length) {
    pageContent = products.map(product => {
      const inCart: boolean = cart.some((item) => item.itemNumber === product.itemNumber);

      return (
        <Product
          key={product.itemNumber}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }
const content= (
  <main className="main main--products">
    {pageContent}
  </main>
)
  return ( content );
};
export default ProductList;
