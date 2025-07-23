import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import CustomItemCard from "../../../components/itemCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { cardList } from "../../../constant/data";
import { useEffect } from "react";
import {
  addNewItemToCart,
  toggleCartItem,
} from "../../../redux/cart/cartSlice";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { showToast } from "../../../components/toast";
import { toggleFavouriteItem } from "../../../redux/favourites/favouriteSlice";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import useProductActions from "../../../hooks/useProductActions";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

const SearchItemCards = ({ cardList, filteredList }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { handleCartPress, handleFavouritePress } = useProductActions();
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);
  const favouriteItemsMap = useSelector(selectFavouriteItemIdMap);

  const renderItem = ({ item }) => (
    <CustomItemCard
      width={width * 0.465}
      height={height * 0.27}
      lineColor="#fff"
      handleItemCardPress={() =>
        navigation.navigate("productDetails", { item })
      }
      handleCartPress={() => handleCartPress(item)}
      handleFavouritePress={() => handleFavouritePress(item)}
      source={item?.image}
      item={item}
      isInCart={cartItemIdsMap[item.id] || false}
      isInFavourites={favouriteItemsMap[item.id] || false}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={2}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 4, // Ensures spacing between rows
  },
});

export default SearchItemCards;
