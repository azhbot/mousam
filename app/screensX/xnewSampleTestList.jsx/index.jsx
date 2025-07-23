import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import XnewSampleTestCard from "./components/xnewSampleTestCard";
import { selectSamples } from "../../redux/sample/sampleSelector";
import { useCallback, useEffect, useState } from "react";
import { addToVerifiedSamples } from "../../redux/sample/sampleSlice";
import Camera from "../../components/camera";
import Scanner from "../../components/scanner";

const XnewSampleTestListScreen = () => {
  const dispatch = useDispatch();

  const [showScanner, setShowScanner] = useState(false);

  const samples = useSelector(selectSamples) || [];
  const currentCompanySamples = samples.filter(
    (sample) =>
      // sample.companyId === 1 &&
      sample.status !== "cancelled" &&
      sample.status !== "none" &&
      sample.status !== "rejected"
  ); // let assume 1 is current company id

  // useEffect(() => {
  //   console.log(samples, "in xnewsampletestlist");
  // }, [samples]);

  // Memoize renderItem to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({ item, index }) => <XnewSampleTestCard item={item} index={index} />,
    []
  );

  // Memoize keyExtractor to prevent unnecessary re-renders
  const keyExtractor = useCallback((item) => item?.id?.toString() || []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <CustomLabel fontFamily="interMedium">Menu</CustomLabel>
          <Icon name="chevron-right" />
          <CustomLabel fontFamily="interMedium">New Samples & Pass</CustomLabel>
        </View>
        <Pressable onPress={() => setShowScanner(true)} style={styles.scanner}>
          <CustomLabel>Scan</CustomLabel>
          <Icon name={"qrcode-scan"} />
        </Pressable>
      </View>

      <FlatList
        data={currentCompanySamples}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CustomLabel fontFamily="interMedium" style={styles.emptyText}>
              No sample tests available.
            </CustomLabel>
          </View>
        }
        initialNumToRender={10} // Render first 10 items initially
        maxToRenderPerBatch={10} // Limit the number of items rendered per batch
        windowSize={5} // Offscreen items to keep in memory
        removeClippedSubviews={true} // Unmount offscreen components
      />
      <Scanner visible={showScanner} onClose={() => setShowScanner(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scanner: {
    padding: 15,
    flexDirection: "row",
    gap: 5,
  },

  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default XnewSampleTestListScreen;
