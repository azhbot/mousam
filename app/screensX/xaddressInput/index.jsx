import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import CustomButton from "../../components/button";
import CustomLabel from "../../components/label";
import { colors } from "../../constant/colors";
import Icon from "../../components/icon";
import FormikWrapper from "../../components/formik";
import FormikInputField from "../../components/formikInput";
import addressSchema from "../../validation/addressSchema";
import FormikSubmitButton from "../../components/formikSubmitButton";
import { addNewAddress, updateAddress } from "../../redux/address/addressSlice";
import { selectAddress } from "../../redux/address/addressSelector";
import { useNavigation } from "@react-navigation/native";
import { villageOrTown } from "../../validation/comonRules";
import XaddressInputHeader from "./components/xaddressHeader";

const { height } = Dimensions.get("window");

const XaddressInputScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addressList = useSelector(selectAddress).addresses;
  const id = route?.params?.id;

  // Get current address if editing
  const currentAddress = id ? addressList.find((item) => item.id === id) : null;

  // useEffect(() => {
  //   console.log(currentAddress, "in shippingAddressinput");
  //   if (id && !currentAddress) {
  //     console.warn("No matching address found for id:", id);
  //   }
  // }, [currentAddress]);

  const handlePinSubmit = () => {
    const uuid = uuidv4();
    dispatch(
      addNewAddress({
        id: uuid,
        name: "name",
        pin: "123456",
        phone: "1234567890",
      })
    );
    navigation.navigate("done");
  };

  const handleSavePress = (value) => {
    if (id) {
      dispatch(updateAddress({ id, ...value }));
      console.log(value, "in shippingAddress input");
    } else {
      const uuid = uuidv4();
      dispatch(addNewAddress({ id: uuid, ...value }));
    }
    navigation.navigate("done");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormikWrapper
          initialValues={{
            name: currentAddress?.name || "",
            phone: currentAddress?.phone || "",
            email: currentAddress?.email || "",
            villageOrTown: currentAddress?.villageOrTown || "",
            pin: currentAddress?.pin || "",
            landmark: currentAddress?.landmark || "",
            postOffice: currentAddress?.postOffice || "",
            policeStation: currentAddress?.policeStation || "",
            dist: currentAddress?.dist || "",
            state: currentAddress?.state || "",
            country: currentAddress?.country || "",
          }}
          onSubmit={(value) => handleSavePress(value)}
          validationSchema={addressSchema}
        >
          {/* <XaddressInputHeader /> */}
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <CustomLabel fontFamily="interMedium">
                  Shipping Address
                </CustomLabel>
                <Icon name="chevron-right" />
                <CustomLabel fontFamily="interMedium">Address</CustomLabel>
              </View>

              <View style={styles.inputs}>
                <FormikInputField name="name" placeholder="Full Name" />

                <View style={styles.rowCenter}>
                  <View style={{ flex: 0.6 }}>
                    <FormikInputField name="pin" placeholder="Pin Code" />
                  </View>
                  <View style={{ flex: 0.4 }}>
                    <CustomButton
                      height={42}
                      title="Submit"
                      backgroundColor={colors.tertiary}
                      onPress={handlePinSubmit}
                    />
                  </View>
                </View>

                <FormikInputField name="phone" placeholder="Phone No" />
                <FormikInputField
                  name="email"
                  placeholder="Email Id"
                  autoCapitalize="none"
                />
                <FormikInputField
                  name="villageOrTown"
                  placeholder="Village or Town"
                />
                <FormikInputField name="landmark" placeholder="Landmark" />
                <FormikInputField name="postOffice" placeholder="Post Office" />
                <FormikInputField
                  name="policeStation"
                  placeholder="Police Station"
                />
                <FormikInputField name="dist" placeholder="District" />
                <FormikInputField name="state" placeholder="State" />
                <FormikInputField name="country" placeholder="Country" />
              </View>
            </View>
          </ScrollView>
          <View style={{ marginHorizontal: 15 }}>
            <FormikSubmitButton title="Save Changes" />
          </View>
        </FormikWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoUploadContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photoUpload: {
    height: height * 0.08,
    width: height * 0.08,
    borderRadius: height * 0.1,
    backgroundColor: colors.veryLightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    marginTop: 40,
  },
  saveButton: {
    width: "100%",
    marginBottom: 40,
    alignSelf: "center",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default XaddressInputScreen;
