import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import CustomImage from "../../../components/image";
import Icon from "../../../components/icon";
import { images } from "../../../constant/images";
import { colors } from "../../../constant/colors";
import { useSelector } from "react-redux";
import { selectFavouriteItemIdMap } from "../../../redux/favourites/favouriteSelector";
import { selectCartItemIdsMap } from "../../../redux/cart/cartSelectors";
import useProductActions from "../../../hooks/useProductActions";

const { width, height } = Dimensions.get("window");

const ProductDetailsImage = ({ productDetail, productImages, condition }) => {
  const { handleCartPress, handleFavouritePress } = useProductActions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  const product = productDetail;

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={productImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const newIndex = Math.round(nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <CustomImage
              source={
                typeof item === "string"
                  ? { uri: item }
                  : item || images.noImage
              }
              size={height * 0.45}
            />
          </View>
        )}
      />

      {/* Favourite Icon */}
      {condition && (
        <View style={styles.iconWrapperTop}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => handleFavouritePress(product)}
          >
            <Icon
              name={favouriteItemIdMap[product.id] ? "heart" : "hearto"}
              library="antDesign"
              size={20}
              color={favouriteItemIdMap[product.id] ? colors.red : "#000"}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* Share Icon */}
      {condition && (
        <View style={styles.iconWrapperMiddle}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() =>
              Share.share({
                title: "Share product",
                message: `Check out this product: ${
                  product?.name || "Awesome product"
                }!`,
              })
            }
          >
            <Icon name="share-outline" size={20} />
          </TouchableOpacity>
        </View>
      )}

      {/* Cart Icon */}
      {condition && (
        <View style={styles.iconWrapperBottom}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => handleCartPress(product)}
          >
            <Icon
              name={cartItemIdsMap[product.id] ? "cart" : "cart-outline"}
              library="ionicons"
              size={20}
              color={cartItemIdsMap[product.id] ? colors.primary : "#000"}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {productImages?.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? colors.red : "#fff" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.45,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imageContainer: {
    width,
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  iconWrapperTop: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
  },
  iconWrapperMiddle: {
    position: "absolute",
    top: 70,
    right: 10,
    zIndex: 20,
  },
  iconWrapperBottom: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default ProductDetailsImage;
