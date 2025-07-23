import { createSlice } from '@reduxjs/toolkit';
// import { fetchFavouriteItems } from './favouriteThunks';

const initialState = {
  favouriteItems: [],
  loading: false,
  error: null,
  page: 1,
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.favouriteItems.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favouriteItems = state.favouriteItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearFavourites: (state) => {
      state.favouriteItems = [];
      state.page = 1;
      state.error = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchFavouriteItems.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchFavouriteItems.fulfilled, (state, action) => {
  //       state.favouriteItems.push(...action.payload);
  //       state.page += 1;
  //       state.loading = false;
  //     })
  //     .addCase(fetchFavouriteItems.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  // },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
