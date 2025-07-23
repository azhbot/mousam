import { View, StyleSheet, Dimensions } from "react-native";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";

const { width } = Dimensions.get("window");

const ProductDetailsPolicies = ({ productDetail }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Icon name="truck-delivery-outline" color={colors.green} />
        <View style={styles.labelWrapper}>
          <CustomLabel color={colors.green} fontFamily="poppinsRegular">
            {productDetail?.deliveryCharge !== 0
              ? productDetail?.deliveryCharge
              : " Free"}{" "}
            delivery by 1st January Wednesday make sure to show me
          </CustomLabel>
        </View>
      </View>

      <View style={styles.box}>
        <Icon name="free-cancellation" library="materialIcons" />
        <View style={styles.labelWrapper}>
          <CustomLabel fontFamily="poppinsRegular">
            Cancellation upto {productDetail?.cancellationTime} hours
          </CustomLabel>
        </View>
      </View>

      <View style={styles.box}>
        <Icon name="keyboard-return" />
        <View style={styles.labelWrapper}>
          <CustomLabel fontFamily="poppinsRegular">
            {productDetail?.returnDays} days Return Policy
          </CustomLabel>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginHorizontal: 20,
    gap: 5,
  },
  box: {
    flexDirection: "row",
    alignItems: "flex-start", // helps with multi-line alignment
    gap: 15,
  },
  labelWrapper: {
    width: width - 100, // Adjust depending on your icon + padding size
  },
});

export default ProductDetailsPolicies;
