import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";

const XproductDetailsButton = ({
  handleGotoCardPress,
  handleGrabitNowPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleGotoCardPress} style={styles.right}>
        <CustomLabel fontFamily="interBold">Go to Card</CustomLabel>
      </Pressable>
      <Pressable onPress={handleGrabitNowPress} style={styles.left}>
        <CustomLabel fontFamily="interBold" color="#fff">
          {" "}
          Grab It Now
        </CustomLabel>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 4,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 5,
  },
  left: {
    flex: 1,
    alignItems: "center",
  },
});

export default XproductDetailsButton;
