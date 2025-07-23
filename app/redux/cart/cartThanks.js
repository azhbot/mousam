import { addNewItemToCart, decreaseItemQuantity, removeItemFromCart } from "./cartSlice";

export const toggleCartItem = (item) => (dispatch, getState) => {
    const state = getState();
    const isAlreadyInCart = state.cart.cartItems.some(cartItem => cartItem.id === item.id);
  
    if (isAlreadyInCart) {
      dispatch(removeItemFromCart(item.id));
      return false;
    } else {
      dispatch(addNewItemToCart(item));
      return true;
    }
  };