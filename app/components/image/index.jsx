import { Image } from "react-native";

const CustomImage = ({
  source,
  size = 100,
  height,
  width,
  ratio,
  resizeMode = "contain",
  borderRadius = 0,
  style,
  onLoad = () => {},
  onError = () => {},
}) => {
  let finalWidth = width;
  let finalHeight = height;

  if (ratio !== undefined) {
    if (finalWidth && !finalHeight) {
      finalHeight = finalWidth / ratio;
    } else if (finalHeight && !finalWidth) {
      finalWidth = finalHeight * ratio;
    } else if (!finalWidth && !finalHeight) {
      finalWidth = size;
      finalHeight = size / ratio;
    }
  }

  if (finalWidth === undefined) {
    finalWidth = size;
  }
  if (finalHeight === undefined) {
    finalHeight = size;
  }

  return (
    <Image
      source={source}
      style={[
        {
          width: finalWidth,
          height: finalHeight,
          borderRadius: borderRadius,
        },
        style,
      ]}
      resizeMode={resizeMode}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default CustomImage;
