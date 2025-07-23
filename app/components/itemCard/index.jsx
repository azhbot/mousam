import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Icon from "../icon";
import CustomImage from "../image";
import CustomLabel from "../label";
import VerifiedCompanyName from "../verifiedCompany";
import { colors } from "../../constant/colors";
import { icons } from "../../constant/icons";

const CustomItemCard = ({
  width,
  color = colors.secondary,
  companyNameSize,
  lineColor = "#eee",
  handleCartPress = () => {},
  handleItemCardPress = () => {},
  handleFavouritePress = () => {},
  item = {},
  isInCart = false,
  isInFavourites = false,
  small = false,
}) => {
  const {
    image,
    cost = "100/Pcs",
    name = "Name",
    companyName,
    companyLogo,
  } = item;

  return (
    <Pressable
      onPress={handleItemCardPress}
      style={({ pressed }) => [
        styles.itemCard,
        {
          width,

          backgroundColor: color,
          aspectRatio: small ? 2 / 3 : 3 / 4,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      {/* Top Section - Image and Icons */}
      <View style={styles.imageContainer}>
        {/* Favourite Icon */}
        <Pressable
          android_ripple={{ color: colors.tertiary }}
          onPress={() => handleFavouritePress(item)}
          style={[
            styles.iconWrapperTopRight,
            { height: small ? 30 : 40, width: small ? 30 : 40 },
          ]}
        >
          {!isInFavourites ? (
            <Icon
              name={"hearto"}
              library="antDesign"
              size={16}
              color={"#000"}
            />
          ) : (
            <CustomImage source={icons.heartRed} size={20} />
          )}
        </Pressable>

        {/* Product Image */}
        <CustomImage source={image} resizeMode="contain" style={styles.image} />

        {/* Cart Icon */}
        <Pressable
          android_ripple={{ color: colors.tertiary }}
          onPress={() => handleCartPress(item)}
          style={[
            styles.iconWrapperBottomRight,
            { height: small ? 30 : 40, width: small ? 30 : 40 },
          ]}
        >
          <Icon
            name={isInCart ? "cart" : "cart-outline"}
            library="ionicons"
            size={16}
            color={isInCart ? colors.primary : "#000"}
          />
        </Pressable>
      </View>

      {/* Line Separator */}
      <View style={[styles.line, { backgroundColor: lineColor }]} />

      {/* Bottom Section - Text */}
      <View style={styles.textContainer}>
        <CustomLabel
          fontFamily="poppinsBold"
          fontSize={small ? 8 : 10}
          numberOfLines={1}
        >
          Rs {cost}
        </CustomLabel>
        <CustomLabel
          fontFamily="poppinsMedium"
          fontSize={small ? 8 : 10}
          numberOfLines={1}
        >
          {name}
        </CustomLabel>
        <VerifiedCompanyName
          companyNameSize={companyNameSize}
          companyName={companyName}
          source={companyLogo}
          verified={true}
          companyWidth={width * 0.8}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "70%",
  },
  iconWrapperTopRight: {
    position: "absolute",
    top: 10,
    right: 10,

    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  iconWrapperBottomRight: {
    position: "absolute",
    bottom: 10,
    right: 10,

    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  line: {
    height: 1,
    width: "100%",
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

// Memoize for performance in FlatLists
export default React.memo(CustomItemCard);
