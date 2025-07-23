import { View, StyleSheet, BackHandler } from "react-native";
import XhomeHeader from "./components/xhomeHeader";
import XhomeOptions from "./components/xhomeOptions";
import XhomeAddNewButton from "./components/xhomeAddNewButton";
import XhomeSearch from "./components/xhomeSearch";
import XhomeItemCards from "./components/xhomeItemCards";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

const XhomeScreen = () => {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: "drawer" }],
        });
        return true; // Prevent default behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <XhomeHeader />
      <XhomeOptions />
      <XhomeAddNewButton />
      <XhomeSearch />
      <XhomeItemCards />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default XhomeScreen;
