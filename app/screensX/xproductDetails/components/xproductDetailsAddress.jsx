import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const XproductDetailsAddress = () => {
  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="interMedium" fontSize={16}>
        Deliver From
      </CustomLabel>
      <View style={styles.addressContainer}>
        <View style={styles.address}>
          <CustomLabel fontSize={12}>
            azhar,maligram,prithiba,habra,north 24 parganas...
          </CustomLabel>
          <CustomLabel fontSize={12} fontFamily="interMedium">
            743704
          </CustomLabel>
        </View>
        <View style={styles.bottom}>
          <View style={styles.phone}>
            <CustomLabel fontSize={12}>Phone : 7564758474</CustomLabel>
            <Icon name="phone" library="feather" size={12} />
          </View>
          <Pressable onPress={() => console.log("change pressed")}>
            <CustomLabel fontSize={12} style={styles.button}>
              Change...
            </CustomLabel>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  addressContainer: {
    gap: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  address: {
    flexDirection: "row",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  phone: { flexDirection: "row", alignItems: "center" },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 5,
  },
});

export default XproductDetailsAddress;
