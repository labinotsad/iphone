import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]); // State for purchased items

  // Add to cart function
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Increase quantity function
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity function and remove if quantity reaches 0
  const decreaseQuantity = (id) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  // Buy it function
  const buyIt = (id) => {
    const itemToPurchase = cartItems.find((item) => item.id === id);
    if (itemToPurchase) {
      setPurchasedItems((prevItems) => [...prevItems, itemToPurchase]);
      removeFromCart(id); // Remove from cart after purchase
    }
  };

  // Remove from purchased items function
  const removeFromPurchasedItems = (id) => {
    setPurchasedItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        buyIt, // Expose the buyIt function
        purchasedItems, // Expose the purchased items state if needed
        removeFromPurchasedItems, // Expose the remove function for purchased items
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
