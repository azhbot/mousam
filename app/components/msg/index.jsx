import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
} from "react";
import { Animated, Text, Easing, StyleSheet } from "react-native";

const CustomMsg = forwardRef(({ duration = 1000 }, ref) => {
  const [message, setMessage] = useState("Warning!");
  const [visible, setVisible] = useState(false);
  const messageAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const show = (msg, duration) => {
    setMessage(msg);
    setVisible(true);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(messageAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        delay: duration,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.messageBox,
        {
          transform: [{ translateY: messageAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Text style={styles.messageText}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  messageBox: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 100,
    zIndex: 9999,
    elevation: 5,
    backgroundColor: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  messageText: {
    fontFamily: "poppinsRegular",
    color: "#eaeaea",
  },
});

export default CustomMsg;
