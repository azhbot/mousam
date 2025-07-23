import { View, StyleSheet, Dimensions } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

const SampleTestSteps = ({ currentSample }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [status, setStatus] = useState("none");

  useEffect(() => {
    if (currentSample?.status === "ready") {
      setStatus("ready");
      setCurrentStep(3);
    }
    // if (currentSample?.status === "rejected") {
    //   setStatus("rejected");
    //   setCurrentStep(4);
    // }
    if (currentSample?.status === "accepted") {
      setStatus("accepted");
      setCurrentStep(2);
    }
    if (currentSample?.status === "cancelled") {
      setStatus("cancelled");
      setCurrentStep(4);
    }
    if (currentSample?.status === "passed") {
      console.log("the real problem is here homie ....");
      setStatus("passed");
      setCurrentStep(4);
    }
  }, [currentSample?.status]);

  // useEffect(() => {
  //   console.log(status, "in sampleTestSteps");
  // }, [status]);

  return (
    <View style={styles.container}>
      {/* Step 1 */}
      <View style={styles.box}>
        <View
          style={
            currentStep > 1
              ? styles.doneCircle
              : currentStep === 1
              ? styles.activeCircle
              : styles.circle
          }
        >
          {currentStep > 2 ? (
            <Icon name="done" library="materialIcons" color="#fff" />
          ) : (
            <CustomLabel color={currentStep > 2 ? "black" : colors.LightGray}>
              1
            </CustomLabel>
          )}
        </View>
        <CustomLabel fontFamily="interMedium" fontSize={12}>
          Address
        </CustomLabel>
      </View>
      <View
        style={[
          styles.line,
          {
            backgroundColor:
              currentStep > 1 ? colors.tertiary : colors.LightGray,
          },
        ]}
      />

      {/* Step 2 */}
      <View style={styles.box}>
        <View
          style={
            currentStep > 2
              ? styles.doneCircle
              : currentStep === 2
              ? styles.activeCircle
              : styles.circle
          }
        >
          {currentStep > 2 ? (
            <Icon name="done" library="materialIcons" color="#fff" />
          ) : (
            <CustomLabel
              color={currentStep === 2 ? colors.tertiary : colors.LightGray}
            >
              2
            </CustomLabel>
          )}
        </View>
        <CustomLabel fontSize={12} fontFamily="interMedium">
          Request for Sample
        </CustomLabel>
      </View>
      <View
        style={[
          styles.line,
          {
            backgroundColor:
              currentStep > 2 ? colors.tertiary : colors.LightGray,
          },
        ]}
      />

      {/* Step 3 */}
      <View style={styles.box}>
        <View
          style={[
            currentStep > 3
              ? [
                  styles.doneCircle,
                  {
                    backgroundColor:
                      status === "cancelled" ? "red" : colors.tertiary,
                  },
                ]
              : currentStep === 3
              ? styles.activeCircle
              : styles.circle,
          ]}
        >
          {currentStep > 3 ? (
            <Icon
              name={status === "cancelled" ? "close" : "done"}
              library="materialIcons"
              color="#fff"
            />
          ) : (
            <CustomLabel
              color={currentStep === 3 ? colors.tertiary : colors.LightGray}
            >
              3
            </CustomLabel>
          )}
        </View>
        <CustomLabel fontSize={12} fontFamily="interMedium">
          {currentSample?.status === "cancelled" ? "Failed" : "  Passed"}
        </CustomLabel>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  box: {
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.LightGray,
  },
  doneCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: width * 0.2,
    height: 1,

    marginBottom: 15,
  },
});

export default SampleTestSteps;
