import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  BackHandler,
} from "react-native";
import CustomButton from "../../components/button";
import { colors } from "../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import CustomLabel from "../../components/label";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelector";
import { createUserPIN } from "../../redux/user/userSlice";

const PADDING_TOP = Dimensions.get("screen").height * 0.2;

const XpassPINCreateScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const PIN = useSelector(selectUser).userPIN;

  useEffect(() => {
    const backAction = () => {
      navigation.pop(2);
      return true; // prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleConfirmNewPin = () => {
    if (pin.length < 4) {
      setError("New PIN must be at least 4 digits.");
    } else if (pin !== confirmPin) {
      setError("New PINs do not match.");
    } else {
      setError("");
      dispatch(createUserPIN(pin));

      if (PIN) {
        // Pop 2 screens if editing an existing PIN
        navigation.pop(2);
        Alert.alert("Success", "PIN changed successfully!");
      } else {
        navigation.navigate("xhome");
        Alert.alert("Success", "PIN set successfully!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", paddingBottom: 60 }}>
        <CustomLabel fontSize={20}>Create PIN</CustomLabel>
      </View>

      <CustomLabel>Enter New PIN</CustomLabel>
      <TextInput
        style={styles.input}
        secureTextEntry
        keyboardType="number-pad"
        maxLength={4}
        value={pin}
        onChangeText={setPin}
      />

      <CustomLabel>Confirm New PIN</CustomLabel>
      <TextInput
        style={styles.input}
        secureTextEntry
        keyboardType="number-pad"
        maxLength={4}
        value={confirmPin}
        onChangeText={setConfirmPin}
        onSubmitEditing={handleConfirmNewPin}
      />

      <CustomButton
        title="Set PIN"
        onPress={handleConfirmNewPin}
        backgroundColor={colors.tertiary}
        width={200}
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: PADDING_TOP,
    alignItems: "center",
  },
  input: {
    width: 200,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 8,
    fontSize: 12,
  },
});

export default XpassPINCreateScreen;
