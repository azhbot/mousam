import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import XnewOrderListHeader from "./components/xnewOrderList";
import XnewOrderListCard from "./components/xnewOrderListCard";
import { selectOrderState } from "../../redux/order/orderSelector";
import { useCallback, useEffect, useState } from "react";
import { addToVerifiedOrderProducts } from "../../redux/order/orderSlice";
import Scanner from "../../components/scanner";
import { showMessage } from "../../utils/customMsgUtil";

const XnewOrderListScreen = () => {
  const dispatch = useDispatch();

  const [showScanner, setShowScanner] = useState(false);

  const orderProducts = useSelector(selectOrderState)?.orderProducts || [];

  // useEffect(() => {
  //   console.log(orderProducts, "in xneworderlist");
  // }, [orderProducts]);

  const handleAccept = (product) => {
    if (!product) {
      console.log("opps not product");
      return;
    }
    dispatch(addToVerifiedOrderProducts(product));
    showMessage("Order Accepted");
  };

  // Memoize renderItem to prevent unnecessary re-renders
  const renderItem = useCallback(({ item, index }) => {
    if (item.status === "cancelled") return;
    return (
      <XnewOrderListCard
        item={item}
        index={index}
        handleAccept={handleAccept}
      />
    );
  }, []);

  // Memoize keyExtractor to prevent unnecessary re-renders
  const keyExtractor = useCallback(
    (item, index) => item?.id?.toString() || index.toString(),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <CustomLabel fontFamily="interMedium">Orders</CustomLabel>
          <Icon name="chevron-right" />
          <CustomLabel fontFamily="interMedium">New Orders</CustomLabel>
        </View>
        <Pressable onPress={() => setShowScanner(true)} style={styles.scanner}>
          <CustomLabel>Scan</CustomLabel>
          <Icon name={"qrcode-scan"} />
        </Pressable>
      </View>
      <FlatList
        data={orderProducts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={10} // Render only the first 10 items initially
        maxToRenderPerBatch={10} // Limit the number of items rendered per batch
        windowSize={5} // Number of items to render offscreen
        removeClippedSubviews={true} // Unmount offscreen components
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CustomLabel fontFamily="interMedium" style={styles.emptyText}>
              No new orders found.
            </CustomLabel>
          </View>
        }
      />
      <Scanner visible={showScanner} onClose={() => setShowScanner(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  scanner: {
    padding: 15,
    flexDirection: "row",
    gap: 5,
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default XnewOrderListScreen;
