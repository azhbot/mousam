import { View, StyleSheet } from "react-native";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";

const XreturnedAndCancelledButton = ({
  onPress,
  title,
  disabled,
  disabledColor,
}) => {
  return (
    <CustomButton
      backgroundColor={colors.primary}
      borderRadius={0}
      style={styles.continueButton}
      title={title}
      height={50}
      onPress={onPress}
      disabledColor={disabledColor}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  continueButton: {
    width: "100%",
    alignSelf: "center",
  },
});

export default XreturnedAndCancelledButton;
