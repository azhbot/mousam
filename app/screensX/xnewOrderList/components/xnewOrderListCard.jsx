import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import CustomLine from "../../../components/line";
import CustomButton from "../../../components/button";
import { useEffect, useState } from "react";
import CustomImage from "../../../components/image";
import { images } from "../../../constant/images";
import { useNavigation } from "@react-navigation/native";
import ConfirmationMsg from "../../../components/confirmation";
import { useDispatch } from "react-redux";
import XnewOrdersCardStepes from "./xnewOrdersCardStepes";
import {
  changeOrderProductQuantity,
  manageOrderStatus,
  removeOrderProduct,
} from "../../../redux/order/orderSlice";
import { showMessage } from "../../../utils/customMsgUtil";

const { width } = Dimensions.get("window");

const XnewOrderListCard = ({
  item,
  index,
  handleCross = () => {},
  handleAccept = () => {},
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [hasAccepted, setHasAccepted] = useState(false);
  const [showCrossConfirmation, setShowCrossConfirmation] = useState(false);
  const [numberOfLots, setNumberOfLots] = useState(item?.quantity / 1000);
  const [productQuantity, setProductQuantity] = useState(item?.quantity);

  useEffect(() => {
    setHasAccepted(
      item?.status === "accepted" || item?.status === "acceptedAndCancelled"
    );
  }, []);

  // useEffect(() => {
  //   console.log(item, "in xneworderlistcard");
  // }, [item]);

  const handleLotsChange = (lot) => {
    if (hasAccepted) return;
    if (lot === 0 || item?.quantity / 1000 < lot) return;
    setNumberOfLots(lot);
    setProductQuantity(lot * 1000);
  };

  const onAccept = (product) => {
    setHasAccepted((prev) => !prev);
    const quantity = productQuantity;
    handleAccept({ ...product, quantity });
    dispatch(
      changeOrderProductQuantity({
        orderId: item.id,
        quantity: productQuantity,
      })
    );
    console.log("workign", hasAccepted);
  };

  const handleCrossPress = () => {
    dispatch(manageOrderStatus({ orderId: item.id, status: "cancelled" }));
    showMessage("Removed Successfully");
  };

  const handleNavigation = () =>
    navigation.navigate("productDetails", {
      productId: 1,
      companyShow: true,
    });

  return (
    <View style={styles.container}>
      {/* Cross Icon Positioned Overlapping the QR Container */}
      <View style={styles.crossIconContainer}>
        <Pressable
          onPress={() => {
            if (item?.status === "accepted") return;
            setShowCrossConfirmation(true);
          }}
          style={[
            styles.crossIcon,
            {
              backgroundColor:
                item?.status === "accepted" ? colors.LightGray : colors.red,
            },
          ]}
        >
          <Icon name="cross" library="entypo" />
        </Pressable>
      </View>

      <View style={styles.containerTop}>
        <View style={styles.topLeft}>
          <Pressable onPress={handleNavigation}>
            <CustomLabel fontFamily="poppinsBold" fontSize={16}>
              {item?.name} Product Name
            </CustomLabel>
          </Pressable>
          <View style={styles.rowCenter}>
            <CustomLabel fontFamily="poppinsMedium" style={{ width: "70%" }}>
              Rs {item?.productCost} Per Pcs
            </CustomLabel>
            <CustomLabel fontFamily="poppinsMedium">
              {item?.productMfgCategory?.toUpperCase()}
            </CustomLabel>
          </View>

          <View style={styles.rowCenter}>
            <CustomLabel fontFamily="poppinsMedium" style={{ width: "70%" }}>
              Qty: {productQuantity} Pcs
            </CustomLabel>
            <CustomLabel fontFamily="poppinsMedium">
              Lot: {numberOfLots}
            </CustomLabel>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <CustomLabel fontFamily="poppinsMedium">Value</CustomLabel>
            <CustomLabel
              fontFamily="poppinsBold"
              fontSize={16}
              style={styles.valueContainer}
            >
              Rs {productQuantity * numberOfLots}
            </CustomLabel>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <CustomLabel fontFamily="poppinsMedium">Habra, 743704</CustomLabel>
          </View>
        </View>

        <View style={styles.topRight}>
          <Pressable onPress={handleNavigation} style={styles.qrContainer}>
            <CustomImage source={images.frock} size={"90%"} />
          </Pressable>

          <View style={styles.id}>
            <CustomLabel fontFamily="interMedium" fontSize={16}>
              {item?.groupNumber?.toString().padStart(6, "0")}
            </CustomLabel>
          </View>
        </View>
      </View>
      <View style={styles.containerMiddle}>
        <View style={styles.middleLeft}>
          <CustomLabel
            fontFamily="poppinsBold"
            fontSize={16}
            style={styles.fixedLabel}
          >
            No. of Lots
          </CustomLabel>
        </View>
        <View style={styles.middleMiddle}>
          <View style={styles.upDown}>
            <Pressable onPress={() => handleLotsChange(numberOfLots - 1)}>
              <Icon name="chevron-down" />
            </Pressable>
            <CustomLabel>{numberOfLots}</CustomLabel>

            <Pressable onPress={() => handleLotsChange(numberOfLots + 1)}>
              <Icon name="chevron-up" />
            </Pressable>
          </View>
        </View>

        <View style={styles.middleRight}>
          <CustomButton
            backgroundColor={hasAccepted ? "#fff" : colors.tertiary}
            textColor={hasAccepted ? "#000" : "#fff"}
            title={hasAccepted ? "Accepted" : "Accept"}
            style={{ width: "79%" }}
            height={40}
            onPress={() => onAccept(item)}
            borderRadius={8}
            paddingHorizontal={0}
            fontSize={14}
            disabled={hasAccepted}
          />
        </View>
      </View>
      <View style={styles.containerBottom}>
        <CustomLabel fontFamily="poppinsMedium" fontSize={10}>
          ID: {item?.id}
        </CustomLabel>
        <CustomLabel fontFamily="poppinsMedium" fontSize={10}>
          {item?.date}
        </CustomLabel>
      </View>

      <CustomLine color="#fff" />

      <ConfirmationMsg
        title="Confirmation"
        msg="Do you Really Want to Delete?"
        visible={showCrossConfirmation}
        onConfirm={handleCrossPress}
        onclose={() => setShowCrossConfirmation(false)}
      />
      <XnewOrdersCardStepes item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  crossIconContainer: {
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
  crossIcon: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
  },
  containerTop: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  topLeft: {
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingVertical: 5,
    gap: 5,
  },
  valueContainer: {
    padding: 2,
    paddingHorizontal: 15,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  topRight: {
    width: "35%",
    paddingTop: 15,
    alignItems: "center",
    gap: 10,
  },
  qrContainer: {
    width: "80%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "relative",
  },
  id: {
    width: "80%",
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 0,
  },

  containerMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  middleLeft: {
    width: "32%",
    paddingLeft: 15,
  },

  middleMiddle: {
    gap: 10,
    width: "32%",
  },
  fixedLabel: {
    width: 100,
  },
  middleRight: {
    width: "36%",
    justifyContent: "center",
    alignItems: "center",
  },
  upDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  containerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});

export default XnewOrderListCard;
