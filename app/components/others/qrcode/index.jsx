import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const Qrcode = ({ id = "12345", size = 100 }) => {
  return (
    <View style={styles.container}>
      {id && <QRCode value={id} size={size} />}

      {/* <Barcode value="123456789" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Qrcode;
