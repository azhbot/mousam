import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import CustomLabel from "../../components/label";
import CustomButton from "../../components/button";
import { colors } from "../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormikInputField from "../../components/formikInput";
import FormikWrapper from "../../components/formik";
import Icon from "../../components/icon";
import FormikSubmitButton from "../../components/formikSubmitButton";
import { useState } from "react";
import { xregistrationPasswordSchema } from "../../validation/xregistrationSchema";
import XregistrationPasswordDone from "../xregistrationPassword/components/xregistrationPasswordDone";

const { width } = Dimensions.get("window");

const XhomeCreateScreen = () => {
  const navigation = useNavigation();

  const handleContinuePress = (v) => {
    navigation.navigate("xpassPINCreate");
    // if (v.password !== v.passwordRequired) {
    //   showToast(
    //     "error",
    //     "Confirm Password",
    //     "You need to confirm the password"
    //   );
    // } else {

    // }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#000" }]}>
      <View style={{ alignSelf: "center", gap: 20 }}>
        <CustomLabel color="#fff" fontFamily="interBold" fontSize={16}>
          Make Your Product Awesome
        </CustomLabel>
        <CustomButton
          onPress={() => navigation.navigate("xregistration")}
          title="Let's Go"
          backgroundColor={colors.tertiary}
          width={width * 0.5}
          height={40}
          borderRadius={100}
          fontFamily="interBold"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    backgroundColor: "#000",
    gap: 20,
  },
  inputs: {
    padding: 15,
    paddingTop: 200,
  },
  iconButton: {
    position: "absolute",
    right: 0,
    top: -10,
    padding: 20,
    zIndex: 10,
  },
});

export default XhomeCreateScreen;
