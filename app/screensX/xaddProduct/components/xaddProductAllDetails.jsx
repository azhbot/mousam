import { View, StyleSheet, Pressable } from "react-native";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { useNavigation } from "@react-navigation/native";

const XaddProductAllDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => console.log("all pressed")}
        style={styles.rowCenter}
      >
        <CustomLabel>All Details</CustomLabel>
        <Icon name="chevron-right" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  rowCenter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.LightGray,
    padding: 10,
    justifyContent: "flex-end",
  },
});

export default XaddProductAllDetails;
