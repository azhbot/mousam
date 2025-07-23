import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomLine from "../../../components/line";
import { colors } from "../../../constant/colors";
import Icon from "../../../components/icon";

const CartPrices = ({ cartProducts, totalOrderValue, charges }) => {
  const platformFee = charges?.platformFee || 0;
  const deliveryCharge = charges?.deliveryCharge || 0;
  const totalAmount = platformFee + deliveryCharge;

  return (
    <View>
      <View style={styles.container}>
        <CustomLabel fontFamily="interMedium" fontSize={16}>
          Price details
        </CustomLabel>

        {cartProducts?.map((item, index) => (
          <View style={styles.box} key={item.id}>
            <CustomLabel fontFamily="interMedium">
              {`Price (Product ${index + 1}): ${item?.quantity} x`}
            </CustomLabel>
            <CustomLabel fontFamily="interMedium">
              Rs {item?.cost * item?.quantity}
            </CustomLabel>
          </View>
        ))}

        <CustomLine color={colors.LightGray} />

        <View style={styles.box}>
          <CustomLabel fontFamily="interBold">Total Order Value</CustomLabel>
          <CustomLabel fontFamily="interBold">Rs {totalOrderValue}</CustomLabel>
        </View>

        <CustomLine color="rgba(0,0,0,0)" height={15} />

        <View style={styles.box}>
          <CustomLabel fontFamily="interMedium">Platform Fee</CustomLabel>
          <CustomLabel fontFamily="interMedium">Rs {platformFee}</CustomLabel>
        </View>

        <View style={styles.box}>
          <CustomLabel fontFamily="interMedium">Delivery Charge</CustomLabel>
          <CustomLabel fontFamily="interMedium">
            Rs {deliveryCharge}
          </CustomLabel>
        </View>

        <CustomLine color={colors.LightGray} />

        <View style={styles.box}>
          <CustomLabel fontFamily="interBold">Total Amount</CustomLabel>
          <CustomLabel fontFamily="interBold">Rs {totalAmount}</CustomLabel>
        </View>
      </View>

      <CustomLine />

      <View style={styles.text}>
        <CustomLabel fontFamily="interBold">
          No need to worry, let's move forward together
        </CustomLabel>
        <Icon
          name="verified-user"
          library="materialIcons"
          size={16}
          color={colors.green}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 10,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  text: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    backgroundColor: colors.secondary,
    gap: 5,
    paddingHorizontal: 10,
  },
});

export default CartPrices;
