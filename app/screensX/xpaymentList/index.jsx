import { View, StyleSheet, FlatList } from "react-native";
import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import XpaymentCard from "./components/xpaymentCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectPaymentList } from "../../redux/payment/paymentSelector";
import { selectVerifiedOrdersFiles } from "../../redux/order/orderSelector";
import { useEffect } from "react";
import { colors } from "../../constant/colors";

const XpaymentListScreen = () => {
  const navigation = useNavigation();
  const paymentList = useSelector(selectPaymentList);
  const verifiedOrdersFiles = useSelector(selectVerifiedOrdersFiles);

  const handlePay = () => {
    // navigation.navigate("payment");
  };

  useEffect(() => {
    console.log(verifiedOrdersFiles, "in xpaymentlist");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <CustomLabel>Menu</CustomLabel>
        <Icon name="chevron-right" />
        <CustomLabel>Total order invoice & payment</CustomLabel>
      </View>
      {verifiedOrdersFiles?.length === 0 ? (
        <View style={styles.empty}>
          <CustomLabel color={colors.gray}>
            No Order Invoice & Payment Info
          </CustomLabel>
        </View>
      ) : (
        <FlatList
          data={verifiedOrdersFiles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <XpaymentCard item={item} handlePay={handlePay} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 5,
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default XpaymentListScreen;
