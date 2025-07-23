import { View, StyleSheet, Pressable, Button } from "react-native";
import { useState, useRef, useEffect } from "react";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import CustomLabel from "../../../components/label";
import CustomInput from "../../../components/input";
import { colors } from "../../../constant/colors";
import Icon from "../../../components/icon";
import FormikListInput from "../../../components/formikListInput";

const XaddProductAddtionalInputs = ({
  additionalDetails: additionalDetails_,
}) => {
  const [additionalDetails, setAdditionalDetails] = useState([
    { id: nanoid(), name: "", nameValue: "" },
  ]);

  // Refs to focus on newly added input
  const inputRefs = useRef([]);

  useEffect(() => {
    if (additionalDetails_) {
      setAdditionalDetails(additionalDetails_);
    }
  }, [additionalDetails_]);

  useEffect(() => {
    console.log(additionalDetails, "in xaddproductaddtionalinput");
  }, [additionalDetails]);

  const handleCrossPress = (item) => {
    setAdditionalDetails((prevInputs) =>
      prevInputs.filter((input) => input.id !== item.id)
    );
  };

  const handleInputChange = (text, id, field) => {
    setAdditionalDetails((prevDetails) =>
      prevDetails.map((details) =>
        details.id === id ? { ...details, [field]: text } : details
      )
    );
  };

  const handleAddNew = () => {
    const newItem = { id: nanoid(), name: "", nameValue: "" };
    setAdditionalDetails((prev) => [...prev, newItem]);

    setTimeout(() => {
      const index = additionalDetails.length;
      inputRefs.current[index]?.focus();
    }, 100);
  };

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <CustomLabel fontSize={16}>Additional Product Details</CustomLabel>

      <View style={styles.container}>
        {additionalDetails?.map((details, index) => (
          <View key={details.id}>
            {index > 0 && (
              <Pressable
                onPress={() => handleCrossPress(details)}
                style={styles.crossIcon}
              >
                <Icon name="cross" library="entypo" />
              </Pressable>
            )}

            <View style={styles.rowCenter}>
              <View style={{ width: 150 }}>
                <CustomInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  placeholder={`${index + 1}. Title`}
                  value={details.name}
                  handleInputChange={(text) =>
                    handleInputChange(text, details.id, "name")
                  }
                />
              </View>
              <View>
                <CustomInput
                  placeholder="Details"
                  value={details.nameValue}
                  handleInputChange={(text) =>
                    handleInputChange(text, details.id, "nameValue")
                  }
                  multiline={true}
                />
              </View>
            </View>
          </View>
        ))}

        <FormikListInput
          name="addtionalDetails"
          additionalDetails={additionalDetails}
        />
      </View>
      <Pressable onPress={handleAddNew} style={styles.addButton}>
        <Icon color="#fff" name="plus" library="materialIcon" />
        <CustomLabel color="#fff" fontSize={16}>
          Add
        </CustomLabel>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  rowCenter: {
    gap: 2,
  },
  crossIcon: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 40,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default XaddProductAddtionalInputs;
