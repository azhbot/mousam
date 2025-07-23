import { View, StyleSheet, Pressable } from "react-native";
import CustomHeader from "../../../components/header";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { useNavigation } from "@react-navigation/native";

const HistoryHeader = () => {
  const navigation = useNavigation();
  return (
    <CustomHeader style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" library="antDesign" />
      </Pressable>
      <CustomLabel fontFamily="interBold">HISTORY</CustomLabel>
    </CustomHeader>
  );
};

const styles = StyleSheet.create({
  container: { gap: 10 },
});

export default HistoryHeader;
