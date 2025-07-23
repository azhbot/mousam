import { View, StyleSheet, FlatList } from "react-native";
import AccountHeader from "./components/accountHeader";
import AccountPersonal from "./components/accountPersonal";
import AccountRecentViewItemCards from "./components/accountRecentViewItemCards";
import AccountOption from "./components/accountOption";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import ConfirmationMsg from "../../components/confirmation";
import React, { useState } from "react";
import Scanner from "../../components/scanner";

const options = [
  {
    label: "Apply for Account Verification",
    icon: "account-check",
    library: "materialCommunityIcons",
    navigator: "verifyAccount",
  },
  { label: "Scanner", icon: "qrcode-scan" },
  {
    label: "My Order Summary",
    icon: "clipboard-text",
    library: "materialCommunityIcons",
    navigator: "orderSummary",
  },

  {
    label: "Sample Test Summary",
    icon: "flask",
    library: "materialCommunityIcons",
    navigator: "sampleTestSummary",
  },
  {
    label: "Order InVoice",
    navigator: "orderInvoice",
    icon: "cloud-print-outline",
  },
  {
    label: "Sample InVoice",
    navigator: "sampleInvoice",
    icon: "cloud-print",
  },
  {
    label: "Favourite List",
    icon: "heart",
    library: "feather",
    navigator: "favourite",
  },
  {
    label: "My Cart",
    icon: "shopping-cart",
    library: "feather",
    navigator: "cart",
  },
  {
    label: "Address (Shipping Address)",
    icon: "map-marker",
    library: "materialCommunityIcons",
    navigator: "shipingAddressChange",
  },

  {
    label: "Share Products",
    icon: "share-variant",
    library: "materialCommunityIcons",
    navigator: "favourite",
    tag: "shared",
  },
  {
    label: "Number of Unit Machines",
    icon: "cog",
    library: "materialCommunityIcons",
    navigator: "machineNumber",
  },
  {
    label: "History",
    icon: "history",
    library: "materialIcons",
    navigator: "history",
  },

  { label: "Help & Feedback", icon: "help-circle", library: "feather" },
  { label: "Notification", icon: "bell", library: "feather" },
  {
    label: "Legal & Policies",
    icon: "file-document",
    library: "materialCommunityIcons",
  },
  { label: "Logout", icon: "logout", library: "materialCommunityIcons" },
];

const AccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showScanner, setShowScanner] = useState(false);
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] =
    useState(false);

  // Navigate to profile page when personal section is pressed
  const handlePersonalPress = () => {
    navigation.navigate("profile");
  };

  // Handle option press (navigation or logout confirmation)
  const handleOptionPress = (option) => {
    const tag = option?.tag;

    if (option.label === "Scanner") {
      setShowScanner(true);
    }

    if (option.label === "Logout") {
      setLogoutConfirmationVisible(true);
      return; // Stop further navigation
    }
    if (option.navigator) {
      navigation.navigate(option.navigator, { tag });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AccountHeader />
      <FlatList
        data={options}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <AccountPersonal handlePersonalPress={handlePersonalPress} />
        }
        renderItem={({ item, index }) => (
          <React.Fragment key={index}>
            <AccountOption
              item={item}
              index={index}
              handleOptionPress={handleOptionPress}
            />
            {/* Insert recent viewed products only after the second option */}
            {index === 2 && <AccountRecentViewItemCards />}
          </React.Fragment>
        )}
      />
      <Scanner
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={() => {}}
      />
      <ConfirmationMsg
        visible={logoutConfirmationVisible}
        onConfirm={() => dispatch(clearUser())}
        onclose={() => setLogoutConfirmationVisible(false)}
        msg="Do you really want to logout?"
        title="Logout"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountScreen;
