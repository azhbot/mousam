import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const FormikListInput = ({ name = "name", listValue, additionalDetails }) => {
  const { errors, setFieldValue, touched } = useFormikContext();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (listValue?.length > 0 && (active || listValue[0]?.name)) {
      setFieldValue(name, listValue);
      setActive(true);
    }
  }, [listValue, name, setFieldValue, errors]);

  useEffect(() => {
    if (additionalDetails) {
      setFieldValue(name, additionalDetails);
    }
  }, [additionalDetails]);

  return (
    <View>
      {touched[name] && errors[name] ? ( // Check if the field has been touched
        Array.isArray(errors[name]) && errors[name].length > 0 ? (
          <Text style={styles.errorText}>{errors[name][0]?.name}</Text>
        ) : (
          <Text style={styles.errorText}>{errors[name]}</Text>
        )
      ) : null}
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

export default FormikListInput;
