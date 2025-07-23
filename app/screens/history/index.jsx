import { View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import HistoryHeader from "./components/historyHeader";
import HistoryCards from "./components/historyCards";

const HistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HistoryHeader />
      <HistoryCards />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryScreen;
