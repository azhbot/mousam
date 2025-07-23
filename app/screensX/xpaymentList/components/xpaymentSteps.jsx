import { View, StyleSheet, Dimensions } from "react-native";
import CustomLabel from "../../../components/label";
import CustomLine from "../../../components/line";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const { width } = Dimensions.get("window");

const XpaymentSteps = ({ activeStep, isSingle }) => {
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            bottom: 46,
            width: "100%",
          }}
        >
          {!isSingle && (
            <View
            // style={{
            //   backgroundColor: "#fff",
            //   paddingHorizontal: 6,

            //   borderRadius: 5,
            // }}
            >
              <CustomLabel
                color={"#666666"}
                fontSize={14}
                fontFamily="poppinsMedium"
              >
                Rs 10000
              </CustomLabel>
            </View>
          )}
        </View>
        {!isSingle ? (
          <>
            <View style={styles.box}>
              {activeStep >= 2 ? (
                <View style={styles.doneCircle}>
                  <Icon name="done" library="materialIcons" color="#fff" />
                </View>
              ) : (
                <View style={styles.activeCircle}>
                  <CustomLabel
                    fontFamily="interRegular"
                    color={colors.tertiary}
                  >
                    1
                  </CustomLabel>
                </View>
              )}
              <CustomLabel color={colors.tertiary} fontSize={12}>
                60% pay
              </CustomLabel>
              <CustomLabel color={colors.tertiary} fontSize={14}>
                Rs 6000
              </CustomLabel>
            </View>
            <View
              style={[
                styles.line,
                {
                  backgroundColor:
                    activeStep === 2 ? colors.tertiary : colors.gray,
                },
              ]}
            />
            <View style={styles.box}>
              {activeStep >= 3 ? (
                <View style={styles.doneCircle}>
                  <Icon name="done" library="materialIcons" color="#fff" />
                </View>
              ) : (
                <View
                  style={activeStep >= 2 ? styles.activeCircle : styles.circle}
                >
                  <CustomLabel
                    fontFamily="interRegular"
                    color={activeStep >= 2 ? colors.tertiary : colors.gray}
                  >
                    2
                  </CustomLabel>
                </View>
              )}
              <CustomLabel
                color={activeStep >= 2 ? colors.tertiary : colors.gray}
                fontSize={12}
              >
                Rest 40% pay
              </CustomLabel>
              <CustomLabel
                color={activeStep >= 2 ? colors.tertiary : colors.gray}
                fontSize={14}
              >
                Rs 4000
              </CustomLabel>
            </View>
          </>
        ) : (
          <View style={styles.box}>
            {activeStep >= 3 ? (
              <View style={styles.doneCircle}>
                <Icon name="done" library="materialIcons" color="#fff" />
              </View>
            ) : (
              <View
                style={activeStep >= 1 ? styles.activeCircle : styles.circle}
              >
                <CustomLabel
                  fontFamily="interRegular"
                  color={activeStep >= 1 ? colors.tertiary : colors.gray}
                >
                  1
                </CustomLabel>
              </View>
            )}
            <CustomLabel
              fontSize={12}
              color={activeStep >= 1 ? colors.tertiary : colors.gray}
            >
              100% pay
            </CustomLabel>
            <CustomLabel
              color={activeStep >= 1 ? colors.tertiary : colors.gray}
              fontSize={14}
            >
              Rs 10000
            </CustomLabel>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "center",
    width: "100%",
  },
  box: {
    alignItems: "center",
    width: 100,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  doneCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: width * 0.2,
    height: 1,
    backgroundColor: colors.gray,
    marginBottom: 15,
  },
});

export default XpaymentSteps;
