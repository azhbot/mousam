import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CartHeader from "./components/cartHearder";
import { colors } from "../../constant/colors";
import CustomButton from "../../components/button";
import CustomLabel from "../../components/label";
import CartAddress from "./components/cartAddress";
import CartPrices from "./components/cartPrices";
import CartGrabAllButton from "./components/cartGrabAllButton";
import CartCard from "./components/cartCard";
import { addOrderProduct } from "../../redux/order/orderSlice";
import { showMessage } from "../../utils/customMsgUtil";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateNextOrderGroupNumber } from "../../redux/company/companySlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [currentCartProducts, setCurrentCartProducts] = useState([]);
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const charges = {
    platformFee: 44,
    deliveryCharge: 66,
  };

  const handleQuantityChange = (id, value) => {
    const updatedItems = currentCartProducts.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );
    setCurrentCartProducts(updatedItems);
  };

  const totalOrderValue = useMemo(() => {
    return currentCartProducts.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0
    );
  }, [currentCartProducts]);

  useEffect(() => {
    setCurrentCartProducts(cartProducts);
  }, [cartProducts]);

  const handleGrabProduct = (grabbedProduct, company) => {
    dispatch(addOrderProduct(grabbedProduct));
    dispatch(updateNextOrderGroupNumber(company.id));
    // showMessage("Order placed");
    navigation.navigate("done", 1);
  };

  const handleGrabAll = () => {
    currentCartProducts.forEach((product) => {
      // handleGrabProduct(product);
    });
  };

  const condition = cartProducts?.length === 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CartHeader handleArrowPress={() => navigation.goBack()} />

      {condition ? (
        <View style={styles.emptyContainer}>
          <CustomLabel color={colors.LightGray} fontFamily="interBold">
            No Products in Your Cart
          </CustomLabel>
          <CustomButton
            title="View Products"
            backgroundColor={colors.tertiary}
            fontFamily="inter"
            fontWeight="bold"
            onPress={() => navigation.replace("products")}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={currentCartProducts}
            keyExtractor={(item) => item?.id?.toString()}
            ListHeaderComponent={<CartAddress />}
            renderItem={({ item }) => (
              <CartCard
                item={item}
                charges={charges}
                handleQuantityChange={handleQuantityChange}
                handleGrabProduct={handleGrabProduct}
              />
            )}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={3}
            removeClippedSubviews={true}
            ListFooterComponent={
              <CartPrices
                cartProducts={currentCartProducts}
                totalOrderValue={totalOrderValue}
                charges={charges}
              />
            }
          />

          <CartGrabAllButton
            charges={charges}
            totalOrderValue={totalOrderValue}
            onGrabAll={handleGrabAll}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default CartScreen;
