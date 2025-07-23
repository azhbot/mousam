import { View, StyleSheet } from "react-native";
import { colors } from "../../constant/colors";
import CustomButton from "../button";
import { useFormikContext } from "formik";

const FormikSubmitButton = ({ title }) => {
  const { handleSubmit, submitForm, values, resetForm, dirty } =
    useFormikContext();
  return (
    <CustomButton
      backgroundColor={colors.primary}
      borderRadius={100}
      style={styles.saveButton}
      title={title}
      onPress={() => {
        console.log(values, "in formikSubmitButton");
        submitForm(values);
        // resetForm();
      }}
      height={40}
      // disabled={!dirty}
    />
  );
};

const styles = StyleSheet.create({
  saveButton: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default FormikSubmitButton;
