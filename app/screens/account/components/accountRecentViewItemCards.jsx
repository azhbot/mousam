import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import CustomImage from "../../../components/image";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import Icon from "../../../components/icon";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import useProductActions from "../../../hooks/useProductActions";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { selectProductState } from "../../../redux/product/productSelector";
import { icons } from "../../../constant/icons";

const { width } = Dimensions.get("window");

const AccountRecentViewItemCards = () => {
  const navigation = useNavigation();

  const cartItemIdMap = useSelector(selectCartItemIdsMap);
  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const { handleCartPress, handleFavouritePress } = useProductActions();

  const recentProducts = useSelector(selectProductState)?.recentProducts;

  useEffect(() => {
    console.log(recentProducts, "in account recentView items cards");
  }, [recentProducts]);

  // If no recent products, just render a smaller container with the message
  if (!recentProducts || recentProducts.length === 0) {
    return (
      <View style={[styles.container, styles.emptyOnlyContainer]}>
        <CustomLabel color="#888888" style={styles.emptyMessage}>
          No recent viewed products
        </CustomLabel>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomLabel color={colors.primary} fontFamily="interBold" fontSize={16}>
        Recent Views
      </CustomLabel>
      <FlatList
        data={recentProducts}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("productDetails", { productId: item.id })
            }
            style={[styles.specialItem, { width: width * 0.275 }]}
          >
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  handleFavouritePress(item);
                }}
                style={styles.heartIcon}
              >
                {!favouriteItemIdMap[item.id] ? (
                  <Icon
                    name="hearto"
                    library="antDesign"
                    size={16}
                    color={colors.primary}
                  />
                ) : (
                  <CustomImage source={icons.heartRed} size={20} />
                )}
              </TouchableOpacity>
              <CustomImage
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                resizeMode="contain"
                style={styles.image}
              />
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  handleCartPress(item);
                }}
                style={styles.cartIcon}
              >
                <Icon
                  name={cartItemIdMap[item.id] ? "cart" : "cart-outline"}
                  library="ionicons"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.veryLightGray,
  },
  emptyOnlyContainer: {
    paddingVertical: 10,
    marginTop: 10,
  },
  emptyMessage: {
    textAlign: "center",
  },
  specialItem: {
    height: 140,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  heartIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",

    zIndex: 10,
  },
  cartIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default AccountRecentViewItemCards;
