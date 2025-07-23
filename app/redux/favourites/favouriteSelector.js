import { createSelector } from "@reduxjs/toolkit";

export const selectFavourites = (state) => state.favourites;
const selectFavouriteItems = (state) => state.favourites.favouriteItems;

export const selectFavouriteItemIdMap = createSelector(
  [selectFavouriteItems],
  (favourites) => {
    const map = {};
    (favourites || []).forEach((item) => {
      map[item.id] = true;
    });
    return map;
  }
);
