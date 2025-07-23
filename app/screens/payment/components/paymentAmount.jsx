import { View, StyleSheet, Pressable, Animated } from "react-native";

import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import CustomLine from "../../../components/line";
import { colors } from "../../../constant/colors";
import { useState, useRef, useEffect } from "react";

const PaymentAmount = ({ charges }) => {
  const [isShowAll, setIsShowAll] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isShowAll ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // ✅ Fix: Must be false for layout animations
    }).start();
  }, [isShowAll]);

  // Instead of animating `height`, interpolate `maxHeight`
  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust 100 based on your content height
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Pressable
      onPress={() => setIsShowAll((prev) => !prev)}
      style={styles.container}
    >
      <View style={styles.box}>
        <View style={styles.totalAmount}>
          <CustomLabel color="#fff" fontFamily="interBold">
            Total Amount
          </CustomLabel>
          <Icon color="#fff" name={isShowAll ? "chevron-up" : "chevron-down"} />
        </View>
        <CustomLabel color="#fff">
          Rs {charges?.platformFee + charges?.deliveryCharge}
        </CustomLabel>
      </View>

      <Animated.View style={[styles.animatedBox, { maxHeight, opacity }]}>
        <CustomLine color="#fff" />
        <View style={styles.box}>
          <CustomLabel color="#fff">Platform Fee</CustomLabel>
          <CustomLabel color="#fff">Rs {charges?.platformFee}</CustomLabel>
        </View>
        <View style={styles.box}>
          <CustomLabel color="#fff">Delivery Charge</CustomLabel>
          <CustomLabel color="#fff">Rs{charges?.deliveryCharge}</CustomLabel>
        </View>
        <View style={{ height: 5 }} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    padding: 10,

    backgroundColor: colors.primary,
    borderRadius: 10,
    gap: 10,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  animatedBox: {
    overflow: "hidden",
    gap: 10,
  },
});

export default PaymentAmount;
