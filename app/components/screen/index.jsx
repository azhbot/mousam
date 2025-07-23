import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="#fff" />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
