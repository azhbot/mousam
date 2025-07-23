import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      name:'name'
    }
  ],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addProductToHistory: (state, action) => {
      state.products.push(action.payload);
    },
    removeProductFromHistory: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProductToHistory, removeProductFromHistory } =
  historySlice.actions;

export default historySlice.reducer;
