import { View, StyleSheet } from "react-native";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";

const XproductDetailsPolicies = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Icon name="truck-delivery-outline" color={colors.green} />
        <CustomLabel color={colors.green}>
          Free delivery, delivery by 1st January Wednesday
        </CustomLabel>
      </View>
      <View style={styles.box}>
        <Icon name="free-cancellation" library="materialIcons" />
        <CustomLabel>Cancellation upto 48 hours</CustomLabel>
      </View>
      <View style={styles.box}>
        <Icon name="keyboard-return" />
        <CustomLabel>10 days Return Policy</CustomLabel>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 5,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});

export default XproductDetailsPolicies;
