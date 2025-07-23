import { View, StyleSheet } from "react-native";

import FormikInputField from "../../../components/formikInput";
import FormikDropdownInput from "../../../components/formikDropdownInput";
import { genderDropdownList } from "../../../constant/dropdownList";

const XaddProductInputs = ({ handleSubmitPress }) => {
  return (
    <View style={styles.container}>
      <FormikInputField name="name" placeholder="Product Name" />
      <FormikInputField
        name="cost"
        placeholder="Making price per pcs"
        keyboardType="numeric"
      />

      <View style={styles.rowCenter}>
        <View style={{ flex: 1 }}>
          <FormikDropdownInput
            placeholder="Gender"
            name="gender"
            dropdownList={genderDropdownList}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FormikDropdownInput name="type" placeholder="Type" />
        </View>
      </View>

      <View style={styles.rowCenter}>
        <View style={{ flex: 1 }}>
          <FormikDropdownInput
            name="category"
            placeholder="Category"
            dropdownList={[
              "one",
              "two",
              "three",
              "four",
              "five",
              "six",
              "seven",
            ]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FormikDropdownInput
            name="subCategory"
            placeholder="Sub-category"
            dropdownList={[
              "one",
              "two",
              "three",
              "four",
              "five",
              "six",
              "seven",
            ]}
          />
        </View>
      </View>
      <FormikDropdownInput
        name="size"
        placeholder="Size"
        multipleOptions={true}
        dropdownList={["M", "X", "XL", "XXL", "five", "six", "seven"]}
      />
      <FormikInputField name="variant" placeholder="Variant" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default XaddProductInputs;
