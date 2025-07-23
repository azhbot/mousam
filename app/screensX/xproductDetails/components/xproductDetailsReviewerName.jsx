import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const XproductDetailsReviewerName = () => {
  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="interMedium" fontSize={16}>
        {" "}
        Name of The ReViewer
      </CustomLabel>
      <View style={styles.ratingsContainer}>
        <View style={styles.uploadPhoto}></View>
        <View style={styles.ratings}>
          {["one", "two", "three"].map((_, index) => (
            <Icon
              color={colors.lightYellow}
              name="star"
              library="MaterialIcons"
              key={index.toString()}
            />
          ))}
          <CustomLabel fontFamily="interMedium" fontSize={16}>
            4.5
          </CustomLabel>
        </View>
      </View>
      <View style={styles.reviews}>
        <CustomLabel>Comment : This is an awesome product</CustomLabel>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
  ratingsContainer: {
    flexDirection: "row",
  },
  uploadPhoto: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
  },
  ratings: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  reviews: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 5,
    padding: 10,
  },
});

export default XproductDetailsReviewerName;
