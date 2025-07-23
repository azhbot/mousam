import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useNavigation } from "@react-navigation/native";

import CustomLabel from "../../components/label";
import { colors } from "../../constant/colors";
import { setUser } from "../../redux/user/userSlice";
import FormikWrapper from "../../components/formik";
import profileSchema from "../../validation/profileSchema";
import FormikInputField from "../../components/formikInput";
import FormikSubmitButton from "../../components/formikSubmitButton";

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    const id = nanoid(5);
    const now = new Date();
    const createdAt = now.toISOString();
    dispatch(
      setUser({
        id,
        createdAt,
        ...fieldValues,
      })
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CustomLabel fontSize={20} fontFamily="interBold">
          MOUSAM
        </CustomLabel>
        <View style={styles.inputContainer}>
          <FormikWrapper
            initialValues={{ name: "", email: "", phone: "" }}
            onSubmit={() => console.log("submitted")}
            validationSchema={profileSchema}
          >
            <FormikInputField name="name" placeholder="Name" />
            <FormikInputField name="email" placeholder="Email" />
            <FormikInputField
              name="phone"
              placeholder="Phone"
              keyboardType={"numeric"}
            />
            <FormikSubmitButton title="Signup Now" />
          </FormikWrapper>
        </View>
        <View style={styles.loginText}>
          <CustomLabel>Already have an account? </CustomLabel>
          <TouchableOpacity onPress={() => navigation.navigate("signin")}>
            <CustomLabel color={colors.tertiary}>Login</CustomLabel>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  inputContainer: {
    width: "100%",
    paddingTop: 40,
    paddingBottom: 40,
  },
  loginText: {
    flexDirection: "row",
  },
});

export default SignupScreen;
