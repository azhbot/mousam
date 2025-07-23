import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomItemCard from "../../../components/itemCard";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import useProductActions from "../../../hooks/useProductActions";
import { selectProductState } from "../../../redux/product/productSelector";
import { fetchAllProducts } from "../../../redux/product/productThunks";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

const HomeItemCards = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { allProducts = [], allStatus } = useSelector(selectProductState);
  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  const { handleFavouritePress, handleCartPress } = useProductActions();

  // Fetch products on mount if needed
  useEffect(() => {
    if (allStatus === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [allStatus, dispatch]);

  const handleLoadMore = () => {
    if (allStatus !== "pending") {
      dispatch(fetchAllProducts());
    }
  };

  // useEffect(() => {
  //   console.log(allProducts, "in homeitemcards");
  // }, [allProducts]);

  const renderItem = ({ item }) => {
    const isInCart = !!cartItemIdsMap?.[item.id];
    const isInFavourites = !!favouriteItemIdMap?.[item.id];

    return (
      <CustomItemCard
        width={CARD_WIDTH}
        lineColor="#fff"
        item={item}
        isInCart={isInCart}
        isInFavourites={isInFavourites}
        handleItemCardPress={() =>
          navigation.navigate("productDetails", { productId: item.id })
        }
        handleCartPress={() => handleCartPress(item)}
        handleFavouritePress={() => handleFavouritePress(item)}
      />
    );
  };

  const renderFooter = () => {
    if (allStatus === "pending") {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={2}
        removeClippedSubviews
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    marginBottom: width * 0.033,
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default HomeItemCards;
