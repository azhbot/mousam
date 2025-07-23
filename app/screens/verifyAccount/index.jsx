import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import CustomLabel from "../../components/label";
import { colors } from "../../constant/colors";
import Icon from "../../components/icon";
import VerifyAccountHeader from "./components/verifyAccountHeader";
import FormikWrapper from "../../components/formik";
import FormikInputField from "../../components/formikInput";
import verificationSchema from "../../validation/verificationSchema";
import FormikSubmitButton from "../../components/formikSubmitButton";
import Camera from "../../components/camera";
import CustomImage from "../../components/image";
import { selectUser } from "../../redux/user/userSelector";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const VerifyAccountScreen = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [dpUri, setDpUri] = useState(null);

  const user = useSelector(selectUser);

  const currentUserSpecificValues = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
  };

  const handleImageSelect = (imageUri) => {
    setDpUri(imageUri);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexContainer}
      >
        <FormikWrapper
          initialValues={{
            ...currentUserSpecificValues,
            pancard: "",
            pin: "",
            gender: "",
            numberOfMachine: "",
            address: "",
            state: "",
            dist: "",
          }}
          onSubmit={() => navigation.navigate("done")}
          validationSchema={verificationSchema}
        >
          <View style={styles.flexContainer}>
            <VerifyAccountHeader />
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.container}>
                <CustomLabel fontFamily="interMedium">My Profile</CustomLabel>
                <View style={styles.photoUploadContainer}>
                  {dpUri && (
                    <CustomImage
                      source={{ uri: dpUri }}
                      size={100}
                      borderRadius={100}
                      resizeMode="cover"
                    />
                  )}
                  <Pressable
                    onPress={() => setVisible(true)}
                    style={styles.photoUploadPosition}
                  >
                    <View style={styles.photoUpload}>
                      <Icon name="camera" size={height * 0.04} />
                    </View>
                    <CustomLabel>Add Photo</CustomLabel>
                  </Pressable>
                </View>

                <View style={styles.inputs}>
                  <FormikInputField
                    name="name"
                    placeholder="Full Name"
                    editable={false}
                  />
                  <FormikInputField
                    name="phone"
                    placeholder="Phone"
                    editable={false}
                  />
                  <FormikInputField
                    name="email"
                    placeholder="Email Id"
                    autoCapitalize="none"
                    editable={false}
                  />
                  <FormikInputField
                    name="pancard"
                    placeholder="PAN Card Number"
                  />
                  <FormikInputField
                    name="businessLicense"
                    placeholder="Business License No."
                  />

                  <View style={styles.rowCenter}>
                    <View style={styles.flexInputContainer}>
                      <FormikInputField name="pin" placeholder="PIN Code" />
                    </View>
                    <View style={styles.flexInputContainer}>
                      <FormikInputField name="gender" placeholder="Gender" />
                    </View>
                  </View>
                  <FormikInputField
                    name="numberOfMachine"
                    placeholder="No. of Machines"
                  />
                  <FormikInputField name="address" placeholder="Address" />
                  <View style={styles.rowCenter}>
                    <View style={styles.flexInputContainer}>
                      <FormikInputField name="state" placeholder="State" />
                    </View>
                    <View style={styles.flexInputContainer}>
                      <FormikInputField name="dist" placeholder="District" />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={{ marginHorizontal: 15 }}>
              <FormikSubmitButton title="Save Changes" marginHorizontal={15} />
            </View>
          </View>
        </FormikWrapper>
      </KeyboardAvoidingView>
      <Camera
        visible={visible}
        onClose={() => setVisible(false)}
        onImageSelect={handleImageSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  photoUploadContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 100,

    alignSelf: "center",
    borderRadius: 100,

    width: "100%",
  },
  photoUploadPosition: {
    position: "absolute",
    alignItems: "center",
  },
  photoUpload: {
    height: height * 0.08,
    width: height * 0.08,
    backgroundColor: colors.veryLightGray,
    borderRadius: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    marginTop: 40,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  flexInputContainer: {
    flex: 1, // Ensures input fields don't shrink
  },
});

export default VerifyAccountScreen;
