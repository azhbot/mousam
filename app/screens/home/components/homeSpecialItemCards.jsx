import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import CustomImage from "../../../components/image";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { cardList } from "../../../constant/data";
import useProductActions from "../../../hooks/useProductActions";
import { useSelector } from "react-redux";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { icons } from "../../../constant/icons";

const { width } = Dimensions.get("window");

const ItemCard = React.memo(
  ({
    item,
    cartItemIdsMap,
    favouriteItemIdMap,
    onPressCard,
    onPressCart,
    onPressFavourite,
  }) => {
    return (
      <Pressable
        onPress={() => onPressCard(item.id)}
        style={[styles.specialItem, { width: width * 0.275 }]}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${item.name || "product"}`}
      >
        {/* Heart Icon */}
        <View style={styles.heartIconWrapper}>
          <Pressable
            android_ripple={{ color: colors.tertiary }}
            onPress={() => onPressFavourite(item)}
            style={styles.heartIcon}
            accessibilityRole="button"
            accessibilityLabel={
              favouriteItemIdMap[item.id]
                ? "Remove from favourites"
                : "Add to favourites"
            }
          >
            {!favouriteItemIdMap[item.id] ? (
              <Icon
                name={"hearto"}
                library="antDesign"
                size={16}
                color={colors.primary}
              />
            ) : (
              <CustomImage source={icons.heartRed} size={20} />
            )}
          </Pressable>
        </View>

        {/* Image */}
        <CustomImage
          source={item.image}
          resizeMode="contain"
          style={styles.image}
        />

        {/* Cart Icon */}
        <View style={styles.cartIconWrapper}>
          <Pressable
            android_ripple={{ color: colors.tertiary }}
            onPress={() => onPressCart(item)}
            style={styles.cartIcon}
            accessibilityRole="button"
            accessibilityLabel={
              cartItemIdsMap[item.id] ? "Remove from cart" : "Add to cart"
            }
          >
            <Icon
              name={cartItemIdsMap[item.id] ? "cart" : "cart-outline"}
              library="ionicons"
              size={16}
              color={cartItemIdsMap[item.id] ? colors.primary : "#000"}
            />
          </Pressable>
        </View>
      </Pressable>
    );
  }
);

const HomeSpecialItemCards = () => {
  const navigation = useNavigation();
  const { handleCartPress, handleFavouritePress } = useProductActions();

  const cartItemIdsMap = useSelector(selectCartItemIdsMap);
  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);

  const onPressCard = (id) =>
    navigation.navigate("productDetails", { productId: id });

  return (
    <View style={styles.container}>
      <CustomLabel color="#fff" fontFamily="interBold" fontSize={16}>
        Best Of 2025
      </CustomLabel>
      <FlatList
        data={cardList}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            cartItemIdsMap={cartItemIdsMap}
            favouriteItemIdMap={favouriteItemIdMap}
            onPressCard={onPressCard}
            onPressCart={handleCartPress}
            onPressFavourite={handleFavouritePress}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: width * 0.02,
  },
  specialItem: {
    height: 140,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "green",
    position: "relative",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  heartIconWrapper: {
    padding: 20,
    paddingTop: 0,
    paddingRight: 0,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 20,
  },
  heartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cartIconWrapper: {
    padding: 20,
    paddingBottom: 0,
    paddingRight: 0,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 20,
  },
  cartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeSpecialItemCards;
