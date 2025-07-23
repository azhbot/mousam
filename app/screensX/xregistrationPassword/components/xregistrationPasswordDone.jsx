import { View, StyleSheet, Dimensions } from "react-native";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useFormikContext } from "formik";
import { useEffect } from "react";

const XregistrationPasswordDone = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log(values, "in xregistrationpasswordDene");
  }, [values]);

  if (values.password && values.password === values.passwordRequired) {
    return (
      <View style={styles.container}>
        <Icon
          name="checkcircle"
          library="antDesign"
          color={colors.tertiary}
          size={50}
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default XregistrationPasswordDone;
