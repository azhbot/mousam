import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import CustomItemCard from "../../../components/itemCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo } from "react"; // ✅ Changed from useEffect to useMemo
import { useSelector } from "react-redux";
import { selectCompanyMap } from "../../../redux/company/companySelector";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import useProductActions from "../../../hooks/useProductActions";

const { width } = Dimensions.get("window");

// Calculate item sizes dynamically
const cardWidth = width * 0.45;

const SavedItemCards = ({ itemList }) => {
  const navigation = useNavigation();

  const companyMap = useSelector(selectCompanyMap);

  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  const { handleFavouritePress, handleCartPress } = useProductActions();

  useEffect(() => {
    console.log(companyMap.get(4), "in saveditemcard");
  }, [companyMap]);

  const renderItem = ({ item }) => {
    const isInCart = !!cartItemIdsMap?.[item.id];
    const isInFavourites = !!favouriteItemIdMap?.[item.id];
    return (
      <CustomItemCard
        width={cardWidth}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={itemList}
        keyExtractor={(item) => item.id?.toString()} // Try to use a real ID
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
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
});

export default SavedItemCards;
