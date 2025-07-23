import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import CustomItemCard from "../../../components/itemCard";
import CustomLabel from "../../../components/label";
import { useNavigation } from "@react-navigation/native";
import useProductActions from "../../../hooks/useProductActions";
import { useSelector } from "react-redux";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { products } from "../../../data/products";
import { selectCompanyMap } from "../../../redux/company/companySelector";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

const ProductDetailsItemCards = () => {
  const navigation = useNavigation();
  const { handleCartPress, handleFavouritePress } = useProductActions();

  const cartProductsMap = useSelector(selectCartItemIdsMap);
  const favouriteProductsMap = useSelector(selectFavouriteItemIdMap);
  const companyMap = useSelector(selectCompanyMap);

  const handleItemCardPress = useCallback(
    (item) => navigation.push("productDetails", { productId: item.id }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <CustomItemCard
        width={CARD_WIDTH}
        lineColor="#fff"
        handleItemCardPress={() => handleItemCardPress(item)}
        handleCartPress={() => handleCartPress(item)}
        handleFavouritePress={() => handleFavouritePress(item)}
        item={item}
        source={item?.image}
        company={companyMap.get(item.companyId)}
        isInCart={cartProductsMap[item.id] || false}
        isInFavourites={favouriteProductsMap[item.id] || false}
      />
    ),
    [
      handleItemCardPress,
      handleCartPress,
      handleFavouritePress,
      cartProductsMap,
      favouriteProductsMap,
      companyMap,
    ]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <CustomLabel
        fontFamily="poppinsMedium"
        fontSize={16}
        style={{ padding: 10, paddingBottom: 5 }}
      >
        Explore More Like This
      </CustomLabel>
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        windowSize={7}
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
    justifyContent: "space-evenly",
    marginBottom: width * 0.033,
  },
});

export default ProductDetailsItemCards;
