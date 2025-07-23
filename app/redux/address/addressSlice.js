import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  selectedAddressId: null,
  selectedAddress: null, // 👈 New field added
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addNewAddress: (state, action) => {
      state.addresses.unshift(action.payload);
      if (state.addresses.length === 1) {
        state.selectedAddressId = action.payload.id;
        state.selectedAddress = action.payload;
      }
    },

    updateAddress: (state, action) => {
      const { id, ...updatedAddress } = action.payload;
      const index = state.addresses.findIndex((address) => address.id === id);
      if (index !== -1) {
        state.addresses[index] = { ...state.addresses[index], ...updatedAddress };

        // 🔄 Update selectedAddress if it's the one being updated
        if (state.selectedAddressId === id) {
          state.selectedAddress = state.addresses[index];
        }
      }
    },

    removeAddress: (state, action) => {
      const index = state.addresses.findIndex((address) => address.id === action.payload);
      if (index !== -1) {
        state.addresses.splice(index, 1);

        // ❌ Reset selected address if it's the one being removed
        if (state.selectedAddressId === action.payload) {
          state.selectedAddressId = null;
          state.selectedAddress = null;
        }
      }
    },

    setSelectedAddressId: (state, action) => {
      state.selectedAddressId = action.payload;
      const selected = state.addresses.find((a) => a.id === action.payload);
      state.selectedAddress = selected ?? null;
    },

    clearAddresses: (state) => {
      state.addresses = [];
      state.selectedAddressId = null;
      state.selectedAddress = null;
    },
  },
});

export const {
  addNewAddress,
  updateAddress,
  removeAddress,
  clearAddresses,
  setSelectedAddressId,
} = addressSlice.actions;

export default addressSlice.reducer;
