import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import CustomLabel from "../label";

const Dropdown = ({
  visible,
  dropdownList = ["Delete", "Download", "hellow"],
  onSelect,
  onClose,
  dropdownPosition = { top: 0, left: 0 },
}) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      animation.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    } else {
      animation.value = withTiming(0, {
        duration: 150,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
    transform: [{ scaleY: animation.value }],
  }));

  const handleSelect = (item) => {
    onSelect?.(item);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Animated.View
        style={[
          styles.dropdown,
          animatedStyle,
          {
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          },
        ]}
        // prevent onClose when tapping inside dropdown
        onStartShouldSetResponder={() => true}
      >
        {dropdownList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handleSelect(item)}
          >
            <CustomLabel>
              {typeof item === "string" ? item : item.label || item.value}
            </CustomLabel>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.0)",
    zIndex: 999,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 5,
    paddingVertical: 6,
    minWidth: 140,
    transform: [{ scaleY: 0 }],
    zIndex: 1000,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Dropdown;
