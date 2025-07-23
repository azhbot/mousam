import { View, StyleSheet, Pressable } from "react-native";
import CustomHeader from "../../../components/header";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";

const DueHeader = () => {
  return (
    <CustomHeader style={styles.container}>
      <Pressable onPress={() => console.log("pressed back")}>
        <Icon name="arrowleft" library="antDesign" />
      </Pressable>
      <CustomLabel fontFamily="interBold">DUE PAYMENT</CustomLabel>
    </CustomHeader>
  );
};

const styles = StyleSheet.create({
  container: { gap: 10 },
});

export default DueHeader;
