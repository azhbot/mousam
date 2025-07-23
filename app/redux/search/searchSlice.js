import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searches: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      // Prevent duplicates (optional)
      if (!state.searches.includes(action.payload)) {
        state.searches.push(action.payload);
      }
    },
    removeSearch: (state, action) => {
      state.searches = state.searches.filter(
        (item) => item !== action.payload
      );
    },
    clearSearches: (state) => {
      state.searches = [];
    }
  }
});

export const {
  addSearch,
  removeSearch,
  clearSearches
} = searchSlice.actions;

export default searchSlice.reducer;
