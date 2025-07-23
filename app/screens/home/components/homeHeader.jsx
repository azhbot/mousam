import { View, StyleSheet, Pressable } from "react-native";
import Customlabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../../../constant/icons";

const HomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Icon name="menu" library="feather" color={colors.primary} />
        </Pressable>
        <Customlabel
          color={colors.primary}
          fontFamily="poppinsBold"
          fontSize={20}
          style={{ marginTop: 4 }}
        >
          MOUSAM
        </Customlabel>
      </View>
      <View style={styles.headerRight}>
        <Pressable onPress={() => navigation.navigate("favourite")}>
          <Icon color={colors.red} size={26} source={icons.heartRed} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("cart")}>
          <Icon
            color={colors.primary}
            size={26}
            name="cart-outline"
            library="ionicons"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
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

export default HomeHeader;
