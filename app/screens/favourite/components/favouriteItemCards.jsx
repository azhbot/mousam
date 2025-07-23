import { useDispatch, useSelector } from "react-redux";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { toggleFavouriteItem } from "../../../redux/favourites/favouriteThunks";
import { showToast } from "../../../components/toast";
import CustomItemCard from "../../../components/itemCard";
import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { toggleCartItem } from "../../../redux/cart/cartThanks"; // Make sure this is not a typo and the file is actually named cartThanks

const { width, height } = Dimensions.get("window");

const FavouriteItemCards = ({ favouriteItems, handleLoadMore, loading }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favouritesMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  const handleCartPress = (item) => {
    const result = dispatch(toggleCartItem(item));
    if (result?.type?.includes("fulfilled")) {
      const isAdding = !cartItemIdsMap[item.id];
      showToast(
        "success",
        isAdding ? "added" : "removed",
        `${item.name} ${isAdding ? "added to" : "removed from"} cart`
      );
    }
  };

  const handleFavouritePress = (item) => {
    const result = dispatch(toggleFavouriteItem(item));
    if (result?.type?.includes("fulfilled")) {
      const isAdding = !favouritesMap[item.id];
      showToast(
        "success",
        isAdding ? "added" : "removed",
        `${item.name} ${isAdding ? "added to" : "removed from"} favourites`
      );
    }
  };

  const renderItem = ({ item }) => (
    <CustomItemCard
      width={width * 0.45}
      lineColor="#fff"
      handleItemCardPress={() =>
        navigation.navigate("productDetails", { productId: item?.id })
      }
      handleCartPress={() => handleCartPress(item)}
      handleFavouritePress={() => handleFavouritePress(item)}
      source={item?.image}
      item={item}
      isInCart={cartItemIdsMap[item.id] || false}
      isInFavourites={favouritesMap[item.id] || false}
    />
  );

  const renderFooter = () =>
    loading ? <ActivityIndicator style={{ margin: 20 }} /> : null;

  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={4}
        windowSize={2}
        removeClippedSubviews={true}
        ListFooterComponent={renderFooter}
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

export default FavouriteItemCards;
