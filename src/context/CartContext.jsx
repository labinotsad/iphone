import { createContext, useReducer, useEffect } from "react";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const BUY_IT = "BUY_IT";
const REMOVE_FROM_PURCHASED_ITEMS = "REMOVE_FROM_PURCHASED_ITEMS";
const SET_LOGGED_IN = "SET_LOGGED_IN";

const initialState = {
  cartItems: [],
  purchasedItems: [],
  isLoggedIn: false, // Add the logged-in state
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (!state.isLoggedIn) {
        return state; // If not logged in, don't allow adding to cart
      }
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case BUY_IT: {
      const itemToPurchase = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemToPurchase) {
        // Combine the item with the order data
        const purchaseData = {
          ...itemToPurchase,
          orderData: action.payload.orderData,
        };
        return {
          ...state,
          purchasedItems: [...state.purchasedItems, purchaseData],
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      return state;
    }
    case REMOVE_FROM_PURCHASED_ITEMS:
      return {
        ...state,
        purchasedItems: state.purchasedItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => dispatch({ type: ADD_TO_CART, payload: item });
  const removeFromCart = (id) =>
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  const increaseQuantity = (id) =>
    dispatch({ type: INCREASE_QUANTITY, payload: id });
  const decreaseQuantity = (id) =>
    dispatch({ type: DECREASE_QUANTITY, payload: id });
  const buyIt = (id, orderData) =>
    dispatch({ type: BUY_IT, payload: { id, orderData } });
  const removeFromPurchasedItems = (id) =>
    dispatch({ type: REMOVE_FROM_PURCHASED_ITEMS, payload: id });
  const setLoggedIn = (status) =>
    dispatch({ type: SET_LOGGED_IN, payload: status });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isloggedin") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        purchasedItems: state.purchasedItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        buyIt,
        removeFromPurchasedItems,
        isLoggedIn: state.isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
