import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentList: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addPayment: (state, action) => {
      state.paymentList.push(action.payload);
    },
    clearAll: (state) => {
      state.paymentList = [];
    },
    clearPaymentById: (state, action) => {
      state.paymentList = state.paymentList.filter(
        (payment) => payment.id !== action.payload
      );
    },
  },
});

export const { addPayment, clearAll, clearPaymentById } = paymentSlice.actions;
export default paymentSlice.reducer;
