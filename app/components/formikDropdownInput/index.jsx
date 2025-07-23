import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Button,
  ScrollView,
} from "react-native";
import { useFormikContext } from "formik";
import { colors } from "../../constant/colors";
import CustomLabel from "../label";
import Icon from "../icon"; // Assuming you have a circular icon component

const { width } = Dimensions.get("window");

const FormikDropdownInput = ({
  name,
  placeholder,
  dropdownList = ["one", "two", "three"],
  multipleOptions = false,
}) => {
  const { values, errors, touched, setFieldValue } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const animatedLabel = useRef(
    new Animated.Value(values[name]?.length ? 1 : 0)
  ).current;

  const selectedValues = multipleOptions ? values[name] || [] : values[name];

  useEffect(() => {
    if (selectedValues?.length) {
      animateLabel(1);
    } else if (!isFocused) {
      animateLabel(0);
    }
  }, [selectedValues, isFocused]);

  const animateLabel = (toValue) => {
    Animated.timing(animatedLabel, {
      toValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const labelTranslateY = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -10],
  });

  const labelScale = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  const toggleSelection = (item) => {
    const current = values[name] || [];
    if (current.includes(item)) {
      setFieldValue(
        name,
        current.filter((i) => i !== item)
      );
    } else {
      setFieldValue(name, [...current, item]);
    }
  };

  const renderValue = () => {
    const value = multipleOptions
      ? (values[name] || []).join(", ")
      : values[name];

    if (typeof value === "string" && value.length > 0) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return value;
  };

  const handleOptionPress = (item) => {
    if (multipleOptions) {
      toggleSelection(item);
    } else {
      setFieldValue(name, item);
      setShowDropdown(false);
      setIsFocused(true);
      animateLabel(1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowDropdown(true);
          setIsFocused(true);
          animateLabel(1);
        }}
      >
        <Animated.View
          style={[
            styles.labelContainer,
            { transform: [{ translateY: labelTranslateY }] },
          ]}
        >
          <Animated.Text
            style={{
              transform: [{ scale: labelScale }],
              color: isFocused ? colors.primary : "#777",
              fontFamily: "poppinsRegular",
              fontSize: 14,
            }}
          >
            {placeholder}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <Pressable
        style={[styles.input, isFocused && styles.inputFocused]}
        onPress={() => {
          setShowDropdown(true);
          setIsFocused(true);
          animateLabel(1);
        }}
      >
        <CustomLabel>{renderValue()}</CustomLabel>
      </Pressable>

      {touched[name] && errors[name] && (
        <Animated.Text style={styles.errorText}>{errors[name]}</Animated.Text>
      )}

      <Modal
        visible={showDropdown}
        onRequestClose={() => {
          setShowDropdown(false);
          setIsFocused(!!selectedValues?.length);
          if (!selectedValues?.length) animateLabel(0);
        }}
        animationType="slide"
        transparent
        statusBarTranslucent
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Pressable
          style={styles.dropdownContainer}
          onPress={() => {
            setShowDropdown(false);
            setIsFocused(!!selectedValues?.length);
            if (!selectedValues?.length) animateLabel(0);
          }}
        >
          <Pressable style={styles.dropdown} onPress={() => {}}>
            <ScrollView style={{ maxHeight: 180 }}>
              {dropdownList.map((item, index) => {
                const selected = multipleOptions
                  ? (values[name] || []).includes(item)
                  : values[name] === item;

                return (
                  <Pressable
                    key={index}
                    onPress={() => handleOptionPress(item)}
                    style={styles.option}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {multipleOptions && (
                        <Icon
                          name={
                            selected
                              ? "radio-button-checked"
                              : "radio-button-unchecked"
                          }
                          library="materialIcons"
                          color={selected ? colors.primary : "#ccc"}
                          size={18}
                          style={{ marginRight: 10 }}
                        />
                      )}
                      <CustomLabel>{item}</CustomLabel>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
            {multipleOptions && (
              <Button title="Ok" onPress={() => setShowDropdown(false)} />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    position: "relative",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputFocused: {
    // borderColor: colors.primary,
  },
  labelContainer: {
    position: "absolute",
    left: 17,
    backgroundColor: "#fff",
    zIndex: 1,
    transformOrigin: "top left",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
    marginLeft: 4,
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.LightGray,
  },
});

export default FormikDropdownInput;
