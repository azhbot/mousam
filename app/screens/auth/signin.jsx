import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomLabel from "../../components/label";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";

import { colors } from "../../constant/colors";
import { setUser } from "../../redux/user/userSlice";
import FormikWrapper from "../../components/formik";
import FormikInputField from "../../components/formikInput";
import FormikSubmitButton from "../../components/formikSubmitButton";
import signupSchema from "../../validation/signupSchema";

const SigninScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const id = nanoid(5);
    const now = new Date();
    const createdAt = now.toISOString();
    dispatch(
      setUser({
        id,
        createdAt,
        ...values,
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
            initialValues={{
              name: "Azhar",
              email: "azhar@gmail.com",
              phone: "6296963083",
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={signupSchema}
          >
            <FormikInputField name="name" placeholder="Name" />
            <FormikInputField name="email" placeholder="Email" />
            <FormikInputField
              name="phone"
              placeholder="Phone"
              keyboardType={"numeric"}
            />
            <FormikSubmitButton title="Login" />
          </FormikWrapper>
        </View>
        <View style={styles.loginText}>
          <CustomLabel>Already have an account? </CustomLabel>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <CustomLabel color={colors.tertiary}>Signup</CustomLabel>
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

export default SigninScreen;
