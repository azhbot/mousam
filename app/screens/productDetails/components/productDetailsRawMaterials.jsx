import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomLine from "../../../components/line";
import { colors } from "../../../constant/colors";
import { useEffect } from "react";

const ProductDetailsRawMaterials = ({ rawMaterials }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
          Raw Materials
        </CustomLabel>
        <CustomLabel fontFamily="poppinsRegular">1Lot or 1000Pcs</CustomLabel>
      </View>
      <View style={styles.rawMaterials}>
        {rawMaterials?.map((item, index) => (
          <View style={styles.rawMaterial} key={index.toString()}>
            <CustomLabel fontSize={10}>
              {index + 1}. {item?.name}
            </CustomLabel>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rawMaterials: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 5,
    gap: 10, // optional spacing between items
  },
  rawMaterial: {
    width: "48%", // two columns with spacing
    backgroundColor: colors.white, // optional
    borderRadius: 5, // optional
  },
});

export default ProductDetailsRawMaterials;
