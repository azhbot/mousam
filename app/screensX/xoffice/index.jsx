import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import XofficeHeader from "./components/xofficeHeader";
import XofficeDp from "./components/xofficeDp";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomLabel from "../../components/label";
import FormikWrapper from "../../components/formik";
import FormikInputField from "../../components/formikInput";
import xofficeSchema from "../../validation/xoffice";
import FormikSubmitButton from "../../components/formikSubmitButton";

const XofficeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <XofficeHeader /> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormikWrapper
          initialValues={{
            businessName: "",
            businessLicense: "",
            name: "",
            email: "",
            pancard: "",
            pin: "",
            phone: "",
            businessAddress: "",
            description: "",
            landmark: "",
            villageOrTown: "",
            postOffice: "",
            policeStation: "",
            subDivision: "",
            dist: "",
            state: "",
            country: "",
          }}
          validationSchema={xofficeSchema}
          onSubmit={(values) => console.log(values)}
        >
          <ScrollView>
            <XofficeDp />
            <View style={{ padding: 15, gap: 10 }}>
              <CustomLabel>Basic Details</CustomLabel>
              <FormikInputField name="name" placeholder="Full Name" />
              <FormikInputField
                name="businessName"
                placeholder="Business Name"
              />
              <FormikInputField
                name="businessLicense"
                placeholder="Business License"
              />
              <FormikInputField
                name="pancard"
                placeholder="PAN No."
                editable={false}
              />
              <FormikInputField
                name="email"
                placeholder="Business Email Id"
                autoCapitalize="none"
                textContentType="emailAddress"
                editable={false}
              />
              {/* <FormikInputField
                name="businessAddress"
                placeholder="Business Address"
              /> */}
              <FormikInputField
                name="phone"
                placeholder="Phone"
                editable={false}
              />
              <CustomLabel>Company Details</CustomLabel>
              <FormikInputField name="description" placeholder="Description" />
              <FormikInputField
                name="pin"
                placeholder="Pin Code"
                textContentType="password"
                secureTextEntry
              />
              <FormikInputField
                name="landmark"
                placeholder="Landmark or Street Name"
              />
              <FormikInputField
                name="villageOrTown"
                placeholder="Village or Town"
              />
              <FormikInputField name="postOffice" placeholder="Post Office" />
              <FormikInputField
                name="policeStation"
                placeholder="Police Station"
              />
              <FormikInputField name="subDivison" placeholder="Sub-Division" />
              <FormikInputField name="Dist" placeholder="District" />
              <FormikInputField name="state" placeholder="state" />
              <FormikInputField name="country" placeholder="Nation" />
            </View>
          </ScrollView>
          <View style={{ paddingHorizontal: 15 }}>
            <FormikSubmitButton title="Save Changes" />
          </View>
        </FormikWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  s;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default XofficeScreen;
