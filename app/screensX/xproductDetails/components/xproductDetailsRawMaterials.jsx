import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomLine from "../../../components/line";
import { colors } from "../../../constant/colors";

const XproductDetailsRawMaterials = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <CustomLabel fontFamily="interMedium" fontSize={16}>
          Raw Materials
        </CustomLabel>
        <CustomLabel>1Lot or 1000pcs</CustomLabel>
      </View>
      <View style={styles.rawMaterials}>
        {["one", "two", "three", "four", "five"].map((item, index) => (
          <View style={styles.rawMaterial} key={index.toString()}>
            <CustomLabel>{item}</CustomLabel>
            <CustomLine height={0.5} color={colors.LightGray} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rawMaterials: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  rawMaterial: {
    padding: 10,
  },
});

export default XproductDetailsRawMaterials;
