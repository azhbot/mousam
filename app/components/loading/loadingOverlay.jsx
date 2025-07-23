import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // semi-transparent black
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // ensure it's on top
  },
});

export default LoadingOverlay;
