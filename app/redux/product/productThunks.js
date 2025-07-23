import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFakeProducts } from "../../utils/fake";
import { generateFilterKey } from "../../utils/generateFilterKey";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { product } = getState();
      const currentPage = product.allProductsPage;
      const itemsPerPage = 6;

      const data = await getFakeProducts(currentPage, itemsPerPage);

      const hasMore = data.length === itemsPerPage;
      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to fetch all products");
    }
  }
);


export const fetchFilteredProducts = createAsyncThunk(
  "product/fetchFilteredProducts",
  async ({ categoryId, companyId, subCategoryId,sortId }, { getState, rejectWithValue }) => {
    const { product } = getState();
    const key = generateFilterKey({categoryId, companyId, subCategoryId,sortId});
    const cache = product.filteredProductsCache[key];
    const page = cache ? cache.lastFetchedPage + 1 : 1;

    // If no more data to fetch, skip
    if (cache && !cache.hasMore) {
      return rejectWithValue({ skipped: true });
    }

    try {
      const itemsPerPage = 6;
      const data = await getFakeProducts(page, itemsPerPage, categoryId, companyId, subCategoryId,sortId);
      const hasMore = data.length === itemsPerPage;

      return {
        key,
        page,
        data,
        hasMore,
      };
    } catch (error) {
      console.error("Error fetching filtered products:", error); // Log the actual error
      return rejectWithValue({ message: "Failed to fetch filtered products" });
    }
  }
);

