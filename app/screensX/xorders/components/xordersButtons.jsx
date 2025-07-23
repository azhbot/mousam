import { View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";

const XordersButtons = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate("xnewOrderList")}
          style={styles.button}
        >
          <CustomLabel fontFamily="interBold" fontSize={16}>
            New Orders
          </CustomLabel>
          <Icon name="chevron-right" />
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate("xnewSampleTestList")}
          style={styles.button}
        >
          <CustomLabel fontFamily="interBold" fontSize={16}>
            New Sample Test
          </CustomLabel>
          <Icon name="chevron-right" />
        </Pressable>
      </View> */}

      <Pressable
        onPress={() => navigation.navigate("xnewOrderList")}
        style={styles.firstBox}
      >
        <Icon name={"checklist"} library={"octicons"} size={60} />
        <CustomLabel fontSize={20}>New Orders</CustomLabel>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("xnewSampleTestList")}
        style={styles.firstBox}
      >
        <Icon name={"stack"} library={"octicons"} size={60} />
        <CustomLabel fontSize={20}>New Samples & Pass </CustomLabel>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 60,
    paddingTop: 80,
  },
  firstBox: {
    alignItems: "center",
  },
  buttonContainer: {
    height: 64,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "96%",
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default XordersButtons;
