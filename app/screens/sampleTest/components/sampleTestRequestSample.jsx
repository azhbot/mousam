import { View, StyleSheet, Dimensions, Button } from "react-native";
import CustomLabel from "../../../components/label";
import CustomButton from "../../../components/button";
import Icon from "../../../components/icon"; // ✅ Add Icon import
import { colors } from "../../../constant/colors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeFromsamples,
  updateReturnStatus,
  updateSampleStatus,
} from "../../../redux/sample/sampleSlice";
import { showMessage } from "../../../utils/customMsgUtil";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const SampleTestRequestSample = ({
  handleSampleRequest = () => {},
  isRequestSent,
  currentSample,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (currentSample?.status === "requested") {
      setCurrentStep(2);
    }
    if (currentSample?.status === "accepted") {
      setCurrentStep(3);
    }
    if (currentSample?.status === "rejected") {
      setCurrentStep(3);
    }
    if (currentSample?.status === "ready") {
      setCurrentStep(4);
    }
  }, [currentSample]);

  const handleReturn = () => {
    if (currentSample?.status === "accepted") {
      const sampleId = currentSample?.id;
      dispatch(updateSampleStatus({ sampleId, status: "ready" }));
      showMessage("sent");
    }
  };

  // if (currentSample?.status === "passed") {
  //   return (
  //     <View style={{ alignItems: "center", paddingVertical: 100 }}>
  //       <Icon name="done" library="materialIcons" size={50} color={"green"} />
  //     </View>
  //   );
  // }

  // if (currentSample?.status === "rejected" || "cancelled") {
  //   return (
  //     <View style={{ alignItems: "center", paddingVertical: 100 }}>
  //       <Icon name="cancel" library="materialIcons" size={50} color={"red"} />
  //     </View>
  //   );
  // }

  const handleTryAgain = () => {
    dispatch(removeFromsamples({ id: currentSample?.id }));
    console.log("removed succesfuly");
    navigation.goBack();
  };

  const renderCircle = (step) => {
    if (currentStep > step) {
      let isRejectedStep2 = currentSample?.status === "rejected" && step === 2;

      return (
        <View
          style={[
            styles.doneCircle,
            { backgroundColor: isRejectedStep2 ? colors.red : colors.green },
          ]}
        >
          {isRejectedStep2 ? (
            <Icon name="close" color="#fff" />
          ) : (
            <Icon name="done" library="materialIcons" color="#fff" />
          )}
        </View>
      );
    } else if (currentStep === step) {
      return (
        <View style={styles.activeCircle}>
          <CustomLabel color={colors.green}>{step}</CustomLabel>
        </View>
      );
    } else {
      return (
        <View style={styles.circle}>
          <CustomLabel color={colors.LightGray}>{step}</CustomLabel>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Step 1 */}
      <View style={styles.box}>
        {renderCircle(1)}
        <View style={styles.boxRight}>
          <CustomLabel fontFamily="interMedium" fontSize={12}>
            First send Request
          </CustomLabel>
          <CustomButton
            onPress={handleSampleRequest}
            backgroundColor={currentSample ? "#fff" : colors.tertiary}
            textColor={currentSample ? colors.tertiary : "#fff"}
            style={{
              borderWidth: currentSample ? 1 : 0,
              borderColor: colors.tertiary,
            }}
            title="Send"
            disabled={currentSample}
            width={width * 0.25}
            height={34}
          />
        </View>
      </View>

      <View
        style={[
          styles.line,
          {
            backgroundColor: currentStep > 1 ? colors.green : colors.LightGray,
          },
        ]}
      />

      {/* Step 2 */}
      <View style={styles.box}>
        {renderCircle(2)}
        <View style={styles.boxRight}>
          <CustomLabel fontFamily="interMedium" fontSize={12}>
            {currentSample?.status === "rejected" ? "Rejected" : "Accepted"} by
            MOUSAM partner
          </CustomLabel>
        </View>
      </View>

      <View
        style={[
          styles.line,
          {
            backgroundColor: currentStep > 2 ? colors.green : colors.LightGray,
          },
        ]}
      />

      {/* Step 3 */}
      <View style={styles.box}>
        {renderCircle(3)}
        <View style={styles.boxRight}>
          <View style={styles.textContainer}>
            <CustomLabel fontFamily="interMedium" fontSize={12}>
              Request will be sent automatically within 3 days
            </CustomLabel>
          </View>
          <CustomButton
            onPress={handleReturn}
            title="Ready"
            width={width * 0.25}
            height={34}
            backgroundColor={
              currentSample?.status === "ready"
                ? "#fff"
                : currentSample?.status === "rejected"
                ? colors.gray
                : colors.tertiary
            }
            textColor={
              currentSample?.status === "ready" ? colors.tertiary : "#fff"
            }
            style={{
              borderWidth: currentSample?.status === "ready" ? 1 : 0,
              borderColor: colors.tertiary,
            }}
            disabled={currentSample?.status === "ready"?.isReturned}
          />
        </View>
      </View>
      {currentSample?.status === "rejected" && (
        <CustomButton
          width={"60%"}
          style={{ marginTop: 60, alignSelf: "center" }}
          onPress={handleTryAgain}
          title={"Opps! Try again..."}
          backgroundColor={colors.veryLightGray}
          textColor="#000"
          paddingHorizontal={20}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    gap: 5,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.LightGray,
  },
  activeCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.green,
  },
  doneCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  boxRight: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: colors.LightGray,
  },
  textContainer: {
    flex: 1,
  },
  line: {
    height: 50,
    width: 1,

    left: width * 0.036,
  },
});

export default SampleTestRequestSample;
