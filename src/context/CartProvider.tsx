import { useReducer, useMemo, createContext, ReactElement } from "react";

// Define the type for items in the cart
export type CartItemType = {
  itemNumber: string;
  name: string;
  price: number;
  qty: number;
};

// Define the type for the state of the cart
type CartStateType = {
  cart: CartItemType[];
};

// Initialize the state of the cart
const initCartState: CartStateType = {
  cart: [],
};

// Define action types for the reducer
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

// Define the type for reducer action types
export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

// Define the structure of actions dispatched to the reducer
export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

// Reducer function to handle cart state updates
const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    // Add item to the cart
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }
      // Extract item details from the payload
      const { itemNumber, name, price } = action.payload;
      // Check if the item already exists in the cart
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.itemNumber !== itemNumber
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.itemNumber === itemNumber
      );
      // Increment quantity if item exists, otherwise set quantity to 1
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      // Return updated state with the new item added to the cart
      return {
        ...state,
        cart: [...filteredCart, { itemNumber, name, price, qty }],
      };
    }
    // Remove item from the cart
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE action");
      }
      // Extract item number from the payload
      const { itemNumber } = action.payload;
      // Filter out the item to be removed from the cart
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.itemNumber !== itemNumber
      );
      // Return updated state without the removed item
      return { ...state, cart: [...filteredCart] };
    }
    // Update quantity of an item in the cart
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }
      // Extract item details and quantity from the payload
      const { itemNumber, qty } = action.payload;
      // Find the item to be updated
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.itemNumber === itemNumber
      );
      // Throw error if item doesn't exist
      if (!itemExists) {
        throw new Error("Item must exist in order to update quantity");
      }
      // Create updated item with new quantity
      const updatedItem: CartItemType = { ...itemExists, qty };
      // Filter out the item to be updated from the cart
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.itemNumber !== itemNumber
      );
      // Return updated state with the item's quantity updated
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    // Submit action to clear the cart
    case REDUCER_ACTION_TYPE.SUBMIT: {
      // Clear the cart
      return { ...state, cart: [] };
    }
    // Throw error for unidentified action types
    default:
      throw new Error("Unidentified reducer action type");
  }
};

// Custom hook to provide cart context
const useCartContext = (initCartState: CartStateType) => {
  // Use reducer to manage cart state
  const [state, dispatch] = useReducer(reducer, initCartState);

  // Memoize reducer action types
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  // Calculate total number of items in the cart
  const totalItems = state.cart.reduce((lastValue, cartItem) => {
    return lastValue + cartItem.qty;
  }, 0);

  // Calculate total price of items in the cart
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(
    state.cart.reduce((lastValue, cartItem) => {
      return lastValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  // Sort the cart items based on item number
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.itemNumber.slice(-4));
    const itemB = Number(b.itemNumber.slice(-4));
    return itemA - itemB;
  });

  // Return cart context values
  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

// Define the type for the useCartContext hook
export type UseCartContextType = ReturnType<typeof useCartContext>;

// Initialize cart context state
const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: " ",
  cart: [],
};

// Create a context for the cart
export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

// Define type for children elements
type childrenType = { children?: ReactElement | ReactElement[] };

// Provider component to provide cart context to its children
export const CartProvider = ({ children }: childrenType): ReactElement => {
  // Use custom hook to get cart context values
  const value = useCartContext(initCartState);
  // Return the cart context provider with its children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Export the default CartContext
export default CartContext;
