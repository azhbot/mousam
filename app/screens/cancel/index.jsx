import { View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import CancelHeader from "./components/cancelHeader";
import CustomLabel from "../../components/label";
import CustomButton from "../../components/button";
import { colors } from "../../constant/colors";
import CustomImage from "../../components/image";
import { images } from "../../constant/images";
import {
  addToReturnedAndCancelledVerifiedOrders,
  manageOrderStatus,
} from "../../redux/order/orderSlice";

const { width } = Dimensions.get("window");

const CancelScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route?.params?.order;

  const handleNo = () => {
    navigation.goBack();
  };

  const handleYes = () => {
    if (product.status === "accepted") {
      if (product.status === "accepted" && product.id) {
        dispatch(addToReturnedAndCancelledVerifiedOrders(product.id));
      }

      console.log(`Product with groupId ${product.id} removed successfully.`);
    } else {
      dispatch(manageOrderStatus({ orderId: product.id, status: "cancelled" }));
      console.log("product cancelled Successfully");
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <CancelHeader />
      <View style={styles.container}>
        <CustomLabel fontFamily="interMedium">
          {" "}
          Do you really want to cancel this order for {product?.name}? are you
          sure?
        </CustomLabel>
        <View style={styles.buttons}>
          <CustomButton
            title="No"
            backgroundColor={colors.primary}
            borderRadius={50}
            width={width * 0.3}
            onPress={handleNo}
          />
          <CustomButton
            title="Yes I'm"
            backgroundColor={colors.primary}
            borderRadius={50}
            width={width * 0.3}
            onPress={handleYes}
          />
        </View>
        <CustomImage source={images.cancel} size={width * 0.4} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 40,
    width: width,
  },
});

export default CancelScreen;
