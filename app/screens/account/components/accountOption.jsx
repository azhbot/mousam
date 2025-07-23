import { View, StyleSheet, Pressable } from "react-native";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import CustomImage from "../../../components/image";
import { icons } from "../../../constant/icons";

const AccountOption = ({ item, index, handleOptionPress }) => {
  return (
    <Pressable
      onPress={() => handleOptionPress(item)}
      style={styles.option}
      accessibilityRole="button"
      accessibilityLabel={`Account option: ${item.label}`}
    >
      <View style={styles.optionLeft}>
        {index === 6 ? (
          <CustomImage source={icons.heartRed} size={24} />
        ) : (
          <Icon
            library={item.library}
            color={colors.primary}
            name={item.icon}
          />
        )}
        <CustomLabel color={colors.primary} fontFamily="poppinsMedium">
          {item.label}
        </CustomLabel>
      </View>
      <Icon
        library="materialIcons"
        color={colors.primary}
        name="chevron-right"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // If you need compatibility, replace with margin on children
  },
});

export default AccountOption;
