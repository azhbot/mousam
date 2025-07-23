import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";

const XregistrationLinks = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowCenter}>
        <CustomLabel fontFamily="poppinsBold">MOUSAM</CustomLabel>
        <CustomLabel fontFamily="poppinsMedium" fontSize={12}>
          The Mfg Marketplace
        </CustomLabel>
      </View>
      <View style={styles.rowCenter}>
        <CustomLabel fontSize={12} fontFamily="poppinsMedium">
          Why Manufacture Your Products With
        </CustomLabel>
        <CustomLabel fontFamily="poppinsBold">MOUSAM?</CustomLabel>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <CustomLabel
          color={colors.tertiary}
          fontFamily="poppinsRegular"
          fontSize={12}
        >
          Click here to answer
        </CustomLabel>
      </TouchableOpacity>
      <View style={styles.rowCenter} fontSize={12}>
        <CustomLabel fontFamily="poppinsRegular" style={styles.underline}>
          Need help?
        </CustomLabel>
        <CustomLabel
          fontFamily="poppinsRegular"
          style={styles.underline}
          fontSize={12}
        >
          May i assist?
        </CustomLabel>
      </View>
      <View style={styles.policy}>
        <CustomLabel color={colors.gray} fontSize={10}>
          By continuing I aggree to MOUSAM's Terms of use & Privacy Policy
        </CustomLabel>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 10,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  underline: {
    textDecorationLine: "underline",
  },
  policy: {
    marginTop: 20,
  },
});

export default XregistrationLinks;
