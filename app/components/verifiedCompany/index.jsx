import { View, StyleSheet, Dimensions } from "react-native";
import CustomImage from "../image";
import CustomLabel from "../label";
import Icon from "../icon";
import { colors } from "../../constant/colors";
import { images } from "../../constant/images";

const { width } = Dimensions.get("window");

const VerifiedCompanyName = ({
  companyWidth,
  verified = true,
  companyNameSize = "big",
  textColor = "#000",
  companyName = "Company Name",
  source = images.company1,
  company = {},
  isLogoShow = true,
}) => {
  const sizes = {
    small: {
      imageSize: width * 0.035,
      iconSize: width * 0.02,
      fontSize: width * 0.02,
    },
    big: {
      imageSize: width * 0.045,
      iconSize: width * 0.025,
      fontSize: width * 0.025,
    },
    large: {
      imageSize: width * 0.052,
      iconSize: width * 0.032,
      fontSize: width * 0.032,
    },
  };

  const { imageSize, fontSize, iconSize } = sizes[companyNameSize] || sizes.big;
  const logo = company?.logo ?? source;
  const name = company?.name ?? companyName;

  return (
    <View style={[styles.outerContainer, { width: companyWidth }]}>
      {isLogoShow && (
        <CustomImage size={imageSize} source={logo} style={styles.logoImage} />
      )}
      <View style={styles.nameAndIconContainer}>
        <CustomLabel
          color={textColor}
          fontSize={fontSize}
          style={styles.companyNameText}
          fontFamily="poppinsMedium"
          numberOfLines={1}
        >
          {name}
        </CustomLabel>
        {verified && (
          <Icon
            color={colors.tertiary}
            name="verified"
            library="materialIcons"
            size={iconSize}
            style={styles.verifiedIcon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    borderRadius: 20,

    marginRight: 5,
  },
  nameAndIconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  companyNameText: {
    flexShrink: 1,
    minWidth: 0,
    paddingTop: 2,

    textAlignVertical: "center",
  },
  verifiedIcon: {
    marginLeft: 0,
  },
});

export default VerifiedCompanyName;
