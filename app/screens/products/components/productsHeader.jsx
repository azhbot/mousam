import { View, StyleSheet, Pressable } from "react-native";
import CustomHeader from "../../../components/header";
import CustomLabel from "../../../components/label"; // Fixed typo
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../../../constant/icons";

const ProductsHeader = () => {
  const navigation = useNavigation();
  return (
    <CustomHeader style={styles.header}>
      <View style={styles.headerLeft}>
        <CustomLabel fontFamily="interBold" style={{ marginTop: 4 }}>
          CATEGORY
        </CustomLabel>
      </View>

      <View style={styles.headerRight}>
        <Pressable
          onPress={() => navigation.navigate("favourite")}
          accessibilityLabel="Favourite"
        >
          <Icon color={colors.red} size={26} source={icons.heartRed} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("cart")}
          accessibilityLabel="Cart"
        >
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

export default ProductsHeader;
