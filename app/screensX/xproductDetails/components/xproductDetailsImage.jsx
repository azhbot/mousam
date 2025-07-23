import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
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

const XproductDetailsImage = ({ productDetail, productImages }) => {
  const { handleCartPress, handleFavouritePress } = useProductActions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const favouriteItemIdMap = useSelector(selectFavouriteItemIdMap);
  const cartItemIdsMap = useSelector(selectCartItemIdsMap);

  // Use productDetail directly instead of searching in redux products list
  const product = productDetail;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleShare = () => {
    Share.share({
      title: "Share product",
      message: `Check out this product: ${product?.name || "Awesome product"}!`,
    });
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={productImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={({ nativeEvent }) =>
          setCurrentIndex(Math.round(nativeEvent.contentOffset.x / width))
        }
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

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {productImages?.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? colors.red : "#ccc" },
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
    bottom: 50,
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

export default XproductDetailsImage;
