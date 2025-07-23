import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../../components/icon";
import { useState } from "react";
import Scanner from "../../../components/scanner";

const { width } = Dimensions.get("window");

const XhomeAddNewButton = () => {
  const navigation = useNavigation();

  const [showScanner, setShowScanner] = useState(false);
  return (
    <View style={styles.container}>
      <CustomButton
        borderRadius={8}
        fontFamily="poppinsMedium"
        fontSize={16}
        title="Add New Product"
        width={width * 0.5}
        height={38}
        backgroundColor={colors.tertiary}
        onPress={() => navigation.navigate("xaddProduct")}
      />
      <Pressable
        onPress={() => setShowScanner(true)}
        style={styles.scannerIcon}
      >
        <Icon name={"qrcode-scan"} color={"#fff"} />
      </Pressable>
      <Scanner
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    gap: 20,
    // alignItems: "center",
  },
  scannerIcon: {
    height: 38,
    width: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.tertiary,
    backgroundColor: colors.tertiary,
  },
});

export default XhomeAddNewButton;
