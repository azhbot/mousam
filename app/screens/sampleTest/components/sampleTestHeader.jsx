import { View, StyleSheet, Pressable } from "react-native";
import CustomHeader from "../../../components/header";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { useNavigation } from "@react-navigation/native";

const SampleTestHeader = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <CustomHeader style={styles.container}>
        <Icon name="arrowleft" library="antDesign" />
        <CustomLabel fontFamily="interBold">APPLY FOR SAMPLE TEST</CustomLabel>
      </CustomHeader>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { gap: 10 },
});

export default SampleTestHeader;
