import { View, StyleSheet, Pressable } from "react-native";

import CustomLable from "../../../components/label";

const XnewOrderListHeader = () => {
  return (
    <View style={styles.header}>
      <CustomLable fontFamily="interBold">MY STORE</CustomLable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 42,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
  },
});

export default XnewOrderListHeader;
