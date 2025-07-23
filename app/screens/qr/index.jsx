import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import CustomLabel from "../../components/label";

const QrScreen = ({ route }) => {
  const id = "1636737";
  //route?.params?.id;

  return (
    <View style={styles.container}>
      {id && <QRCode value={id} size={200} />}
      <CustomLabel>Scan now</CustomLabel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default QrScreen;
