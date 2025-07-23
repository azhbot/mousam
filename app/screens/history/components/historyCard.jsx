import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import CustomImage from "../../../components/image";
import { images } from "../../../constant/images";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import Icon from "../../../components/icon";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { removeOrderProduct } from "../../../redux/order/orderSlice";
import { useDispatch } from "react-redux";
import ConfirmationMsg from "../../../components/confirmation";

const { width } = Dimensions.get("window");

// Constants for magic numbers and dimensions

const IMAGE_SIZE = width * 0.25;
const BUTTON_WIDTH = width * 0.415;
const CIRCLE_SIZE = 22;
const STEP_HEIGHT = 60;

const HistoryCard = ({ orderProduct }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isProcessHide, setIsProcessHide] = useState(false);
  const [showDelectConfirmation, setShowDeleteConfirmation] = useState(false);

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
    "Product Returned",
    "Paid 60%",
    "Paid 40%",
  ];

  const handleCancelPress = () => {
    dispatch(removeOrderProduct(orderProduct));
    console.log("product remove Successfully");
  };

  const handleDetailsPress = () => {
    navigation.navigate("productDetails", {
      productId: orderProduct.productId,
      condition: true,
    });
  };

  const handleShippingPress = () => {
    navigation.navigate("shiping");
  };

  const toggleProcessVisibility = () => {
    setIsProcessHide((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerTopUpper}>
          <View style={styles.orderProductDetails}>
            <CustomLabel fontFamily="poppinsBold" fontSize={16}>
              {orderProduct?.productName}
            </CustomLabel>
            <View style={styles.DetailsText}>
              <View style={{ flex: 0.6 }}>
                <CustomLabel fontFamily="poppinsMedium" fontSize={15}>
                  Rs {orderProduct?.productCost}/Pcs
                </CustomLabel>
              </View>
              <View style={{ flex: 0.4 }}>
                <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
                  {orderProduct?.productMfgCategory &&
                    orderProduct.productMfgCategory.charAt(0).toUpperCase() +
                      orderProduct.productMfgCategory.slice(1)}
                </CustomLabel>
              </View>
            </View>
            <View style={styles.DetailsText}>
              <View style={{ flex: 0.6 }}>
                <CustomLabel fontFamily="poppinsMedium" fontSize={15}>
                  Qty: {orderProduct?.quantity * 1000} Pcs
                </CustomLabel>
              </View>
              <View style={{ flex: 0.4 }}>
                <CustomLabel
                  fontFamily="poppinsMedium"
                  fontSize={16}
                  numberOfLines={1}
                >
                  Lot: {orderProduct?.quantity}
                </CustomLabel>
              </View>
            </View>

            <View style={styles.orderProductDetailsBottom}>
              <View style={styles.price}>
                <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
                  Rs {orderProduct?.quantity * 1000 * orderProduct?.productCost}
                </CustomLabel>
              </View>
              <View style={styles.payButton}>
                <CustomLabel
                  color={"#fff"}
                  fontFamily="poppinsMedium"
                  fontSize={16}
                >
                  Chapter Closed
                </CustomLabel>
              </View>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.image}>
              <CustomImage
                source={images.frock}
                resizeMode="contain"
                size={IMAGE_SIZE}
              />
            </View>
            <Pressable
              onPress={() => setShowDeleteConfirmation(true)}
              style={styles.cancelButton}
            >
              <CustomLabel
                fontFamily="poppinsMedium"
                fontSize={12}
                color={colors.red}
              >
                Delete
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
          <CustomLabel fontFamily="interBold" fontSize={12}>
            Order ID : {orderProduct?.id}
          </CustomLabel>
          <CustomLabel fontFamily="poppinsMedium" fontSize={10}>
            {orderProduct?.createdAt}
          </CustomLabel>
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
                    fontFamily="poppinsMedium"
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
              title="Product Details"
              width={BUTTON_WIDTH}
              backgroundColor="#fff"
              textColor="#000"
              onPress={handleDetailsPress}
              height={38}
            />
            <CustomButton
              fontSize={14}
              title="Shipping Details"
              width={BUTTON_WIDTH}
              backgroundColor="#fff"
              textColor="#000"
              onPress={handleShippingPress}
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
      <ConfirmationMsg
        visible={showDelectConfirmation}
        title="Delete"
        msg="Do you want to delete?"
        onConfirm={handleCancelPress}
        onclose={() => setShowDeleteConfirmation(false)}
      />
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

export default HistoryCard;
