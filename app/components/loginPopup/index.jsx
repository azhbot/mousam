// components/LoginPopup.js
import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import CustomButton from "../button";
import CustomLabel from "../label";
import Icon from "../icon";

const LoginPopup = ({ visible, onClose, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close-circle" size={28} color="#666" />
          </TouchableOpacity>

          <CustomLabel style={styles.modalTitle}>
            Authentication Required
          </CustomLabel>
          <CustomLabel style={styles.modalText}>
            {message || "Your session has expired. Please log in again."}
          </CustomLabel>

          {/* Confirm Button */}
          <CustomButton
            title="Go to Login"
            onPress={() => {}} // for now nothing
            backgroundColor="green"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%", // Make it take up more width for better appearance
    maxWidth: 400, // Max width for larger screens
    position: "relative", // Needed for absolute positioning of the close button
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5, // Add padding for easier tapping
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
});

export default LoginPopup;
