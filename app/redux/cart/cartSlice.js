import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewItemToCart: (state, action) => {
    state.cartItems.push(action.payload)
    },
    removeItemFromCart: (state, action) => {
     state.cartItems=state.cartItems.filter((item)=>item.id!==action.payload)
    },

    clearCart: (state) => {
      state.cartItems = [];
   
    },
  },
});



export const {
  addNewItemToCart,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
