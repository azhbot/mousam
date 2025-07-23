import { View, StyleSheet } from "react-native";
import XmenuOptions from "./components/xmenuOptions";
import XmenuHeader from "./components/xmenuHeader";
import XmenuButtons from "./components/xmenuButtons";
import { SafeAreaView } from "react-native-safe-area-context";

const XmenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <XmenuHeader />
      <XmenuOptions />
      <XmenuButtons />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default XmenuScreen;
