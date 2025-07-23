import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import XordersHeader from "./components/xordersHeader";
import XordersOptions from "./components/xordersOptions";
import XordersButtons from "./components/xordersButtons";

const XordersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <XordersHeader />
      <XordersOptions />
      <XordersButtons />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default XordersScreen;
