import { View, StyleSheet, Dimensions } from "react-native";
import PaymentHeader from "./components/paymentHeader";
import PaymentAmount from "./components/paymentAmount";
import PaymentOptions from "./components/paymentOptions";
import CustomImage from "../../components/image";
import { images } from "../../constant/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

const PaymentScreen = ({ route }) => {
  const charges = route?.params?.charges;
  useEffect(() => {
    console.log(charges, "in payment");
  }, [charges]);
  return (
    <SafeAreaView>
      <PaymentHeader />
      <View style={styles.container}>
        <PaymentAmount charges={charges} />
        <PaymentOptions />
        <View style={styles.imageContainer}>
          <CustomImage source={images.payment1} size={width * 0.8} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
    bottom: 100,
  },
});

export default PaymentScreen;
