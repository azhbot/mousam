import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";

const XproductDetailsAdditionalDetails = () => {
  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="interMedium" fontSize={16}>
        Additional Product Details
      </CustomLabel>
      <View style={styles.additionalDetails}>
        {["one", "two", "three", "four", "five"].map((item, index) => (
          <View style={styles.boxContainer} key={index.toString()}>
            <View style={styles.boxOne}></View>
            <View style={styles.boxTwo}></View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  additionalDetails: {
    gap: 10,
    paddingTop: 10,
  },
  boxContainer: {
    flexDirection: "row",
    gap: 10,
  },
  boxOne: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
  boxTwo: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    flex: 3,
  },
});

export default XproductDetailsAdditionalDetails;
