import { View, StyleSheet, Pressable } from "react-native";
import CustomHeader from "../../../components/header";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { useNavigation } from "@react-navigation/native";

const ShipingHeader = () => {
  const naviagtion = useNavigation();
  return (
    <CustomHeader style={styles.container}>
      <Pressable onPress={() => naviagtion.goBack()}>
        <Icon name="arrowleft" library="antDesign" />
      </Pressable>
      <CustomLabel fontFamily="interBold">Shiping Details</CustomLabel>
    </CustomHeader>
  );
};

const styles = StyleSheet.create({
  container: { gap: 10 },
});

export default ShipingHeader;
