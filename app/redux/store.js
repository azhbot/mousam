import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import favouriteReducer from "./../redux/favourites/favouriteSlice";
import themeReducer from "./slices/themeSlice";
import fontReducer from "./slices/fontSlice"; // New font slice
import companyReducer from "./company/companySlice";
import addressReducer from "./address/addressSlice";
import userReducer from "./user/userSlice";
import orderReducer from "./order/orderSlice";
import sampleReducer from "./sample/sampleSlice";
import searchReducer from "./search/searchSlice";
import historyReducer from "./history/historySlice";
import paymentReducer from "./payment/paymentSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Root persist config for multiple slices
const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart"], // Persist both theme and font
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  favourites: favouriteReducer,
  address: addressReducer,
  theme: themeReducer,
  font: fontReducer,
  company: companyReducer,
  order: orderReducer,
  sample: sampleReducer,
  search: searchReducer,
  history: historyReducer,
  payment: paymentReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
