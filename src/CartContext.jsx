import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    console.log('Adding to cart:', item);
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        toast.info(`${item.name} quantity increased`);
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        toast.success(`${item.name} added to cart`);
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    const removedItem = cartItems.find((item) => item.id === id);
    if (removedItem) toast.warn(`${removedItem.name} removed from cart`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAllItems = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, removeAllItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
