import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "../../../utils/customMsgUtil";

const height = Dimensions.get("screen").height;
const CONTENT_HEIGHT = height * 0.7;

const buttonTitles = [
  { name: "My Office", icon: "microsoft-office", route: "xoffice" },
  {
    name: "Verified Samples",
    icon: "domain-verification",
    library: "materialIcons",
    route: "xsampleVerifiedList",
  },
  {
    name: "Sample Invoices",
    icon: "cloud-print",
    route: "xsamplePrintList",
  },
  {
    name: "Total Samples",
    icon: "product-hunt",
    library: "fontAwesome",
    route: "xtotalSamples",
  },
  {
    name: "Verified Orders",
    icon: "order-bool-ascending-variant",
    route: "xorderVerifiedList",
  },
  {
    name: "Order Invoices",
    icon: "cloud-print-outline",
    route: "xorderPrintList",
  },
  {
    name: "Total Orders & Payments",
    icon: "payment",
    library: "materialIcons",
    route: "xpaymentList",
  },
  {
    name: "Returned & Cancelled Orders",
    icon: "email",
    route: "xreturnedAndCancelled",
  },

  {
    name: "Shipping Address",
    icon: "card-account-details-outline",
    route: "xaddressChange",
  },
  {
    name: "MOUSAM Verified",
    icon: "verified",
    library: "materialIcons",
    route: "",
  },
  {
    name: "Security PIN",
    icon: "lock",
    library: "materialIcons",
    route: "xpassPIN",
  },
  {
    name: "Performance",
    icon: "system-security-update-good",
    library: "materialIcons",
    route: "",
  },
  {
    name: "Spam",
    icon: "theater-comedy",
    library: "materialIcons",
    route: "",
  },
  { name: "Help center", icon: "help-rhombus", route: "" },
  { name: "About", icon: "all-inclusive-box", route: "" },
];

const XmenuButtons = () => {
  const navigation = useNavigation();

  const handleMenuButtonPress = (item) => {
    if (item.route === "xpassPIN") {
      navigation.navigate("xpassPIN", { nextScreen: "xpassPINCreate" });
      console.log("next level");
    } else if (item.route) {
      navigation.navigate(item.route);
    } else {
      showMessage("Oops! This screen is work in progress");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {buttonTitles.map((item, index) => {
        const needMargin = index === 0 || index === 3 || index === 7;

        return (
          <Pressable
            onPress={() => handleMenuButtonPress(item)}
            style={[styles.rowCenter, needMargin && { marginBottom: 20 }]}
            key={index.toString()}
          >
            <View style={styles.rowCenter}>
              <Icon
                name={item?.icon}
                size={20}
                color={index !== 9 ? colors.primary : colors.tertiary}
                library={item?.library}
              />
              <CustomLabel color={colors.primary}>{item?.name}</CustomLabel>
            </View>
            <Icon color={colors.primary} name="chevron-right" />
          </Pressable>
        );
      })}
      <View style={{ height: 120 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    gap: 20,
  },
});

export default XmenuButtons;
