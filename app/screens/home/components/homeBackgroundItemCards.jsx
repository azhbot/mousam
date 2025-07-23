import React, { useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import CustomItemCard from "../../../components/itemCard";
import { colors } from "../../../constant/colors";
import { selectProductState } from "../../../redux/product/productSelector";
import { fetchAllProducts } from "../../../redux/product/productThunks";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import useProductActions from "../../../hooks/useProductActions";

const { width, height } = Dimensions.get("window");

const HomeBackgroundItemCards = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { allProducts, allStatus, hasMoreAll } =
    useSelector(selectProductState);
  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  const { handleFavouritePress, handleCartPress } = useProductActions();

  // Initial fetch on component mount or when status is idle
  useEffect(() => {
    if (allStatus === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [allStatus, dispatch]);

  // Load more products when user scrolls near the end
  const handleLoadMore = useCallback(() => {
    if (allStatus !== "pending" && hasMoreAll) {
      console.log("Loading more products...");
      dispatch(fetchAllProducts());
    }
  }, [allStatus, hasMoreAll, dispatch]);

  const renderItem = useCallback(
    ({ item }) => (
      <CustomItemCard
        color="#fff"
        width={width * 0.42}
        lineColor={colors.LightGray}
        handleItemCardPress={() =>
          navigation.navigate("productDetails", { productId: item.id })
        }
        item={item}
        handleCartPress={() => handleCartPress(item)}
        handleFavouritePress={() => handleFavouritePress(item)}
        isInFavourites={!!favouriteItemIdMap[item.id]}
        isInCart={!!cartItemIdsMap[item.id]}
      />
    ),
    [
      navigation,
      handleCartPress,
      handleFavouritePress,
      favouriteItemIdMap,
      cartItemIdsMap,
    ]
  );

  const renderFooter = () => {
    if (allStatus === "pending") {
      return (
        <View />
        // <View style={styles.footerContainer}>
        //   {/* <ActivityIndicator size="large" color="red" /> */}
        // </View>
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
        // onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.02,
    paddingBottom: width * 0.034,
    marginBottom: 15,
    borderRadius: 10,
    flex: 1,
    backgroundColor: colors.primary,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    marginTop: width * 0.034,
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default HomeBackgroundItemCards;
