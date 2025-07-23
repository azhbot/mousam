import { View, StyleSheet, Pressable } from "react-native";
import { useState, useRef, useEffect } from "react";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import CustomInput from "../../../components/input";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import FormikListInput from "../../../components/formikListInput";

const XaddProductRawInputs = ({ rawMaterials: rawMaterials_ }) => {
  const [rawMaterials, setRawMaterials] = useState([
    { id: nanoid(10), name: "" },
  ]);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (rawMaterials_) {
      setRawMaterials(rawMaterials_);
      console.log(rawMaterials_, "in addproductrasinput");
    }
  }, [rawMaterials_]);

  const handleRawMaterialChange = (text, id) => {
    setRawMaterials((prevMaterials) =>
      prevMaterials.map((material) =>
        material.id === id ? { ...material, name: text } : material
      )
    );
  };

  const removeRawMaterial = (id) => {
    setRawMaterials((prevMaterials) =>
      prevMaterials.filter((material) => material.id !== id)
    );
  };

  const handleAddRawMaterial = () => {
    const newMaterial = { id: nanoid(10), name: "" };
    setRawMaterials((prev) => [...prev, newMaterial]);

    // Wait for the component to render and then focus the new input
    setTimeout(() => {
      const index = rawMaterials.length; // new item will be last
      inputRefs.current[index]?.focus();
    }, 100);
  };

  return (
    <View style={styles.container}>
      <CustomLabel fontSize={16}>Raw Materials</CustomLabel>
      <View>
        <View style={styles.rawMaterialInputs}>
          {rawMaterials?.map((material, index) => (
            <View key={material.id}>
              {index > 0 && (
                <Pressable
                  onPress={() => removeRawMaterial(material.id)}
                  style={styles.crossIcon}
                >
                  <Icon name="cross" library="entypo" />
                </Pressable>
              )}

              <CustomInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                placeholder={`${index + 1}. Raw material`}
                value={material.name}
                handleInputChange={(text) =>
                  handleRawMaterialChange(text, material.id)
                }
              />
            </View>
          ))}
        </View>
        <Pressable onPress={handleAddRawMaterial} style={styles.addButton}>
          <Icon color="#fff" name="plus" library="materialIcon" />
          <CustomLabel color="#fff" fontSize={16}>
            Add Raw Materials
          </CustomLabel>
        </Pressable>
        <FormikListInput name="rawMaterials" listValue={rawMaterials} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    gap: 5,
  },
  rawMaterialInputs: {
    borderWidth: 1,
    padding: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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

export default XaddProductRawInputs;
