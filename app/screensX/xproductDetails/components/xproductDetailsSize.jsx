import { View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const XproductDetailsSize = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["L", "XL", "XXL"];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => console.log("size chart pressed")}
        style={styles.sizeChart}
      >
        <CustomLabel>Size Chart</CustomLabel>
        <Icon name="chevron-right" />
      </Pressable>

      <View style={styles.sizeBoxes}>
        <CustomLabel fontFamily="interMedium">Size</CustomLabel>
        {sizes.map((item, index) => (
          <Pressable
            key={index.toString()}
            onPress={() => setSelectedSize(item)}
            style={[
              styles.sizeBox,
              selectedSize === item && styles.selectedSizeBox, // Apply different color when selected
            ]}
          >
            <CustomLabel>{item}</CustomLabel>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  sizeChart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  sizeBoxes: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  sizeBox: {
    height: 30,
    width: 60,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  selectedSizeBox: {
    backgroundColor: colors.tertiary, // Change this color for selected size
  },
});

export default XproductDetailsSize;
