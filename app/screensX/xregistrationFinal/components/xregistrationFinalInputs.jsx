import { View, StyleSheet, Pressable } from "react-native";
import CustomInput from "../../../components/input";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { useState } from "react";
import FormikInputField from "../../../components/formikInput";
import FormikSelectionInput from "../../../components/formikSelectionInput";

const XregistrationFinalInputs = ({ handleSubmitPress }) => {
  const [addresses, setAddresses] = useState([]); // Initialize with empty array
  const [selectedAddress, setSelectedAddress] = useState(null); // Track the selected address

  // Function to add a new address
  const addNewAddress = () => {
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      { id: prevAddresses.length, value: "" }, // Add a new address with an empty value
    ]);
  };

  // Function to handle address input changes
  const handleAddressChange = (index, newValue) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[index].value = newValue;
      return updatedAddresses;
    });
  };

  return (
    <View style={styles.container}>
      <FormikInputField name="description" placeholder="Business Description" />
      <CustomLabel style={{ paddingLeft: 5 }}>Business Address</CustomLabel>
      <FormikInputField name="pin" placeholder="Pin Code " />
      <FormikInputField name="landmark" placeholder="Landmark or Street Name" />
      <FormikInputField name="villageOrTown" placeholder="Village or Town" />
      <FormikInputField name="postOffice" placeholder="Post Office" />
      <FormikInputField name="policeStation" placeholder="Police Station" />
      <FormikInputField name="SubDivision" placeholder="Sub Division" />
      <FormikInputField name="dist" placeholder="District" />
      <FormikInputField name="state" placeholder="State" />
      <FormikInputField name="country" placeholder="Nation" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,

    gap: 10,
  },
  AddButtonContainer: {},
  addressSelect: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 15,
    gap: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 15,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 40,
  },
});

export default XregistrationFinalInputs;
