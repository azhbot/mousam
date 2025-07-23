import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomHeader from "../../../components/header";
import CustomLable from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { icons } from "../../../constant/icons";

const SavedListHeader = () => {
  const navigation = useNavigation();
  return (
    <CustomHeader style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={styles.headerLeft}>
          <Icon name="arrowleft" library="antDesign" />
          <CustomLable fontFamily="interBold" style={{ marginTop: 4 }}>
            ALL COLLECTION
          </CustomLable>
        </View>
      </Pressable>
      <View style={styles.headerRight}>
        <Pressable onPress={() => navigation.navigate("favourite")}>
          <Icon color={colors.red} size={26} source={icons.heartRed} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("cart")}>
          <Icon
            color={colors.primary}
            name="cart-outline"
            library="ionicons"
            size={26}
          />
        </Pressable>
      </View>
    </CustomHeader>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default SavedListHeader;
