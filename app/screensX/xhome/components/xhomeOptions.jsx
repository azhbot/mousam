import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Get screen width
const { width } = Dimensions.get("window");

const options = ["Menu", "Display", "Orders"];

const XhomeOptions = () => {
  const navigation = useNavigation();

  // Function to handle option selection and navigation
  const handleOptionPress = (item) => {
    if (item === "Menu") {
      navigation.navigate("xmenu");
    } else if (item === "Orders") {
      navigation.navigate("xorders");
    }
  };

  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <Pressable
          key={index.toString()}
          style={[
            styles.box,
            {
              backgroundColor:
                "Display" === item ? colors.primary : colors.veryLightGray,
            },
          ]}
          onPress={() => handleOptionPress(item)}
        >
          <CustomLabel color={"Display" === item ? "#fff" : "#000"}>
            {item}
          </CustomLabel>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  box: {
    width: width * 0.25, // 25% of screen width for each box
    justifyContent: "center",
    alignItems: "center", // Center text horizontally
    paddingVertical: 6,
    borderRadius: 100,
    marginLeft: 10,
  },
});

export default XhomeOptions;
