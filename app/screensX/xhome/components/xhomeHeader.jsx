import { View, StyleSheet, Pressable } from "react-native";

import CustomLable from "../../../components/label";
import Icon from "../../../components/icon";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import { useNavigation } from "@react-navigation/native";

const XhomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <VerifiedCompanyName companyNameSize="large" />
      </View>

      <View style={styles.headerRight}>
        <CustomLable fontFamily="poppinsMedium" style={{ marginTop: 3 }}>
          My Store
        </CustomLable>
        <Pressable onPress={() => navigation.navigate("qr")}>
          <Icon size={26} name="qrcode" />
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
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc", // Optional improvement
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    flex: 1,
  },
});

export default XhomeHeader;
