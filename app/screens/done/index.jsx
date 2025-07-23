import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text } from "react-native";
import animations from "../../constant/animations";
import CustomLabel from "../../components/label";

const DoneScreen = ({ route }) => {
  const navigation = useNavigation();

  const goBack = route?.params || 2;

  setTimeout(() => {
    navigation.pop(goBack);
  }, 10);

  return (
    <View style={styles.container}>
      <LottieView
        source={animations.done}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200 }}
      />
      <CustomLabel>Done</CustomLabel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DoneScreen;
