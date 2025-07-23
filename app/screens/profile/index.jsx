import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";

import ProfileHeader from "./components/profileHeader";
import CustomLabel from "../../components/label";
import { colors } from "../../constant/colors";
import Icon from "../../components/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import FormikWrapper from "../../components/formik";
import profileSchema from "../../validation/profileSchema";
import FormikInputField from "../../components/formikInput";
import FormikSubmitButton from "../../components/formikSubmitButton";
import Camera from "../../components/camera";
import { useEffect, useState } from "react";
import CustomImage from "../../components/image";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelector";
import { setUser } from "../../redux/user/userSlice";
import ImagePreview from "../../components/imagePreview";
import FormikSelectionInput from "../../components/formikSelectionInput";
import { showMessage } from "../../utils/customMsgUtil";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [dpUri, setDpUri] = useState(null);

  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(user, "in profile");
  }, [user]);

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    numberOfMachine: user?.numberOfMachine || "",
    imageUrl: user?.dp || null,
  };

  const handleImageSelect = (imageUri) => {
    setDpUri(imageUri);
  };

  const handleSubmit = (values) => {
    dispatch(setUser({ ...user, ...values, dp: dpUri || values.imageUrl }));
    Keyboard.dismiss();
    // showMessage("Profile Updated");
    navigation.navigate("done");
  };

  const imageToShow = dpUri || user?.dp;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormikWrapper
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={profileSchema}
          enableReinitialize // important to reflect updated values
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <ProfileHeader />
            <View style={styles.content}>
              <CustomLabel fontFamily="interMedium">My Profile</CustomLabel>

              <View style={styles.avatarSection}>
                {imageToShow ? (
                  <Pressable onPress={() => setPreviewVisible(true)}>
                    <CustomImage
                      source={{ uri: imageToShow }}
                      size={100}
                      borderRadius={100}
                      resizeMode="cover"
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => setCameraVisible(true)}
                    style={styles.placeholderWrapper}
                  >
                    <View style={styles.placeholderCircle}>
                      <Icon name="camera" size={height * 0.04} />
                    </View>
                    <CustomLabel>Add Photo</CustomLabel>
                  </Pressable>
                )}

                {imageToShow && (
                  <Pressable
                    onPress={() => setCameraVisible(true)}
                    style={styles.cameraIconWrapper}
                  >
                    <View style={styles.smallCameraIcon}>
                      <Icon name="camera" size={height * 0.02} />
                    </View>
                  </Pressable>
                )}

                <ImagePreview
                  visible={previewVisible}
                  uri={imageToShow}
                  onClose={() => setPreviewVisible(false)}
                />
              </View>

              <FormikSelectionInput name="imageUrl" selectionValue={dpUri} />

              <View style={styles.inputGroup}>
                <FormikInputField name="name" placeholder="Name" />
                <FormikInputField
                  name="email"
                  placeholder="Email"
                  autoCapitalize="none"
                />

                <View style={styles.row}>
                  <View style={styles.halfWidth}>
                    <FormikInputField name="phone" placeholder="Phone" />
                  </View>
                  <View style={styles.halfWidth}>
                    <FormikInputField
                      name="numberOfMachine"
                      placeholder="No. of Machines"
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <FormikSubmitButton title="Save Changes" />
        </FormikWrapper>
      </KeyboardAvoidingView>

      <Camera
        visible={cameraVisible}
        onImageSelect={handleImageSelect}
        onClose={() => setCameraVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  content: { flex: 1, padding: 15 },
  avatarSection: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "relative",
  },
  placeholderWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderCircle: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: height * 0.1,
    backgroundColor: colors.veryLightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconWrapper: {
    position: "absolute",
    bottom: -height * 0.005,
    right: -height * 0.005,
  },
  smallCameraIcon: {
    height: height * 0.04,
    width: height * 0.04,
    borderRadius: height * 0.1,
    backgroundColor: colors.veryLightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: {
    marginTop: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
});

export default ProfileScreen;
