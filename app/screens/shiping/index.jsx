import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ShipingHeader from "./components/shipingHeader";
import ShipingSteps from "./components/shipingSteps";

const stepsData = [
  {
    title: "Order confirmed on Mon 13 Sep 2025",
    messages: [
      "Your order has been placed Mon 12 Jan 2025 8:30",
      "Company has processed your order Mon 12 Jan 2025 8:40",
    ],
  },
  {
    title: "Shipped on Mon 14 Sep 2025",
    messages: [
      "Your item was packed Mon 13 Sep 2025 11:00",
      "Courier received your item Mon 13 Sep 2025 11:30",
    ],
  },
  {
    title: "Out for delivery Tue 15 Sep 2025",
    messages: [
      "Your package reached the delivery center Tue 14 Sep 2025 9:00",
      "Courier started delivery Tue 15 Sep 2025 8:00",
    ],
  },
  {
    title: "Delivered on Tue 15 Sep 2025",
    messages: [
      "Delivered successfully Tue 15 Sep 2025 11:30",
      "Signed by recipient Tue 15 Sep 2025 11:32",
    ],
  },
];

// 👇 Main logic: which step is active and how many sub-steps are done
const activeStep = 1; // Index of currently active main step (0-based)
const completedSteps = {
  0: 2, // All 2 sub-steps complete for step 0
  1: 1, // Only first sub-step complete in step 1
  // step 2 & 3: nothing complete
};

const ShipingScreen = () => {
  return (
    <SafeAreaView>
      <ShipingHeader />
      <ScrollView>
        <View style={styles.container}>
          {stepsData.map((step, index) => (
            <ShipingSteps
              key={index.toString()}
              title={step.title}
              messages={step.messages}
              stepIndex={index}
              activeStep={activeStep}
              completedSubSteps={completedSteps[index] || 0}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 40,
    gap: 30,
  },
});

export default ShipingScreen;
