import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";

// Get screen width
const { width } = Dimensions.get("window");

const options = ["Menu", "Display", "Orders"];

const XordersOptions = () => {
  const navigation = useNavigation();

  const handleOptionPress = (item) => {
    if (item === "Display") {
      navigation.goBack();
    } else if (item === "Menu") {
      navigation.replace("xmenu");
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
                "Orders" === item ? colors.primary : colors.veryLightGray, // Conditionally set background color
            },
          ]}
          onPress={() => handleOptionPress(item)} // Update active option on press
        >
          <CustomLabel color={"Orders" === item ? "#fff" : "#000"}>
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
    width: "100%", // Take up the full width of the screen
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

export default XordersOptions;
