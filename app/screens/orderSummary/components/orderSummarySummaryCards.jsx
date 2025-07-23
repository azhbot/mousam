import { View, StyleSheet, FlatList } from "react-native";
import OrderSummarySummaryCard from "./orderSummarySummaryCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrderState } from "../../../redux/order/orderSelector";
import { selectCompanyMap } from "../../../redux/company/companySelector";
import CustomLabel from "../../../components/label";

const OrderSummarySummaryCards = () => {
  const { orderProducts } = useSelector(selectOrderState);
  const companyMap = useSelector(selectCompanyMap);

  useEffect(() => {
    console.log(orderProducts, "in ordersummaryCards");
  }, [orderProducts]);

  if (!orderProducts || orderProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <CustomLabel color={"#888"}>No orders available.</CustomLabel>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orderProducts}
        keyExtractor={(item, index) => index.toString()} // fix: index should be string
        renderItem={({ item, index }) => {
          if (
            item.status === "cancelled" ||
            item.status === "acceptedAndCancelled"
          )
            return;
          return (
            <OrderSummarySummaryCard
              orderProduct={item}
              index={index}
              company={companyMap.get(item.companyId)}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default OrderSummarySummaryCards;
