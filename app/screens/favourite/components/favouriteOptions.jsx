import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";

const options = ["FAVOURITES", "SHARED"];

const FavouriteOptions = ({ currentOption, handleOptionPress }) => {
  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleOptionPress(item)}>
          <CustomLabel
            style={[styles.label, currentOption === item && styles.activeLabel]}
            fontFamily="interBold"
          >
            {item}
          </CustomLabel>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: colors.LightGray,
    flexDirection: "row",
    paddingTop: 15,
    paddingLeft: 15,
    gap: 30,
  },
  label: {
    borderBottomWidth: 2,
    borderColor: "transparent",
    paddingBottom: 15,
    color: colors.LightGray,
  },
  activeLabel: {
    borderColor: colors.tertiary,
    color: colors.tertiary,
  },
});

export default FavouriteOptions;
