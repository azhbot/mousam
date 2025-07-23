import { DefaultTheme } from "@react-navigation/native";

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:"#fff"
  },
};

export default CustomTheme;
