import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";

const XproductDetailsPriceDetils = ({ handleApplyPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.makingCostContainer}>
        <View style={styles.makingCost}>
          <CustomLabel fontFamily="interBold" fontSize={16}>
            Making Cost : Rs 44/Pcs
          </CustomLabel>
          <CustomLabel fontFamily="interBold" fontSize={16} color={colors.gray}>
            Rs 50/Pcs
          </CustomLabel>
        </View>
        <CustomLabel fontFamily="interMedium" fontSize={16}>
          INDOOR+
        </CustomLabel>
      </View>
      <View style={styles.quantity}>
        <CustomLabel fontFamily="interMedium" fontSize={16}>
          Quantity : 1Lot 1000 pcs
        </CustomLabel>
      </View>
      <View style={styles.sampleTest}>
        <CustomLabel fontFamily="interMedium" fontSize={16}>
          Sample Test
        </CustomLabel>
        <CustomButton
          backgroundColor={colors.tertiary}
          textColor="#fff"
          title="Apply"
          onPress={handleApplyPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 5,
  },
  makingCostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  makingCost: {
    flexDirection: "row",
    gap: 10,
  },
  quantity: {},
  sampleTest: { flexDirection: "row", justifyContent: "space-between" },
});

export default XproductDetailsPriceDetils;
