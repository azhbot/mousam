import { View, StyleSheet, ActivityIndicator } from "react-native";

const Loading = ({
  size = "large",
  color = "#0000ff",
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // fills available space (can be overridden)
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
