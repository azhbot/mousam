import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import XregistrationHeader from "./components/xregistrationHeader";
import XregistrationInputs from "./components/xregistrationInputs";
import XregistrationSteps from "./components/xregistrationSteps";
import XregistrationLinks from "./components/xregistrationLinks";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormikWrapper from "../../components/formik";
import { xregistrationSchema } from "../../validation/xregistrationSchema";
import FormikSubmitButton from "../../components/formikSubmitButton";

const XregistrationScreen = () => {
  const navigation = useNavigation();
  const handleContinuePress = () => {
    navigation.navigate("xregistrationPassword");
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormikWrapper
          onSubmit={(values) => console.log(values)}
          initialValues={{
            name: "",
            businessName: "",
            businessLicense: "",
            email: "",
            pancard: "",
            phone: "",
            pin: "",
          }}
          validationSchema={xregistrationSchema}
        >
          <View style={{ flex: 1 }}>
            <XregistrationHeader />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <XregistrationSteps />
              <XregistrationInputs />
              <XregistrationLinks />
            </ScrollView>
          </View>
          <Button title="tempo btn" onPress={handleContinuePress} />
          <View style={{ paddingHorizontal: 15 }}>
            <FormikSubmitButton title="Register & Continue" />
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
  buttonContainer: {
    paddingBottom: 20, // Some padding to prevent it from touching screen edges
  },
});

export default XregistrationScreen;
