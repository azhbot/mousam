import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";

const CartGrabAllButton = ({ charges, totalOrderValue, onGrabAll }) => {
  const navigation = useNavigation();

  const handlePay = () => {
    navigation.navigate("payment", { charges });
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.box}>
          <CustomLabel fontFamily="interMedium" fontSize={12}>
            Pay
          </CustomLabel>
          <CustomLabel fontSize={12}>
            Rs {charges?.platformFee + charges?.deliveryCharge}
          </CustomLabel>
        </View>
        <View style={styles.box}>
          <CustomLabel fontFamily="interMedium" fontSize={12}>
            Order Value
          </CustomLabel>
          <CustomLabel fontSize={12}>Rs {totalOrderValue || 0}</CustomLabel>
        </View>
      </View>

      <View style={styles.right}>
        <Pressable onPress={onGrabAll} style={styles.button}>
          <CustomLabel fontFamily="interBold" fontSize={14}>
            Grab All
          </CustomLabel>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    borderColor: colors.primary,
    borderWidth: 1,
    height: 60,
  },
  left: {
    padding: 5,
    flex: 0.4,
    flexDirection: "row",
  },
  payButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    padding: 10,
    flex: 0.6,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartGrabAllButton;
