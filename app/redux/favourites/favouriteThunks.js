import { addFavourite, removeFavourite } from './favouriteSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to toggle favourite item
export const toggleFavouriteItem = (item) => (dispatch, getState) => {
  const state = getState();
  const isAlreadyFavourite = state.favourites.favouriteItems.some(
    (fav) => fav.id === item.id
  );

  if (isAlreadyFavourite) {
    dispatch(removeFavourite(item.id));
    return false;
  } else {
    dispatch(addFavourite(item));
    return true;
  }
};

// Fake paginated fetch for favourite items
export const fetchFavouriteItems = createAsyncThunk(
  'favourites/fetchFavouriteItems',
  async (_, { getState }) => {
    const state = getState();
    const currentPage = state.favourites.page;

    // Simulate fake data and delay
    const fakeData = Array.from({ length: 6 }, (_, i) => ({
      id: `fake-${currentPage}-${i}`,
      name: `Item ${currentPage}-${i}`,
      image: 'https://via.placeholder.com/150', // use placeholder image
    }));

    await new Promise((res) => setTimeout(res, 1000)); // simulate delay

    return fakeData;
  }
);
