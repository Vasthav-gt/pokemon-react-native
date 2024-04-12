import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { name } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const { name } = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },
    adjustQuantity(state, action) {
      const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, adjustQuantity } = cartSlice.actions;
export default cartSlice.reducer;
