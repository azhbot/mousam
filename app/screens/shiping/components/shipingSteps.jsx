import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";

const ShipingSteps = ({
  title,
  messages,
  stepIndex,
  activeStep,
  completedSubSteps,
}) => {
  const isCompleted = stepIndex < activeStep;
  const isActive = stepIndex === activeStep;
  const isPending = stepIndex > activeStep;

  const stepColor = isCompleted || isActive ? "green" : "black";

  return (
    <View style={styles.container}>
      {/* Main Step Header */}
      <View style={styles.mainStep}>
        <View
          style={[
            styles.circle,
            {
              borderColor: stepColor,
              backgroundColor: isCompleted ? "green" : "white",
            },
          ]}
        >
          <CustomLabel style={{ color: isCompleted ? "white" : stepColor }}>
            {stepIndex + 1}
          </CustomLabel>
        </View>
        <CustomLabel fontFamily="interMedium" style={{ color: stepColor }}>
          {title}
        </CustomLabel>
      </View>

      {/* Sub-Steps */}
      <View style={styles.subStepsContainer}>
        <View style={[styles.verticalLine, { backgroundColor: stepColor }]} />
        <View style={styles.subSteps}>
          {messages.map((item, index) => {
            const isSubStepDone = index < completedSubSteps;
            const subStepColor = isSubStepDone ? "green" : "black";

            return (
              <View style={styles.subStep} key={index.toString()}>
                <Icon
                  name={isSubStepDone ? "check-square" : "square"}
                  library="feather"
                  size={11}
                  color={subStepColor}
                />
                <CustomLabel fontSize={11} style={{ color: subStepColor }}>
                  {item}
                </CustomLabel>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subStepsContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 20,
    marginLeft: 15,
  },
  subSteps: {
    margin: 10,
    gap: 10,
    flex: 0.5,
  },
  subStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#000",
  },
});

export default ShipingSteps;
