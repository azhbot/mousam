import { View, StyleSheet, ActivityIndicator } from "react-native";
import CustomLabel from "../../components/label";
import { colors } from "../../constant/colors";

const WaitingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={60}
        color={colors.tertiary}
        style={{ bottom: 20 }}
      />
      <CustomLabel>
        Your verification is in Progress. Please Hold on, Something Greate is
        Coming Next...
      </CustomLabel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WaitingScreen;
