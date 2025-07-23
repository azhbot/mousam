import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";
import { useFormikContext } from "formik";
import { colors } from "../../constant/colors";

const FormikInputField = ({
  name = "name",
  placeholder = "Placeholder",
  textContentType,
  autoCapitalize = "",
  autoCorrect = false,
  secureTextEntry = false,
  keyboardType = "default",
  editable = true,
}) => {
  const { errors, touched, handleBlur, handleChange, values } =
    useFormikContext();

  const [isFocused, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState(values[name] || "");

  const animatedLabel = useSharedValue(inputValue ? 1 : 0);
  const errorOpacity = useSharedValue(0);

  const inputRef = useRef(null);

  useEffect(() => {
    const newValue = values[name] || "";
    setInputValue(newValue);

    if (newValue) {
      animatedLabel.value = withTiming(1, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (!isFocused) {
      animatedLabel.value = withTiming(0, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [values[name], isFocused]);

  useEffect(() => {
    if (inputValue) {
      animatedLabel.value = withTiming(1, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (!isFocused) {
      animatedLabel.value = withTiming(0, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [inputValue, isFocused]);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      errorOpacity.value = withTiming(1, { duration: 200 });
    } else {
      errorOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [touched[name], errors[name]]);

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel.value = withTiming(1, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handleBlurInput = (e) => {
    handleBlur(name)(e);
    setIsFocused(false);
    if (!inputValue) {
      animatedLabel.value = withTiming(0, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    }
  };

  const handleLabelPress = () => {
    inputRef.current?.focus();
  };

  const handleChangeText = (text) => {
    setInputValue(text);
    handleChange(name)(text);
  };

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedLabel.value, [0, 1], [10, -8]),
        },
        {
          scale: interpolate(animatedLabel.value, [0, 1], [1, 0.75]),
        },
      ],
    };
  });

  const errorTextStyle = useAnimatedStyle(() => {
    return {
      opacity: errorOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleLabelPress}>
        <Animated.View style={[styles.labelContainer, labelAnimatedStyle]}>
          <Animated.Text
            style={[
              styles.label,
              {
                color: isFocused ? colors.primary : "#777",
              },
            ]}
          >
            {placeholder}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TextInput
        ref={inputRef}
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={handleFocus}
        onBlur={handleBlurInput}
        onChangeText={handleChangeText}
        value={inputValue}
        editable={editable}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />

      {touched[name] && errors[name] && (
        <Animated.Text style={[styles.errorText, errorTextStyle]}>
          {errors[name]}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 10,
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 10,
    paddingHorizontal: 4,
    left: 10,
    transformOrigin: "top left",
  },
  label: {
    fontSize: 14,
    paddingHorizontal: 4,
    fontFamily: "poppinsRegular",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    paddingTop: 5,
  },

  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
    marginLeft: 4,
  },
});

export default FormikInputField;

// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Animated,
//   Easing,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { useFormikContext } from "formik";
// import { colors } from "../../constant/colors";

// const FormikInputField = ({
//   name = "name",
//   placeholder = "Placeholder",
//   textContentType,
//   autoCapitalize = "none",
//   autoCorrect = false,
//   secureTextEntry = false,
//   keyboardType = "default",
//   editable = true,
// }) => {
//   const { errors, touched, handleBlur, handleChange, values } =
//     useFormikContext();

//   const [isFocused, setIsFocused] = useState(false);
//   const [inputValue, setInputValue] = useState(values[name] || "");

//   const animatedLabel = useRef(new Animated.Value(inputValue ? 1 : 0)).current;
//   const errorOpacity = useRef(new Animated.Value(0)).current;
//   const inputRef = useRef(null);

//   // Sync with Formik values
//   useEffect(() => {
//     setInputValue(values[name] || "");
//   }, [values[name]]);

//   // Label animation
//   const animateLabel = (toValue) => {
//     Animated.timing(animatedLabel, {
//       toValue,
//       duration: 200,
//       easing: Easing.inOut(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   // Animate on value or focus change
//   useEffect(() => {
//     if (inputValue) {
//       animateLabel(1);
//     } else if (!isFocused) {
//       animateLabel(0);
//     }
//   }, [inputValue, isFocused]);

//   // Error opacity animation
//   useEffect(() => {
//     if (touched[name] && errors[name]) {
//       Animated.timing(errorOpacity, {
//         toValue: 1,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(errorOpacity, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [touched[name], errors[name]]);

//   const handleFocus = () => {
//     setIsFocused(true);
//     animateLabel(1);
//   };

//   const handleBlurInput = (e) => {
//     handleBlur(name)(e);
//     setIsFocused(false);
//     if (!inputValue) animateLabel(0);
//   };

//   const handleLabelPress = () => {
//     inputRef.current?.focus();
//   };

//   const handleChangeText = (text) => {
//     setInputValue(text);
//     handleChange(name)(text);
//   };

//   const labelTranslateY = animatedLabel.interpolate({
//     inputRange: [0, 1],
//     outputRange: [10, -8],
//   });

//   const labelScale = animatedLabel.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 0.75],
//   });

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={handleLabelPress}>
//         <Animated.View
//           style={[
//             styles.labelContainer,
//             { transform: [{ translateY: labelTranslateY }] },
//           ]}
//         >
//           <Animated.Text
//             style={[
//               styles.label,
//               {
//                 transform: [{ scale: labelScale }],
//                 color: isFocused ? colors.primary : "#777",
//               },
//             ]}
//           >
//             {placeholder}
//           </Animated.Text>
//         </Animated.View>
//       </TouchableWithoutFeedback>

//       <TextInput
//         ref={inputRef}
//         style={[styles.input, isFocused && styles.inputFocused]}
//         onFocus={handleFocus}
//         onBlur={handleBlurInput}
//         onChangeText={handleChangeText}
//         value={inputValue}
//         editable={editable}
//         keyboardType={keyboardType}
//         autoCorrect={autoCorrect}
//         textContentType={textContentType}
//         secureTextEntry={secureTextEntry}
//         autoCapitalize={autoCapitalize}
//       />

//       {touched[name] && errors[name] && (
//         <Animated.Text style={[styles.errorText, { opacity: errorOpacity }]}>
//           {errors[name]}
//         </Animated.Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: "relative",
//     marginBottom: 12,
//   },
//   labelContainer: {
//     position: "absolute",
//     left: 12,
//     backgroundColor: "#fff",
//     zIndex: 1,
//     paddingHorizontal: 4,
//   },
//   label: {
//     fontSize: 16,
//     paddingHorizontal: 4,
//   },
//   input: {
//     height: 42,
//     borderWidth: 1,
//     borderColor: "#aaa",
//     borderRadius: 5,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     backgroundColor: "#fff",
//   },
//   inputFocused: {
//     borderColor: colors.primary,
//     borderWidth: 2,
//   },
//   errorText: {
//     color: "red",
//     marginTop: 4,
//     fontSize: 12,
//     marginLeft: 4,
//   },
// });

// export default FormikInputField;
