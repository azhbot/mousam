import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import XregistrationPasswordHeader from "./components/xregistrationPasswordHeader";
import XregistrationPasswordDone from "./components/xregistrationPasswordDone";
import FormikWrapper from "../../components/formik";
import { xregistrationPasswordSchema } from "../../validation/xregistrationSchema";
import FormikInputField from "../../components/formikInput";
import FormikSubmitButton from "../../components/formikSubmitButton";
import { showToast } from "../../components/toast";
import XregistrationPasswordSteps from "./components/xregistrationSteps";
import Icon from "../../components/icon";
import { useState } from "react";

const XregistrationPasswordScreen = () => {
  const navigation = useNavigation();

  const [passwordShow, setPasswordShow] = useState({
    first: true,
    second: true,
  });

  const handleContinuePress = (v) => {
    if (v.password !== v.passwordRequired) {
      showToast(
        "error",
        "Confirm Password",
        "You need to confirm the password"
      );
    } else {
      navigation.navigate("xregistrationFinal");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <XregistrationPasswordHeader />
        <XregistrationPasswordSteps />
        <FormikWrapper
          onSubmit={handleContinuePress}
          initialValues={{ password: "", passwordRequired: "" }}
          validationSchema={xregistrationPasswordSchema}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.inputs}>
              {/* Password Field */}
              <View style={{ position: "relative" }}>
                <FormikInputField
                  name="password"
                  placeholder="Create Strong Password"
                  secureTextEntry={passwordShow.first}
                />

                <Pressable
                  onPress={() =>
                    setPasswordShow((prev) => ({
                      ...prev,
                      first: !prev.first,
                    }))
                  }
                  style={styles.iconButton}
                >
                  <Icon
                    name={passwordShow.first ? "eye-off" : "eye"}
                    library="materialCommunityIcons"
                    size={22}
                    color="gray"
                  />
                </Pressable>
              </View>

              {/* Confirm Password Field */}
              <View style={{ position: "relative", marginTop: 20 }}>
                <FormikInputField
                  name="passwordRequired"
                  placeholder="Confirm Your Password"
                  secureTextEntry={passwordShow.second}
                />
                <Pressable
                  onPress={() =>
                    setPasswordShow((prev) => ({
                      ...prev,
                      second: !prev.second,
                    }))
                  }
                  style={styles.iconButton}
                >
                  <Icon
                    name={passwordShow.second ? "eye-off" : "eye"}
                    library="materialCommunityIcons"
                    size={22}
                    color="gray"
                  />
                </Pressable>
              </View>
            </View>

            <XregistrationPasswordDone />
          </ScrollView>

          <View style={{ paddingHorizontal: 15 }}>
            <Button
              title="pressme"
              onPress={() => navigation.navigate("xregistrationFinal")}
            />
            <FormikSubmitButton title="Continue" />
          </View>
        </FormikWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputs: {
    padding: 15,
  },
  iconButton: {
    position: "absolute",
    right: 0,
    top: -10,
    padding: 20,
    // backgroundColor: "red",
    zIndex: 10,
  },
});

export default XregistrationPasswordScreen;
