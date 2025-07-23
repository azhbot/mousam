import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredProducts, fetchAllProducts } from "./productThunks";
import { productDetails } from "../../data/productsDetails";

const initialState = {
  allProducts: [],
  productDetails:productDetails,    // it should not be like this 
  allStatus: "idle", 
  allProductsPage: 1,
  hasMoreAll: true,
  recentProducts:[],

  filteredStatus: "idle",
  filteredProductsCache: {}, // 👈 { filterKey: { pages: {1: [...], 2: [...]}, hasMore: true } }
};


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers:{
    addToAllProducts:(state,action)=>{
      state.productDetails.push(action.payload)
      state.allProducts.push(action.payload)
    },
addToRecentProducts:(state,action)=>{
  const isRecentProduct= state.recentProducts.find(item=>item?.id===action.payload?.id)
  if(!isRecentProduct){
    state.recentProducts.push(action.payload)
  }
},
addComment: (state, action) => {
  const { productId, comment } = action.payload;
  const updatedProducts = state.productDetails.map(product => {
    if (product.id === productId) {
      return {
        ...product,
        comments: [...(product.comments || []), comment], // Ensure comments exists
      };
    }
    return product;
  });

  state.productDetails = updatedProducts;
}

  },

  extraReducers: (builder) => {
    builder
    // for all
    .addCase(fetchAllProducts.pending,(state)=>{
      state.allStatus="pending"
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      const { data, hasMore } = action.payload;
    
      state.allProducts.push(...data); // 👈 Append new items to the array
    
      state.hasMoreAll = hasMore;
      state.allProductsPage+=1
      state.allStatus = "fulfilled";
    })
    
    .addCase(fetchAllProducts.rejected,(state)=>{
      state.allStatus="rejected"
    })
    // for filtered 
    .addCase(fetchFilteredProducts.pending, (state) => {
      state.filteredStatus = "pending";
    })
    .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      const { key, page, data, hasMore } = action.payload;
    
      if (!state.filteredProductsCache[key]) {
        state.filteredProductsCache[key] = {
          pages: {},
          lastFetchedPage: 0,
          hasMore: true,
        };
      }
    
      state.filteredProductsCache[key].pages[page] = data;
      state.filteredProductsCache[key].lastFetchedPage = page;
      state.filteredProductsCache[key].hasMore = hasMore;
      state.filteredStatus = "fulfilled";
    })
    .addCase(fetchFilteredProducts.rejected, (state, action) => {
      if (action.payload?.skipped) {
        state.filteredStatus = "fulfilled"; // or "idle", depending on your logic
        return;
      }
      state.filteredStatus = "rejected";
    });
    
    
    
  },
});

export const { addToRecentProducts,addToAllProducts,addComment } = productSlice.actions;
export default productSlice.reducer;
