import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const width = Dimensions.get("screen").width;

// Mock Icon component - in a real Expo app, you'd use @expo/vector-icons
const Icon = ({ name, size, color }) => (
  <Text style={{ fontSize: size, color: color }}>
    {name === "close-circle"
      ? "ⓧ"
      : name === "flip-camera-android"
      ? "🔄"
      : name === "circle"
      ? "◎"
      : name === "insert-photo"
      ? "🖼️"
      : name}
  </Text>
);

const Scanner = ({
  visible = false,
  onClose = () => {},
  onScan = () => {},
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(`Type: ${type}\nData: ${data}`);
      onScan({ type, data });
      console.log("scanned");
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedData("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      {!permission ? (
        <View style={styles.container} />
      ) : !permission.granted ? (
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to access the camera for scanning.
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      ) : (
        <View style={styles.container}>
          <CameraView
            style={[
              styles.camera,
              {
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: [
                "qr",
                "ean13",
                "ean8",
                "upc_a",
                "upc_e",
                "code39",
                "code93",
                "code128",
                "pdf417",
                "aztec",
                "interleaved2of5",
                "itf14",
              ],
            }}
          >
            {!scanned && (
              <View
                style={{
                  height: 300,
                  width: 300,
                  borderWidth: 3,
                  // borderStyle: "dashed",
                  borderRadius: 8,
                  borderColor: "#eaeaea",
                }}
              />
            )}
            {scanned && (
              <View style={styles.scannedMessageContainer}>
                <Text style={styles.scannedMessage}>{scannedData}</Text>
                <Button title="Scan Again" onPress={resetScanner} />
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Icon name="close-circle" size={32} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </CameraView>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
  camera: {
    flex: 1,
  },
  scannedMessageContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  scannedMessage: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#00000080",
    borderRadius: 20,
    padding: 5,
  },
});

export default Scanner;
