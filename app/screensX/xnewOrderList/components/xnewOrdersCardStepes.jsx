import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

const BUTTON_WIDTH = width * 0.415;
const CIRCLE_SIZE = 22;
const STEP_HEIGHT = 60;

const stepsOne = ["Accepted ", "RawMat reached", "Product received"];
const stepsTwo = ["Paid 60% ", "Paid 40%"];

const XnewOrdersCardStepes = ({ item }) => {
  const [orderState, setOrderState] = useState(0);
  const [paymentState, setPaymentState] = useState(0);
  const [isProcessHide, setIsProcessHide] = useState(false);
  const [cancelledState, setCancelledState] = useState(null);

  useEffect(() => {
    console.log(item.status, "in xneworderscard");
    if (item.status === "acceptedAndCancelled") {
      setCancelledState(1);
      setOrderState(2);
    }
    if (item.status === "accepted") {
      setOrderState(1);
    }
  }, [item]);

  const handleDetailsPress = () => {};

  const handleShippingPress = () => {};

  const toggleProcessVisibility = () => {
    setIsProcessHide((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {isProcessHide && (
        <View style={styles.containerBottom}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <View style={styles.processContainerOne}>
              {stepsOne.map((step, index) => {
                const isDone = index < orderState;
                const isActive = index === orderState;

                return (
                  <View key={index} style={styles.box}>
                    <View
                      style={[
                        styles.circle,
                        isDone
                          ? index !== cancelledState
                            ? styles.doneCircle
                            : styles.cancelledCircle
                          : styles.circle,
                        isActive && styles.activeBorderCircle,
                      ]}
                    >
                      {isDone ? (
                        index !== cancelledState ? (
                          <Icon
                            name="done"
                            library="materialIcons"
                            color="#fff"
                            size={14}
                          />
                        ) : (
                          <Icon
                            name="close"
                            library="materialIcons"
                            color="#fff"
                            size={14}
                          />
                        )
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
                      color={
                        isActive || isDone
                          ? index !== cancelledState
                            ? colors.tertiary
                            : colors.red
                          : "#000"
                      }
                      fontSize={8}
                      fontFamily="poppinsMedium"
                      style={{ textAlign: "center" }}
                    >
                      {index !== cancelledState
                        ? orderState === 3
                          ? "Raw mats Received"
                          : step
                        : "Cancelled"}
                    </CustomLabel>
                    {index !== stepsOne.length - 1 && (
                      <View
                        style={[
                          styles.line,
                          {
                            backgroundColor:
                              index <= orderState
                                ? !cancelledState
                                  ? colors.tertiary
                                  : colors.red
                                : "#000",
                          },
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </View>
            <View style={styles.processContainerTwo}>
              {stepsTwo.map((step, index) => {
                const isDone = index < paymentState;
                const isActive = index === paymentState;

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
                          color={
                            index <= paymentState ? colors.tertiary : "#000"
                          }
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
                    {index !== stepsTwo.length - 1 && (
                      <View
                        style={[
                          styles.line,
                          {
                            backgroundColor:
                              index <= paymentState ? colors.tertiary : "#000",
                          },
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </View>
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
              title="Product received"
              width={BUTTON_WIDTH}
              backgroundColor="#fff"
              textColor="#000"
              onPress={handleDetailsPress}
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
  container: { paddingTop: 0, paddingHorizontal: 15 },
  processContainerOne: {
    width: "57%",
    minHeight: STEP_HEIGHT,
    paddingVertical: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.tertiary,
    marginTop: 10,
  },

  processContainerTwo: {
    width: "40%",
    minHeight: STEP_HEIGHT,
    paddingVertical: 10,
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
  cancelledCircle: {
    backgroundColor: colors.red,
    borderColor: colors.red,
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
    justifyContent: "center",
    height: 30,
  },
});

export default XnewOrdersCardStepes;
