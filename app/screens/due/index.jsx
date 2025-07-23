import { View, StyleSheet, Dimensions } from "react-native";
import DueHeader from "./components/dueHeader";
import CustomLabel from "../../components/label";
import { colors } from "../../constant/colors";
import CustomImage from "../../components/image";
import { images } from "../../constant/images";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const DueScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DueHeader />

      <View style={styles.amount}>
        <CustomLabel color="#fff" fontFamily="interBold">
          Order Value
        </CustomLabel>
        <CustomLabel color="#fff" fontFamily="interBold">
          Rs 1,30,00,000
        </CustomLabel>
      </View>
      <View style={styles.messageContainer}>
        <CustomLabel color={colors.gray}>
          This amount will pay within 2stage {"(60% + 40%)"} on your register
          bank A/c xxxxxxxxxx17 after Receiving final product from you
        </CustomLabel>
        <CustomImage source={images.payment2} size={width * 0.4} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  amount: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  messageContainer: {
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    gap: 40,
  },
});

export default DueScreen;
