import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import XregistrationFinalHeader from "./components/xregistrationFinalHeader";
import XregistrationFinalSteps from "./components/xregistrationFinalSteps";
import XregistrationFinalDp from "./components/xregistrationFinalDp";
import XregistrationFinalInputs from "./components/xregistrationFinalInputs";
import XregistrationFinalRegisterButton from "./components/xregistrationFinalRegisterButton";
import XregistrationFinalMsg from "./components/xregistrationFinalMsg";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormikWrapper from "../../components/formik";
import { xregistrationFinalSchema } from "../../validation/xregistrationSchema";
import FormikSubmitButton from "../../components/formikSubmitButton";

const XregistrationFinalScreen = () => {
  const navigation = useNavigation();
  const handleContinuePress = () => {
    console.log("hollo");
    navigation.navigate("xhome");
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormikWrapper
          initialValues={{
            description: "",
            pin: "",
            landmark: "",
            address: "",

            villageOrTown: "",
            postOffice: "",
            policeStation: "",
            subDivision: "",
            dist: "",
            state: "",
            country: "",
            subDivision: "",
          }}
          onSubmit={() => console.log("submit")}
          validationSchema={xregistrationFinalSchema}
        >
          <XregistrationFinalHeader />
          <ScrollView>
            <XregistrationFinalSteps />
            <XregistrationFinalDp />
            <XregistrationFinalInputs />
            <XregistrationFinalMsg />
          </ScrollView>
          <Button
            title="tempo btn"
            onPress={() => navigation.navigate("waiting")}
          />
          <View style={{ paddingHorizontal: 15 }}>
            <FormikSubmitButton title="Let's go" />
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
});

export default XregistrationFinalScreen;
