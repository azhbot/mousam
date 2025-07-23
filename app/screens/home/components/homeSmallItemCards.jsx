import React, { useCallback } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomItemCard from "../../../components/itemCard";
import { cardList } from "../../../constant/data";
import { useSelector } from "react-redux";
import { selectCompanyMap } from "../../../redux/company/companySelector";
import useProductActions from "../../../hooks/useProductActions";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";

const { width, height } = Dimensions.get("window");

const HomeSmallItemCards = () => {
  const navigation = useNavigation();

  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);
  const companyMap = useSelector(selectCompanyMap);

  const { handleCartPress, handleFavouritePress } = useProductActions();

  const renderItem = useCallback(
    ({ item }) => (
      <CustomItemCard
        small={true}
        width={width * 0.306}
        lineColor="#fff"
        companyNameSize="small"
        handleItemCardPress={() =>
          navigation.navigate("productDetails", { productId: item.id })
        }
        handleCartPress={handleCartPress}
        handleFavouritePress={handleFavouritePress}
        source={item?.image}
        item={item}
        company={
          companyMap.get
            ? companyMap.get(item.companyId)
            : companyMap[item.companyId]
        }
        isInCart={!!cartItemIdsMap[item.id]}
        isInFavourites={!!favouriteItemIdMap[item.id]}
      />
    ),
    [
      navigation,
      handleCartPress,
      handleFavouritePress,
      companyMap,
      cartItemIdsMap,
      favouriteItemIdMap,
    ]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cardList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.02,
    marginBottom: width * 0.02,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: width * 0.02,
  },
});

export default HomeSmallItemCards;
