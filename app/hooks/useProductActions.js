import { useDispatch } from "react-redux";
import { toggleFavouriteItem } from "../redux/favourites/favouriteThunks";
import { toggleCartItem } from "../redux/cart/cartThanks";
import { showToast } from "../components/toast";

const useProductActions = () => {
  const dispatch = useDispatch();

  const handleFavouritePress = (item) => {
    const wasAdded = dispatch(toggleFavouriteItem(item));

    if (wasAdded) {
      showToast("success", "Added", `${item.name} added to favourites!`);
    } else {
      showToast("success", "Removed", `${item.name} removed from favourites.`);
    }
  };

  const handleCartPress = (item) => {
    // const toggleItem={
    //   id:item?.id,
    //   name:item?.name,
    //   cost:item?.cost,
    //   image:item?.image,


    // }
    const wasAdded = dispatch(toggleCartItem({...item,quantity:1000}));     /// i set quantity here 

    if (wasAdded) {
      showToast("success", "Added", `${item.name} added to cart!`);
    } else {
      showToast("success", "Removed", `${item.name} removed from cart.`);
    }
  };

  return { handleFavouritePress, handleCartPress };
};

export default useProductActions;
