import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";

const XproductDetailsPhotoReviews = () => {
  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="interMedium" fontSize={16}>
        Photos
      </CustomLabel>
      <View style={styles.boxes}>
        {["one", "two", "three"].map((_, index) => (
          <View style={styles.box} key={index.toString()}></View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  boxes: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  box: {
    height: 50,
    width: 60,
    backgroundColor: "red",
  },
});

export default XproductDetailsPhotoReviews;
