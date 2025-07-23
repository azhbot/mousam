import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomItemCard from "../../../components/itemCard";
import { useEffect } from "react";
import CustomLabel from "../../../components/label";
import Loading from "../../../components/loading";
import useProductActions from "../../../hooks/useProductActions";
import { useSelector } from "react-redux";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";

const width = Dimensions.get("window").width;

const CARD_WIDTH = width * 0.45;

const ProductItemCards = ({ products, status, handleFetchMore }) => {
  const navigation = useNavigation();

  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  const { handleFavouritePress, handleCartPress } = useProductActions();

  // useEffect(() => {
  //   console.log(products.length, "in productItemCards");
  // }, [products]);

  const renderFooter = () => {
    if (status === "pending") {
      return <Loading />;
    }

    if (status === "rejected") {
      return (
        <View style={styles.footer}>
          <CustomLabel color="#888888" fontSize={16}>
            Failed to load more products.
          </CustomLabel>
        </View>
      );
    }

    return null;
  };

  const renderItem = ({ item, index }) => {
    const isInCart = !!cartItemIdsMap?.[item.id];
    const isInFavourites = !!favouriteItemIdMap?.[item.id];
    return (
      <CustomItemCard
        key={index}
        width={CARD_WIDTH}
        lineColor={"#fff"}
        item={item}
        source={item.image}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    marginBottom: width * 0.033,
  },
  listContainer: {
    paddingBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductItemCards;
