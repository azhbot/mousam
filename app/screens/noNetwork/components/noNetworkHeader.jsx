import { View, StyleSheet, Pressable } from "react-native";

import CustomHeader from "../../../components/header";
import CustomLable from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const NoNetworkHeader = () => {
  return (
    <CustomHeader style={styles.header}>
      <View style={styles.headerLeft}>
        <Pressable onPress={() => console.log("menu pressed")}>
          <Icon name="menu" library="feather" color={colors.primary} />
        </Pressable>
        <CustomLable
          color={colors.primary}
          fontFamily="interBold"
          fontSize={20}
        >
          MOUSAM
        </CustomLable>
      </View>
      <View style={styles.headerRight}>
        <Pressable onPress={() => console.log("favourite Pressed")}>
          <Icon color={colors.red} name="heart" library="antDesign" />
        </Pressable>
        <Pressable onPress={() => console.log("cart Pressed")}>
          <Icon color={colors.primary} name="cart-outline" library="ionicons" />
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

export default NoNetworkHeader;
