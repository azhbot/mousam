import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import SampleTestSummaryHeader from "./components/sampleTestSummaryHeader";
import SampleTestSummaryCard from "./components/sampleTestSummaryCard";
import CustomLabel from "../../components/label";
import { selectSamples } from "../../redux/sample/sampleSelector";
import { colors } from "../../constant/colors";

const SampleTestSummaryScreen = () => {
  const navigation = useNavigation();
  const samples = useSelector(selectSamples);

  useEffect(() => {
    console.log(samples, "in sampleTest");
  }, [samples]);

  if (!samples || samples.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <SampleTestSummaryHeader />
        {/* <View style={styles.title}>
          <CustomLabel fontFamily="interMedium">
            Sample Test Summary
          </CustomLabel>
        </View> */}
        <View style={styles.emptyContainer}>
          <CustomLabel color={"#888"}>No samples available.</CustomLabel>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <SampleTestSummaryHeader /> */}

      <FlatList
        data={samples}
        keyExtractor={(item, index) => item?.sampleId?.toString() || index}
        ListHeaderComponent={
          <View style={styles.title}>
            <CustomLabel fontFamily="poppinsMedium">
              Sample Test Summary
            </CustomLabel>
          </View>
        }
        renderItem={({ item }) => <SampleTestSummaryCard item={item} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default SampleTestSummaryScreen;
