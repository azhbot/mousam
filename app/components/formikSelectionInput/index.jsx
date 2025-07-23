import { useFormikContext } from "formik";
import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const FormikSelectionInput = ({ name = "name", selectionValue }) => {
  const { errors, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (selectionValue) {
      // Prevent setting empty/undefined values
      setFieldValue(name, selectionValue);
    }
  }, [selectionValue, name, setFieldValue]);

  return (
    <View>
      {errors[name] && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
  },
});

export default FormikSelectionInput;
