import { View, StyleSheet, Pressable, TextInput } from "react-native";

import CustomHeader from "../../../components/header";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";

const XproductDetailsHeader = () => {
  const navigation = useNavigation();
  return (
    <CustomHeader style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={styles.headerLeft}>
          <Icon name="arrowleft" library="antDesign" />
        </View>
      </Pressable>
      {/* <View style={styles.middle}>
        <Icon name="search" library="feather" />
        <TextInput style={styles.inputBox} placeholder="Search" />
        <Pressable
          onPress={() => console.log("search button pressed")}
          style={styles.icon}
        >
          <Icon name="mic" library="feather" />
        </Pressable>
        <Pressable
          onPress={() => console.log("search button pressed")}
          style={styles.icon}
        >
          <Icon name="camera" library="feather" />
        </Pressable>
      </View>
      <View style={styles.headerRight}>
        <Pressable onPress={() => console.log("favourite Pressed")}>
          <Icon color={colors.red} name="heart" library="antDesign" size={26} />
        </Pressable>
        <Pressable onPress={() => console.log("cart Pressed")}>
          <Icon
            color={colors.primary}
            name="cart-outline"
            library="ionicons"
            size={26}
          />
        </Pressable>
      </View> */}
    </CustomHeader>
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
    borderRadius: 6,
    backgroundColor: colors.secondary,
  },
  inputBox: {
    flex: 1,
  },
});

export default XproductDetailsHeader;
