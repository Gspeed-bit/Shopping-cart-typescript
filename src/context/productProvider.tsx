import { ReactElement, createContext } from "react";
import { useState } from "react";

// Define the type for each product
export type productType = {
  itemNumber: string;
  name: string;
  price: number;
};

// Define the initial state with an array of products
const initState: productType[] = [
  {
    itemNumber: "0001",
    name: "Smartphone",
    price: 1599.99,
  },
  {
    itemNumber: "0002",
    name: "Laptop",
    price: 2199.99,
  },
  {
    itemNumber: "0003",
    name: "Headphones",
    price: 539.99,
  },
  {
    itemNumber: "0004",
    name: "Smartwatch",
    price: 599.99,
  },
  {
    itemNumber: "0005",
    name: "Tablet",
    price: 1599.99,
  },
];

// Define the type for the context state
export type UseProjectsContextType = {
  products: productType[]; // Array of products
};

// Define the initial context state
const initContextState: UseProjectsContextType = {
  products: [],
};

// Create a context for managing products
const ProductsContext = createContext<UseProjectsContextType>(initContextState);

// Define the type for the props of the ProductsProvider component
type ChildrenType = { children?: ReactElement | ReactElement[] };

// Define the ProductsProvider component
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  // Define state variable 'products' and function 'setProducts' using the useState hook
  const [products, setProducts] = useState(initState);

  // Return the ProductsProvider component
  return (
    <ProductsContext.Provider value={{ products }}>
      {children} {/* Render children components */}
    </ProductsContext.Provider>
  );
};

export default ProductsContext; // Export the ProductsContext
