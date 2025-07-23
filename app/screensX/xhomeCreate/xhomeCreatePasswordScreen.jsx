import { View, StyleSheet, Button, Pressable, TextInput } from "react-native";
import FormikInputField from "../../components/formikInput";
import { xregistrationPasswordSchema } from "../../validation/xregistrationSchema";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "../../components/icon";
import XregistrationPasswordDone from "../xregistrationPassword/components/xregistrationPasswordDone";
import FormikWrapper from "../../components/formik";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input";
import { colors } from "../../constant/colors";

const XhomeCreatePasswordScreen = () => {
  const navigation = useNavigation();
  const [passwordShow, setPasswordShow] = useState(true);

  return (
    <View style={styles.container}>
      <FormikWrapper
        onSubmit={() => {}}
        initialValues={{ password: "" }}
        validationSchema={xregistrationPasswordSchema}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.inputs}>
            {/* Password Field */}
            <View style={{ position: "relative" }}>
              <CustomInput
                placeholder={"Type Password"}
                onSubmitEditing={() => navigation.navigate("xpassPINCreate")}
                secureTextEntry={passwordShow}
              />

              <Pressable
                onPress={() => setPasswordShow((prev) => !prev)}
                style={styles.iconButton}
              >
                <Icon
                  name={passwordShow ? "eye-off" : "eye"}
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
          {/* <FormikSubmitButton title="Continue" /> */}
          <CustomButton
            backgroundColor={colors.tertiary}
            title="Continue"
            style={{ bottom: 20 }}
            onPress={() => navigation.navigate("xpassPINCreate")}
          />
        </View>
      </FormikWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputs: {
    padding: 15,
    paddingTop: 300,
  },
  iconButton: {
    position: "absolute",
    right: 0,
    top: -10,
    padding: 20,
    zIndex: 10,
  },
});

export default XhomeCreatePasswordScreen;
