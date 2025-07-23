import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
   
     userPIN:"" ,
    name: "Azhar",
    email: "azhar@gmail.com",
    phone: "6296963083",
    id: 943539,

  },
  userVerifiedSamples: [{productId:10,isVerified:false}], // Array of { productId, isVerified }

 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.userVerifiedSamples = [];
    },
    addVerifiedSample: (state, action) => {
      const { productId, isVerified } = action.payload;

      const existingIndex = state.userVerifiedSamples.findIndex(
        (sample) => sample.productId === productId
      );

      if (existingIndex ) {
        state.userVerifiedSamples[existingIndex].isVerified = isVerified;
      } else {
        state.userVerifiedSamples.push({ productId, isVerified });
      }
    },
    removeVerifiedSample: (state, action) => {
      const productIdToRemove = action.payload;

      state.userVerifiedSamples = state.userVerifiedSamples.filter(
        (sample) => sample.productId !== productIdToRemove
      );
    },
   createUserPIN:(state,action)=>{
  state.user.userPIN=action.payload

   }
  },
});

export const {
  setUser,
  clearUser,
  addVerifiedSample,
  removeVerifiedSample,
  promoteUser,
  createUserPIN,
} = userSlice.actions;

export default userSlice.reducer;
