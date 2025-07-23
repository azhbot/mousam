import Toast from "react-native-toast-message";

const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
    position: "bottom",
    visibilityTime: 3000,
    autoHide: true,
  });
};

export { Toast, showToast };
