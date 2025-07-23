import { View, StyleSheet, Pressable } from "react-native";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import Icon from "../../../components/icon";
import { useNavigation } from "@react-navigation/native";
import { products } from "../../../data/products";
import CustomImage from "../../../components/image";

const ProductDetailsAdsBanner = () => {
  const navigation = useNavigation();

  const firstProduct = products?.[0];

  if (!firstProduct) {
    return <CustomLabel>No ads available</CustomLabel>;
  }

  return (
    <Pressable
      onPress={() =>
        navigation.push("productDetails", { productId: firstProduct.id })
      }
      style={styles.container}
    >
      {/* Left: Product Image */}
      <View style={styles.imageContainer}>
        <CustomImage source={firstProduct?.image} size={60} />
      </View>

      {/* Middle: Product Info */}
      <View style={styles.infoContainer}>
        <CustomLabel fontFamily="poppinsMedium" numberOfLines={1}>
          {firstProduct?.name}
        </CustomLabel>
        <VerifiedCompanyName companyWidth={"80%"} />
        <CustomLabel fontFamily="poppinsMedium" fontSize={12}>
          Rs {firstProduct?.cost}/Pcs · 1000Pcs
        </CustomLabel>
      </View>

      {/* Right: Ads Label + View Button */}
      <View style={styles.actionContainer}>
        <CustomLabel fontFamily="poppinsMedium" fontSize={10} color={"orange"}>
          Ads
        </CustomLabel>
        <View style={styles.viewButton}>
          <CustomLabel
            fontFamily="poppinsMedium"
            fontSize={12}
            color={colors.tertiary}
          >
            View
          </CustomLabel>
          <Icon name="chevron-right" size={14} color={colors.tertiary} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderColor: colors.LightGray,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  imageContainer: {
    marginRight: 10,
    backgroundColor: "orange",
    padding: 4,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  actionContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 60,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});

export default ProductDetailsAdsBanner;
