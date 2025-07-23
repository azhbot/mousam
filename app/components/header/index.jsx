import { View, StyleSheet } from "react-native";

const CustomHeader = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderBottomWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default CustomHeader;
