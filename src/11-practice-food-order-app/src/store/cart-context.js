import React, { createContext } from 'react';

// Create context with empty data. This empty data will be used for auto-completion only
const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
