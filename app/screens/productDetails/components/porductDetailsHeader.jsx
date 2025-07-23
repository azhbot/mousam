import { View, StyleSheet, Pressable, TextInput } from "react-native";

import CustomHeader from "../../../components/header";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../../../constant/icons";
import CustomLabel from "../../../components/label";

const ProductDetailsHeader = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomHeader style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.headerLeft}>
            <Icon name="arrowleft" library="antDesign" />
          </View>
        </Pressable>
        <View style={styles.middle}>
          <Icon name="search" library="feather" />
          <Pressable
            onPress={() => navigation.navigate("search")}
            style={styles.inputBox}
          >
            <CustomLabel fontSize={12}>Search</CustomLabel>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("search", { openMic: true })}
            style={styles.icon}
          >
            <Icon name="mic" library="feather" />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("search", { openCamera: true })}
            style={styles.icon}
          >
            <Icon name="camera" library="feather" />
          </Pressable>
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={() => navigation.replace("favourite")}>
            <Icon color={colors.red} size={26} source={icons.heartRed} />
          </Pressable>
          <Pressable onPress={() => navigation.replace("cart")}>
            <Icon
              color={colors.primary}
              name="cart-outline"
              library="ionicons"
              size={26}
            />
          </Pressable>
        </View>
      </CustomHeader>
      <View style={{ height: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
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
  middle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.secondary,
  },
  inputBox: {
    height: 40,
    flex: 1,
    justifyContent: "center",
  },
});

export default ProductDetailsHeader;
