import { StyleSheet, Pressable } from "react-native";
import CustomLabel from "../label";
import { colors } from "../../constant/colors";

const CustomButton = ({
  title,
  textColor = "white",
  backgroundColor = "black",
  borderRadius = 100,
  fontSize = 16,
  fontFamily = "poppinsRegular",
  height = 40,
  width,
  onPress,
  style,
  disabled = false,
  disabledColor, // ❌ no default
  opacity = 1,
  paddingHorizontal = 10,
}) => {
  const isTrulyDisabled = disabled && disabledColor;

  const buttonStyle = {
    backgroundColor: isTrulyDisabled ? disabledColor : backgroundColor,
    borderRadius,
    height,
    width,
    opacity,
    paddingHorizontal,
  };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={[buttonStyle, styles.button, style]}
    >
      <CustomLabel
        color={isTrulyDisabled ? "#444444" : textColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
      >
        {title}
      </CustomLabel>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomButton;
