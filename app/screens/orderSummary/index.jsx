import { View, StyleSheet } from "react-native";
import OrderSummaryHeader from "./components/orderSummaryHeader";
import OrderSummarySummaryCards from "./components/orderSummarySummaryCards";
import OrderSummarySummaryCard from "./components/orderSummarySummaryCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectOrderSummary } from "../../redux/order/orderSelector";
import { useEffect } from "react";

const OrderSummaryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <OrderSummaryHeader />
      <OrderSummarySummaryCards />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderSummaryScreen;
