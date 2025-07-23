import { View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";

const XproductDetailsVariant = () => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const variants = ["one", "two", "three"];

  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="poppinsMedium">Select Variant</CustomLabel>
      <View style={styles.variantBoxes}>
        {variants.map((item, index) => (
          <View key={index.toString()} style={styles.variantBox}>
            <Pressable
              onPress={() => setSelectedVariant(item)}
              style={[
                styles.box,
                selectedVariant === item && styles.selectedBox,
              ]}
            />
            <CustomLabel fontFamily="interMedium" fontSize={12}>
              {item}
            </CustomLabel>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  variantBoxes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  variantBox: {
    alignItems: "center",
  },
  box: {
    width: 60,
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedBox: {
    borderColor: "blue", // Change to any color you like
  },
});

export default XproductDetailsVariant;
