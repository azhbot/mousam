import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import CustomImage from "../../../components/image";
import { images } from "../../../constant/images";
import useCompanyActions from "../../../hooks/useCompanyActions";
import { useEffect, useState } from "react";
import { formatNumber } from "../../../utils/formatNumberUtil";
import CustomButton from "../../../components/button";

const ProductDetailsCompany = ({
  company,
  productDetail,
  setLoadingOverlay,
}) => {
  const navigation = useNavigation();

  const { handleCompanySave, isSaved } = useCompanyActions(company);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    // console.log(company, "in productDetailscomapay");
    setFollowed(isSaved);
  }, []);

  if (!productDetail) return null;

  const handleCompanyPress = () =>
    navigation.navigate("company", { companyId: company.id });

  const handleSavePress = () => {
    setFollowed((prev) => !prev);
    handleCompanySave();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleCompanyPress} style={styles.StoreButton}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={
              productDetail?.companyLogo
                ? productDetail?.companyLogo
                : images?.noImage
            }
            size={50}
          />
        </View>
        <View style={styles.containerMiddle}>
          <View style={styles.nameContainer}>
            <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
              {productDetail?.companyName}
            </CustomLabel>
            <Icon
              color={colors.tertiary}
              name="verified"
              library="materialIcons"
              size={20}
            />
          </View>
          <CustomLabel
            style={{ bottom: 5 }}
            fontFamily="poppinsRegular"
            fontSize={16}
          >
            {formatNumber(productDetail?.companySubscriber)}
          </CustomLabel>
        </View>
      </Pressable>

      <CustomButton
        onPress={handleSavePress}
        title={followed ? "Unfollow" : "Follow"}
        backgroundColor={followed ? "#fff" : colors.tertiary}
        textColor={followed ? colors.tertiary : "#fff"}
        borderRadius={100}
        width={100}
        height={35}
        opacity={followed ? 0.8 : 1}
        style={{
          borderWidth: followed ? 1.5 : 0,
          borderColor: colors.tertiary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 8,
    padding: 5,
    paddingRight: 10,
    height: 60,
  },
  StoreButton: {
    flexDirection: "row",
    flex: 1,
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default ProductDetailsCompany;
