import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProductDetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={styles.bar} />
      <ShimmerPlaceholder style={styles.image} />
      <ShimmerPlaceholder style={styles.textBlock} />
      <ShimmerPlaceholder style={styles.textBlockSmall} />
      <ShimmerPlaceholder style={styles.section} />
      <ShimmerPlaceholder style={styles.section} />
      <ShimmerPlaceholder style={styles.section} />
      <ShimmerPlaceholder style={styles.section} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  bar: {
    height: 40,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
  },
  image: {
    height: "40%",
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
  },
  textBlock: {
    height: 20,
    borderRadius: 6,
    marginBottom: 10,
    width: "100%",
  },
  textBlockSmall: {
    height: 16,

    borderRadius: 6,
    marginBottom: 16,
    width: "100%",
  },
  section: {
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
});

export default ProductDetailsSkeleton;
