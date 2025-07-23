import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import FormikInputField from "../../../components/formikInput";

const XregistrationInputs = ({ handleSubmitPress }) => {
  return (
    <View style={styles.container}>
      <CustomLabel>Basic Details</CustomLabel>

      <FormikInputField name="name" placeholder="Full Name" />
      <FormikInputField name="businessName" placeholder="Business Name" />
      <FormikInputField
        name="businessLicense"
        placeholder="Business License No."
      />
      <FormikInputField name="pancard" placeholder="Pan No" />
      <FormikInputField name="email" placeholder="Business Email Id" />
      <FormikInputField name="phone" placeholder="Phone No" />
      <View style={styles.rowCenter}>
        <View style={{ flex: 0.6 }}>
          <FormikInputField name="otp" placeholder="OTP" />
        </View>
        <View style={{ flex: 0.4 }}>
          <CustomButton
            height={40}
            title="Send OTP"
            backgroundColor={colors.tertiary}
            onPress={handleSubmitPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 10,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default XregistrationInputs;
