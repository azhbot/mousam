import { View, StyleSheet, Dimensions, Pressable, Button } from "react-native";
import CustomLabel from "../../../components/label";
import CustomImage from "../../../components/image";
import { images } from "../../../constant/images";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import Icon from "../../../components/icon";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Constants for magic numbers and dimensions

const IMAGE_SIZE = width * 0.25;
const BUTTON_WIDTH = width * 0.415;
const CIRCLE_SIZE = 22;
const STEP_HEIGHT = 60;

const OrderSummarySummaryCard = ({ orderProduct, index }) => {
  const navigation = useNavigation();
  const [isProcessHide, setIsProcessHide] = useState(false);
  const [isProductReady, setIsProductReady] = useState(false);

  // Dynamically passed state (can come from backend or props)
  const orderState = 2; // 👈 Ideally dynamic

  useEffect(() => {
    console.log(orderProduct, "in order summary summary card ");
  }, []);

  const company = {
    name: orderProduct?.companyName,
    id: orderProduct?.companyId,
    logo: orderProduct?.companyLogo,
  };

  const totalPrice = orderProduct?.cost * orderProduct?.quantity;
  const charges = orderProduct?.charges;

  const steps = [
    "Accepted By Company",
    "RawMat Accepted",
    "Product Reached",
    "Paid 60%",
    "Paid 40%",
  ];

  // Event handlers
  const handlePaymentPress = () => {
    navigation.navigate("payment", { charges });
  };

  const handleCancelPress = () => {
    navigation.navigate("cancel", { order: orderProduct });
  };

  const handleDetailsPress = () => {
    navigation.navigate("productDetails", {
      productId: orderProduct.productId,
      onlyShow: true,
    });
  };

  const handleShippingPress = () => {
    navigation.navigate("shiping");
  };

  const toggleProcessVisibility = () => {
    setIsProcessHide((prev) => !prev);
  };

  const handleReady = () => {
    // if (orderProduct.status !== "processing") {
    setIsProductReady(true);
    // }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerTopUpper}>
          <View style={styles.orderProductDetails}>
            <Pressable onPress={handleDetailsPress}>
              <CustomLabel fontSize={16}>
                {orderProduct?.productName}
              </CustomLabel>
            </Pressable>
            <View style={styles.DetailsText}>
              <View style={{ flex: 0.6 }}>
                <CustomLabel>
                  Rs {orderProduct?.productCost} Per Pcs
                </CustomLabel>
              </View>
              <View style={{ flex: 0.4 }}>
                <CustomLabel>
                  {orderProduct?.productMfgCategory?.toUpperCase()}
                </CustomLabel>
              </View>
            </View>
            <View style={styles.DetailsText}>
              <View style={{ flex: 0.6 }}>
                <CustomLabel fontSize={15}>
                  Qty: {orderProduct?.quantity} Pcs
                </CustomLabel>
              </View>
              <View style={{ flex: 0.4 }}>
                <CustomLabel numberOfLines={1}>
                  Lot: {orderProduct?.quantity / 1000}
                </CustomLabel>
              </View>
            </View>

            <View style={styles.orderProductDetailsBottom}>
              <View style={styles.price}>
                <CustomLabel>
                  Rs {orderProduct?.quantity * orderProduct?.productCost}
                </CustomLabel>
              </View>
              <Pressable onPress={handlePaymentPress} style={styles.payButton}>
                <CustomLabel color={"#fff"}>Pay Now Rs 1300</CustomLabel>
              </Pressable>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Pressable onPress={handleDetailsPress} style={styles.image}>
              <CustomImage
                source={images.frock}
                resizeMode="contain"
                size={IMAGE_SIZE}
              />
            </Pressable>
            <Pressable onPress={handleCancelPress} style={styles.cancelButton}>
              <CustomLabel fontSize={12} color={colors.red}>
                {true ? " Cancel" : "Return"}
              </CustomLabel>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("company", {
                  companyId: orderProduct?.companyId,
                })
              }
            >
              <VerifiedCompanyName
                companyWidth={IMAGE_SIZE}
                companyNameSize="large"
                text
                company={company}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.idContainer}>
          <CustomLabel fontSize={10}>Order ID : {orderProduct?.id}</CustomLabel>
          <CustomLabel fontSize={10}>{orderProduct?.date}</CustomLabel>
        </View>
      </View>

      {!isProcessHide && (
        <View
          style={{ height: 1, backgroundColor: "#fff", marginVertical: 2 }}
        />
      )}

      {isProcessHide && (
        <View style={styles.containerBottom}>
          <View style={styles.processingContainer}>
            {steps.map((step, index) => {
              const isDone = index < orderState;
              const isActive = index === orderState;

              return (
                <View key={index} style={styles.box}>
                  <View
                    style={[
                      styles.circle,
                      isDone && styles.doneCircle,
                      isActive && styles.activeBorderCircle,
                    ]}
                  >
                    {isDone ? (
                      <Icon
                        name="done"
                        library="materialIcons"
                        color="#fff"
                        size={14}
                      />
                    ) : (
                      <CustomLabel
                        color={index <= orderState ? colors.tertiary : "#000"}
                        fontSize={10}
                      >
                        {index + 1}
                      </CustomLabel>
                    )}
                  </View>
                  <CustomLabel
                    color={isActive || isDone ? colors.tertiary : "#000"}
                    fontSize={8}
                    style={{ textAlign: "center" }}
                  >
                    {step}
                  </CustomLabel>
                  {index !== steps.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        {
                          backgroundColor:
                            index <= orderState ? colors.tertiary : "#000",
                        },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.detailsButtons}>
            <CustomButton
              fontSize={14}
              title="Shipping Details"
              width={BUTTON_WIDTH}
              backgroundColor="#fff"
              textColor="#000"
              onPress={handleShippingPress}
              height={38}
            />
            <CustomButton
              fontSize={14}
              title="Product Ready"
              width={BUTTON_WIDTH}
              backgroundColor={
                false ? "#777777" : isProductReady ? "#fff" : colors.tertiary
              }
              textColor={isProductReady ? "#000" : "#fff"}
              onPress={handleReady}
              height={38}
            />
          </View>
        </View>
      )}

      <Pressable onPress={toggleProcessVisibility} style={styles.downButton}>
        <Icon
          name={isProcessHide ? "chevron-up" : "chevron-down"}
          color={colors.tertiary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondary,
  },
  containerTopUpper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderProductDetails: {
    paddingRight: 10,
    flex: 1,

    justifyContent: "space-between",
  },
  DetailsText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderProductDetailsBottom: {
    gap: 10,
  },
  price: {
    padding: 5,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  payButton: {
    padding: 5,
    flex: 1,
    borderRadius: 5,
    backgroundColor: colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: IMAGE_SIZE,
    gap: 10,
  },
  image: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  cancelButton: {
    height: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  idContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerBottom: {
    // backgroundColor: "pink",
  },
  processingContainer: {
    minHeight: STEP_HEIGHT,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.tertiary,
    marginTop: 10,
  },
  box: {
    alignItems: "center",
    width: 60,
    height: 40,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
  },
  doneCircle: {
    backgroundColor: colors.tertiary,
    borderColor: colors.tertiary,
  },
  activeBorderCircle: {
    borderColor: colors.tertiary,
  },
  line: {
    width: width * 0.04,
    height: 1,
    position: "absolute",
    top: 10,
    left: 55,
  },
  detailsButtons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  downButton: {
    alignItems: "center",
    height: 20,
  },
});

export default OrderSummarySummaryCard;
