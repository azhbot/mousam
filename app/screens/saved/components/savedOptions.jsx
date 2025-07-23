import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";

// Get screen width
const { width } = Dimensions.get("window");

const options = ["All", "Today", "Unseen"];

const SavedOptions = () => {
  const [activeOption, setActiveOption] = useState(0);

  useEffect(() => {
    setActiveOption(0);
    console.log(activeOption, "in saved option");
  }, []);

  useLayoutEffect(() => {
    setActiveOption(0);
  }, []);

  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <Pressable
          key={index.toString()}
          style={[
            styles.box,
            {
              backgroundColor:
                activeOption === index ? colors.primary : colors.veryLightGray,
            },
          ]}
          onPress={() => setActiveOption(index)} // Update active option on press
        >
          <CustomLabel
            color={activeOption === index ? "#fff" : "#000"}
            fontFamily="poppinsMedium"
          >
            {item}
          </CustomLabel>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flexDirection: "row",
    width: "100%", // Take up the full width of the screen
  },
  box: {
    width: width * 0.25, // 25% of screen width for each box
    justifyContent: "center",
    alignItems: "center", // Center text horizontally
    paddingVertical: 5,
    borderRadius: 100,
    marginLeft: 10,
  },
});

export default SavedOptions;
