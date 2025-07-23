import { View, StyleSheet, Text } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const TestScreen = () => {
  const handleSwipe = (direction) => {
    console.log(`Swiped to the ${direction}`);
    // You can run any other function here
  };

  return (
    <Swipeable
      onSwipeableLeftOpen={() => handleSwipe("left")}
      onSwipeableRightOpen={() => handleSwipe("right")}
    >
      <View style={styles.container}>
        <Text>I am text</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TestScreen;
