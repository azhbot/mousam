import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
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
import { colors } from "../../constant/colors";

const CustomInput = forwardRef(
  (
    {
      placeholder = "Placeholder",
      handleInputChange,
      value = "",
      editable = true,
      keyboardType = "default",
      autoCorrect = false,
      multiline = false,
      secureTextEntry = false,
      onSubmitEditing = () => {},
      returnKeyType = "default",
    },
    ref
  ) => {
    const [inputHeight, setInputHeight] = useState(40); // initial height
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const animatedLabel = useSharedValue(value ? 1 : 0);
    const inputRef = useRef(null);

    // Expose `focus` to parent
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const animateLabel = (toValue) => {
      animatedLabel.value = withTiming(toValue, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    };

    useEffect(() => {
      if (inputValue) {
        animateLabel(1);
      } else if (!isFocused) {
        animateLabel(0);
      }
    }, [inputValue, isFocused]);

    const handleFocus = () => {
      setIsFocused(true);
      animateLabel(1);
    };

    const handleBlur = () => {
      setIsFocused(false);
      if (!inputValue) {
        animateLabel(0);
      }
    };

    const handleLabelPress = () => {
      inputRef.current?.focus();
    };

    const handleChangeText = (text) => {
      setInputValue(text);
      handleInputChange?.(text);
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
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            { height: multiline ? inputHeight : 40 },
          ]}
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          value={inputValue}
          editable={editable}
          keyboardType={keyboardType}
          autoCorrect={autoCorrect}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 10,
  },
  labelContainer: {
    position: "absolute",
    left: 12,
    backgroundColor: "#fff",
    zIndex: 10,
    paddingHorizontal: 4,
    transformOrigin: "top left",
  },
  label: {
    fontSize: 14,
    paddingHorizontal: 4,
    fontFamily: "poppinsRegular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    paddingTop: 5,
    textAlignVertical: "top",
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
});

export default CustomInput;
