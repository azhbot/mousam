import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import Icon from "../../../components/icon";

const XproductDetailsReviews = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomLabel fontFamily="interMedium" fontSize={16}>
          Rating & Reviews
        </CustomLabel>
        <CustomButton
          backgroundColor={colors.tertiary}
          textColor="#fff"
          title="Rate Product"
          fontFamily=""
        />
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.ratings}>
          {["one", "two", "three"].map((_, index) => (
            <Icon
              color={colors.lightYellow}
              name="star"
              library="MaterialIcons"
              key={index.toString()}
            />
          ))}
        </View>
        <CustomLabel fontSize={12}>340 Ratings, 140 reviews</CustomLabel>
      </View>
      <CustomLabel fontSize={12}>client's review summary</CustomLabel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default XproductDetailsReviews;
