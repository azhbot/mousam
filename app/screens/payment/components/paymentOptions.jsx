import { View, StyleSheet, Pressable } from "react-native";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";

const PaymentOptions = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("pressed")} style={styles.option}>
        <View style={styles.box}>
          <Icon
            color={colors.primary}
            name="card-account-details-outline"
            size={40}
          />
          <CustomLabel fontFamily="interMedium">Credit/Debit Card</CustomLabel>
        </View>
        <Icon color={colors.primary} name="chevron-right" />
      </Pressable>
      <Pressable onPress={() => console.log("pressed")} style={styles.option}>
        <View style={styles.box}>
          <Icon color={colors.primary} name="bank" size={40} />
          <CustomLabel fontFamily="interMedium">Net Banking</CustomLabel>
        </View>
        <Icon color={colors.primary} name="chevron-right" />
      </Pressable>
      <Pressable onPress={() => console.log("pressed")} style={styles.option}>
        <View style={styles.box}>
          <Icon color={colors.primary} name="wallet-outline" size={40} />
          <CustomLabel fontFamily="interMedium">Wallets</CustomLabel>
        </View>
        <Icon color={colors.primary} name="chevron-right" />
      </Pressable>
      <Pressable onPress={() => console.log("pressed")} style={styles.option}>
        <View style={styles.box}>
          <Icon color={colors.primary} name="cash-fast" size={40} />
          <CustomLabel fontFamily="interMedium">UPI</CustomLabel>
        </View>
        <Icon color={colors.primary} name="chevron-right" />
      </Pressable>
      <Pressable onPress={() => console.log("pressed")} style={styles.option}>
        <View style={styles.box}>
          <Icon color={colors.primary} name="cash" size={40} />
          <CustomLabel fontFamily="interMedium">Cash on Delivery</CustomLabel>
        </View>
        <Icon color={colors.primary} name="chevron-right" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    gap: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default PaymentOptions;
