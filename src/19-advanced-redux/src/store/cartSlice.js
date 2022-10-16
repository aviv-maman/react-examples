import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0, totalAmount: 0 },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItemInCart = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItemInCart) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          description: newItem.description,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItemInCart.quantity++;
        existingItemInCart.totalPrice = existingItemInCart.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItemInCart = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItemInCart.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItemInCart.quantity--;
        existingItemInCart.totalPrice = existingItemInCart.totalPrice - existingItemInCart.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
