// import { Text } from "react-native";
// import { useEffect } from "react";
// import useAppFont from "../../hooks/useAppFont";

// // Define weight suffixes for logical fontFamily props
// const weightSuffixMap = {
//   interBold: "Bold",
//   interLight: "Light",
//   interMedium: "Medium",
//   interRegular: "Regular",
//   interSemiBold: "SemiBold",
//   interExtraBold: "ExtraBold",
// };

// const CustomLabel = ({ children, fontFamily, fontSize = 14, color, style }) => {
//   const baseFont = ""; // e.g., "Poppins"

//   const resolvedFontFamily = weightSuffixMap[fontFamily]
//     ? `${baseFont}` + `${weightSuffixMap[fontFamily]}`
//     : fontFamily || `${baseFont}Regular`;

//   const baseStyle = {
//     fontSize,
//     color,
//     fontFamily: fontFamily,
//   };

//   useEffect(() => {
//     console.log(resolvedFontFamily, "inside customlabel");
//   }, [resolvedFontFamily]);

//   return <Text style={[baseStyle, style]}>{children}</Text>;
// };

// export default CustomLabel;

import { Text } from "react-native";

const fontWeightMap = {
  interBold: "bold",
  interLight: "300",
  interMedium: "500",
  interRegular: "400",
};

const CustomLabel = ({
  children,
  fontFamily = "poppinsRegular",
  fontSize = 14,
  color,
  style,
  numberOfLines = 10000,
}) => {
  const resolvedStyle = {
    fontSize,
    color,
    ...(fontWeightMap[fontFamily]
      ? { fontWeight: fontWeightMap[fontFamily] }
      : { fontFamily }),
  };

  return (
    <Text numberOfLines={numberOfLines} style={[resolvedStyle, style]}>
      {children}
    </Text>
  );
};

export default CustomLabel;
