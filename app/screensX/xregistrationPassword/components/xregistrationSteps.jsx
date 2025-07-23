import { View, StyleSheet, Dimensions } from "react-native";
import CustomLabel from "../../../components/label";
import CustomLine from "../../../components/line";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const { width } = Dimensions.get("window");

const XregistrationPasswordSteps = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.activeCircle}>
            <Icon name="done" library="materialIcons" color="#fff" />
          </View>
          <CustomLabel fontSize={12} style={styles.label}>
            Basic Details
          </CustomLabel>
        </View>
        <View style={styles.line} backgroundColor={colors.tertiary} />
        <View style={styles.box}>
          <View style={[styles.circle, { borderColor: colors.tertiary }]}>
            <CustomLabel color={colors.tertiary}>2</CustomLabel>
          </View>
          <CustomLabel fontSize={12} style={styles.label}>
            Password Creation
          </CustomLabel>
        </View>
        <View style={styles.line} backgroundColor={colors.LightGray} />
        <View style={styles.box}>
          <View style={styles.circle}>
            <CustomLabel color={colors.LightGray}>3</CustomLabel>
          </View>
          <CustomLabel fontSize={12} style={styles.label}>
            Final Registration
          </CustomLabel>
        </View>
      </View>
      <CustomLine color={colors.veryLightGray} marginVertical={20} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  box: {
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.LightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: width * 0.2,
    height: 1,
    backgroundColor: "#000",
  },
  label: {
    position: "absolute",
    top: 40,
    minWidth: 120,
    textAlign: "center",
  },
});

export default XregistrationPasswordSteps;
