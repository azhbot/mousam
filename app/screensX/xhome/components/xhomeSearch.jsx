import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import { TextInput } from "react-native-gesture-handler";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const XhomeSearch = () => {
  return (
    <View style={styles.container}>
      <View>
        <CustomLabel>My Products</CustomLabel>
      </View>
      <View style={styles.inputBox}>
        <TextInput placeholder="Search products" style={styles.input} />
        <Icon name="search" library="feather" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 20,
  },
  inputBox: {
    flex: 1,
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,

    borderRadius: 10,
  },
  input: {
    flex: 1,
  },
});

export default XhomeSearch;
