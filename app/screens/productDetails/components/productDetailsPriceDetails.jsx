import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";

const ProductDetailsPriceDetils = ({ productDetail, handleSampleRequest }) => {
  const bonusPercentage = productDetail?.bonusPercentage ?? 0;
  const cost = productDetail?.cost ?? 0;

  const bonus = bonusPercentage ? (bonusPercentage / 100) * cost : null;
  const currentPrice = bonus ? cost + bonus : cost;

  return (
    <View style={styles.container}>
      <View style={styles.makingCostContainer}>
        <View style={styles.makingCost}>
          <CustomLabel fontFamily="poppinsBold" fontSize={14}>
            Making Cost : Rs {currentPrice}/Pcs
          </CustomLabel>
          {bonus && (
            <CustomLabel
              fontFamily="poppinsBold"
              fontSize={14}
              color={colors.gray}
              style={{ textDecorationLine: "line-through", color: "red" }}
            >
              Rs {cost}/Pcs
            </CustomLabel>
          )}
        </View>
      </View>
      <View style={styles.rowCenter}>
        <CustomLabel fontFamily="poppinsMedium" fontSize={14}>
          Quantity : 1Lot or 1000 pcs {"  "}
        </CustomLabel>
        <CustomLabel fontFamily="poppinsBold" fontSize={14}>
          {productDetail?.mfgCategory.toUpperCase()}
        </CustomLabel>
      </View>
      <View style={styles.rowCenter}>
        <CustomLabel fontSize={14} fontFamily="poppinsMedium">
          Variant :{productDetail?.variant}
        </CustomLabel>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,

    borderWidth: 0.5,
    borderColor: colors.LightGray,
    borderRadius: 8,
  },
  makingCostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  makingCost: {
    flexDirection: "row",
    gap: 10,
  },
  rowCenter: { flexDirection: "row", gap: 20 },
});

export default ProductDetailsPriceDetils;
