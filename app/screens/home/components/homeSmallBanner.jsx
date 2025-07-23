import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";

const { width } = Dimensions.get("window");

const HomeSmallBanner = () => {
  return (
    <TouchableOpacity
      onPress={() => console.log("Banner Pressed")}
      style={styles.container}
      activeOpacity={0.8}
    >
      <CustomLabel fontSize={16} fontFamily="poppinsMedium">
        New For You, Explore Now
      </CustomLabel>
      <Icon
        name="chevron-right"
        library="feather"
        size={22}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.02,
    marginBottom: 15,
    height: 52,
    backgroundColor: colors?.lightYellow,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default HomeSmallBanner;
