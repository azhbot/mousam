import React, { useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

import CustomLabel from "../../../components/label";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import Icon from "../../../components/icon";
import CustomImage from "../../../components/image";

import { colors } from "../../../constant/colors";
import { showMessage } from "../../../utils/customMsgUtil";
import { removeItemFromCart } from "../../../redux/cart/cartSlice";
import {
  selectUser,
  selectUserVerifiedSamples,
} from "../../../redux/user/userSelector";
import { addOrderProduct } from "../../../redux/order/orderSlice";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
const LOT_SIZE = 1000;

const GrabCard = ({ item: product, charges, onclose = () => {} }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  const userVerifiedSamples = useSelector(selectUserVerifiedSamples);
  const userId = user?.id;

  const [lotNumbers, setLotNumbers] = useState(1);
  const isSampleVerified = userVerifiedSamples?.[userId]?.[product.id] ?? false;

  const company = {
    name: product?.companyName || "",
    logo: product?.companyLogo || "",
  };

  const handleLotChange = useCallback((newLot) => {
    if (newLot < 1) return;
    setLotNumbers(newLot);
  }, []);

  const onGrabConfirm = useCallback(() => {
    if (!isSampleVerified) {
      showMessage("You need to pass sample test");
      return;
    }

    const now = new Date();
    const orderDate = dayjs(now).format("MMMM D, YYYY, h:mm A");

    const grabbedProduct = {
      id: nanoid(10),
      createdAt: now.toISOString(),
      date: orderDate,
      status: "processing",
      productId: product?.id,
      productName: product?.name,
      productCost: product?.cost,
      productMfgCategory: product?.mfgCategory,
      productRawMaterials: product?.rawMaterials,
      productSize: product?.size,
      productVarient: product?.varient,
      companyId: product?.companyId,
      companyName: product?.companyName,
      companyLogo: product?.companyLogo,
      quantity: 1,
      userName: user?.name,
      userId: user?.id,
      pinNumber: user?.pinNumber,
      numberOfMachine: user?.numberOfMachine,
      charges,
    };

    dispatch(addOrderProduct(grabbedProduct));
    navigation.navigate("done");
    onclose();
  }, [charges, product, user, isSampleVerified]);

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeItemFromCart(id));
      showMessage("Removed");
    },
    [dispatch]
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cartLeft}>
            <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
              {product?.name || "Unnamed Product"}
            </CustomLabel>

            <View style={styles.priceContainer}>
              <CustomLabel fontFamily="poppinsRegular">
                Rs {product?.cost ?? 0}/Pcs
              </CustomLabel>
              <CustomLabel fontFamily="poppinsRegular" fontSize={12}>
                {(product?.mfgCategory ?? "N/A").toUpperCase()}
              </CustomLabel>
            </View>

            <View style={styles.quantityContainer}>
              <CustomLabel fontFamily="poppinsRegular" style={styles.qtyLabel}>
                Qty: {lotNumbers * LOT_SIZE} Pcs
              </CustomLabel>
            </View>

            <View style={styles.verifiedIconContainer}>
              <CustomLabel
                fontFamily="poppinsRegular"
                fontSize={12}
                color={!isSampleVerified ? "red" : undefined}
              >
                Sample Test
              </CustomLabel>
              {isSampleVerified && (
                <Icon
                  name="download-done"
                  library="materialIcons"
                  size={16}
                  color={colors.green}
                />
              )}
            </View>

            <View style={styles.total}>
              <CustomLabel fontFamily="poppinsRegular" fontSize={14}>
                Rs {lotNumbers * LOT_SIZE * (product?.cost ?? 0)}
              </CustomLabel>
            </View>
          </View>

          <View style={styles.cartRight}>
            <View style={styles.imageContainer}>
              <CustomImage
                source={product?.image || product?.images?.[0]}
                size={width * 0.2}
              />
            </View>
            <CustomLabel fontSize={12}>Delivery : Free</CustomLabel>

            <View style={styles.lotRow}>
              <Pressable
                onPress={() => handleLotChange(lotNumbers - 1)}
                style={styles.chevronButton}
                accessibilityLabel="Decrease lot number"
              >
                <Icon name="chevron-down" />
              </Pressable>

              <CustomLabel fontFamily="poppinsRegular" style={styles.lotLabel}>
                Lot: {lotNumbers}
              </CustomLabel>

              <Pressable
                onPress={() => handleLotChange(lotNumbers + 1)}
                style={styles.chevronButton}
                accessibilityLabel="Increase lot number"
              >
                <Icon name="chevron-up" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <VerifiedCompanyName companyNameSize="large" company={company} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={onclose} style={styles.button1}>
          <CustomLabel fontFamily="interBold">Cancel</CustomLabel>
        </Pressable>
        <Pressable onPress={onGrabConfirm} style={styles.button2}>
          <CustomLabel color="#fff" fontFamily="interBold">
            Ok
          </CustomLabel>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: colors.LightGray,
  },
  card: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  cartLeft: {
    width: width * 0.45,
    gap: 4,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chevronButton: {
    padding: 4,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  lotLabel: {
    textAlign: "center",
  },
  qtyLabel: {},
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cartRight: {
    width: width * 0.35,
    gap: 5,
    alignItems: "center",
  },
  lotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.35,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    width: width * 0.3,
    alignItems: "center",
  },
  bottom: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    padding: 4,
    borderRadius: 8,
  },
  button1: {
    backgroundColor: "#fff",
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  button2: {
    backgroundColor: colors.primary,
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default React.memo(GrabCard);
