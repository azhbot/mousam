import { View } from "react-native";

const CustomLine = ({
  height = 1,
  color = "#000",
  marginBottom,
  marginTop,
  marginVertical,
}) => {
  return (
    <View
      style={{
        height,
        backgroundColor: color,
        marginTop,
        marginBottom,
        marginVertical,
      }}
    />
  );
};

export default CustomLine;
