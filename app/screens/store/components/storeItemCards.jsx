import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import CustomItemCard from "../../../components/itemCard";
import StoreStore from "./storeStore";
import StoreSort from "./storeSort";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import Loading from "../../../components/loading";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { useSelector } from "react-redux";
import useProductActions from "../../../hooks/useProductActions";

const { width, height } = Dimensions.get("window");
const cardWidth = width * 0.45;

const StoreItemCards = ({
  companyProducts,
  company,
  handleFetchMore = () => {},
  handleSort,
  isLoading,
  isError,
  setLoadingOverlay,
}) => {
  const navigation = useNavigation();

  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  const { handleFavouritePress, handleCartPress } = useProductActions();

  const renderItem = ({ item }) => {
    const isInCart = !!cartItemIdsMap?.[item.id];
    const isInFavourites = !!favouriteItemIdMap?.[item.id];
    return (
      <CustomItemCard
        width={cardWidth}
        lineColor={"#fff"}
        handleItemCardPress={() =>
          navigation.navigate("productDetails", { productId: item.id })
        }
        item={item}
        source={item.image}
        company={company}
        isInCart={isInCart}
        isInFavourites={isInFavourites}
        handleCartPress={() => handleCartPress(item)}
        handleFavouritePress={() => handleFavouritePress(item)}
      />
    );
  };

  const keyExtractor = useCallback(
    (item) => item.id?.toString() || item.name + Math.random(),
    []
  );

  const renderEmptyComponent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Failed to load products.</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StoreStore company={company} setLoadingOverlay={setLoadingOverlay} />
      <StoreSort handleSort={handleSort} />

      <FlatList
        data={companyProducts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleFetchMore}
        ListEmptyComponent={renderEmptyComponent}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  columnWrapper: {
    justifyContent: "space-evenly",
    marginBottom: width * 0.033,
  },
  listContainer: {
    marginTop: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});

export default StoreItemCards;
