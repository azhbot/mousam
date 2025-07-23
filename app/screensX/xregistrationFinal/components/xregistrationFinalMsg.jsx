import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";

const XregistrationFinalMsg = () => {
  return (
    <View style={styles.container}>
      <CustomLabel>Start Making Your Product With </CustomLabel>
      <CustomLabel>MOUSAM</CustomLabel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    paddingVertical: 10,
    justifyContent: "center",

    height: 100,
  },
});

export default XregistrationFinalMsg;
