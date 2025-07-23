import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomLabel from "../../components/label";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelector";
import { showMessage } from "../../utils/customMsgUtil";

const PADDING_TOP = Dimensions.get("screen").height * 0.45;
const PIN_PADDING_TOP = Dimensions.get("screen").height * 0.3;
const PAD_PADDING_TOP = Dimensions.get("screen").height * 0.2;

const XpassPINScreen = ({ route }) => {
  const navigation = useNavigation();
  const nextScreen = route?.params?.nextScreen;

  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pin, setPin] = useState("");
  const [inputBlocked, setInputBlocked] = useState(false); // ✅ Block input briefly after wrong PIN

  const PIN = useSelector(selectUser).userPIN;
  const user = useSelector(selectUser);

  useFocusEffect(
    useCallback(() => {
      setPin("");
      setInputBlocked(false); // ✅ Reset input block on screen focus

      const initAuth = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();

        if (compatible && enrolled) {
          await handleBiometricAuth();
        } else {
          fallbackToPin();
        }
      };
      initAuth();
    }, [])
  );

  useEffect(() => {
    console.log(nextScreen, "in xpassPIN");
  }, [nextScreen]);

  const fallbackToPin = () => setShowPinEntry(true);

  const handleNavigation = () => {
    navigation.navigate(nextScreen ? nextScreen : "xhome");
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirm your fingerprint",
        fallbackLabel: "Use PIN",
        disableDeviceFallback: true,
        cancelLabel: "Use PIN",
      });

      result.success ? handleNavigation() : fallbackToPin();
    } catch (error) {
      console.log("Biometric error:", error);
    }
  };

  const handlePinPress = (digit) => {
    if (inputBlocked || pin.length >= 4) return;

    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      handlePinSubmit(newPin);
    }
  };

  const handlePinSubmit = (enteredPin) => {
    if (enteredPin === PIN) {
      handleNavigation();
    } else {
      showMessage("Incorrect PIN. Try again");
      setInputBlocked(true); // ✅ block further input
      setTimeout(() => {
        setPin("");
        setInputBlocked(false); // ✅ unblock input after delay
      }, 500);
    }
  };

  const handleDelete = () => {
    if (inputBlocked || pin.length === 0) return;
    setPin(pin.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <CustomLabel fontSize={22}>
        {nextScreen ? "Confirm Old PIN" : "Secure Access"}
      </CustomLabel>

      {showPinEntry && (
        <>
          {/* Display PIN as dots */}
          <View style={styles.pinContainer}>
            {[0, 1, 2, 3].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.pinDot,
                  { backgroundColor: pin.length > index ? "#000" : "#ccc" },
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
            <CustomLabel>Use Fingerprint</CustomLabel>
          </TouchableOpacity>

          {/* Number pad */}
          <View style={styles.pad}>
            {[
              ["1", "2", "3"],
              ["4", "5", "6"],
              ["7", "8", "9"],
              ["@", "0", "del"],
            ].map((row, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {row.map((key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.key}
                    onPress={() => {
                      if (key === "del") handleDelete();
                      else handlePinPress(key);
                    }}
                    disabled={inputBlocked} // ✅ disable key presses when blocked
                  >
                    <Text style={styles.keyText}>{key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: PIN_PADDING_TOP,
  },
  pinContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: PAD_PADDING_TOP,
    paddingBottom: 20,
  },
  buttonText: {
    color: "#808080",
    fontWeight: "600",
  },
  pinDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  pad: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    marginBottom: 10,
  },
  key: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 10,
    width: 80,
    alignItems: "center",
  },
  keyText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default XpassPINScreen;
