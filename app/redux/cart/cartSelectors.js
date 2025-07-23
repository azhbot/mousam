// selectors/cartSelectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartItemIdsMap = createSelector(
  [selectCartItems],
  (cartItems) => {
    const map = {};
    (cartItems || []).forEach(item => {
      map[item.id] = true;
    });
    return map;
  }
);
