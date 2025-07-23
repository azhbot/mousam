import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomLable from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user/userSelector";

const AccountHeader = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <CustomLable
            color={colors.primary}
            fontFamily="interMedium"
            fontSize={14}
          >
            MY ACCOUNT
          </CustomLable>
        </View>
        {/* <View style={styles.headerMiddle}>
          <CustomLable fontSize={12} fontFamily="interMedium">
            Verified
          </CustomLable>
          <Icon
            color={colors.tertiary}
            name="verified"
            library="materialIcons"
            size={16}
          />
        </View> */}
        <View style={styles.headerRight}>
          <Pressable onPress={() => navigation.navigate("qr", { id: user.id })}>
            <Icon size={26} name="qrcode" />
          </Pressable>
        </View>
      </View>
    </>
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
  },
  headerLeft: {
    flex: 1,

    justifyContent: "center",
    gap: 10,
  },
  headerMiddle: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 10,
    flex: 1,
  },
});

export default AccountHeader;
