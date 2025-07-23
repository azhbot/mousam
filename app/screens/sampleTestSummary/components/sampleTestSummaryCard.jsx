import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomLine from "../../../components/line";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import { colors } from "../../../constant/colors";
import CustomImage from "../../../components/image";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const { width } = Dimensions.get("window");
const SampleTestSummaryCard = ({ item }) => {
  const navigation = useNavigation();
  const company = {
    name: item?.companyName,
    logo: item?.companyLogo,
  };

  useEffect(() => {
    console.log(item, "in sampletestsubbmarycard");
  }, [item]);

  const handleShipingDetailsPress = () => {
    navigation.navigate("shiping");
  };

  const handleProductDetails = () => {
    navigation.navigate("productDetails", {
      productId: item.productId,
      condition1: true,
    });
  };

  const showStatus = () => {
    if (item?.status == "requested") {
      return <CustomLabel fontSize={12}>Proccssing..</CustomLabel>;
    }
    if (item?.status == "accepted") {
      return (
        <Icon
          color={colors.green}
          name="done-outline"
          library="materialIcons"
        />
      );
    }
    if (item?.status == "passed") {
      return (
        <Icon
          color={colors.tertiary}
          name="done-outline"
          library="materialIcons"
        />
      );
    }
    if (item?.status == "reject" || "cancelled") {
      return <Icon color={"red"} name="close-thick" size={30} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Pressable onPress={handleProductDetails}>
            <CustomLabel fontFamily="poppinsMedium">
              {item?.productName}
            </CustomLabel>
          </Pressable>
          <View style={styles.rowCenter}>
            <CustomLabel>Quantity: {item?.quantity} Pcs</CustomLabel>
            <CustomLabel>{item?.productMfgCategory}</CustomLabel>
          </View>

          <View>
            <Pressable
              onPress={() =>
                navigation.navigate("company", { companyId: item.companyId })
              }
            >
              <VerifiedCompanyName
                company={company}
                companyNameSize="large"
                companyWidth={width * 0.42}
              />
            </Pressable>
            <View style={styles.rowCenter}>
              <View style={{ width: width * 0.3 }}>
                <CustomLabel
                  fontFamily="poppinsRegular"
                  fontSize={12}
                  numberOfLines={1}
                >
                  Order Id:{item?.id}
                </CustomLabel>
              </View>
              <CustomLabel fontSize={8}>{item?.date || ""} </CustomLabel>
            </View>
          </View>
        </View>
        <Pressable onPress={handleProductDetails} style={styles.topRight}>
          <CustomImage source={item?.productImage} size={width * 0.2} />
        </Pressable>
      </View>
      <CustomLine color="#fff" />
      <View style={styles.bottom}>
        <Pressable
          onPress={() => handleShipingDetailsPress(item)}
          style={styles.bottomLeft}
        >
          <CustomLabel fontFamily="poppinsMedium" fontSize={12}>
            Shiping Details
          </CustomLabel>
          <Icon name="chevron-right" />
        </Pressable>
        <View style={styles.bottomRight}>{showStatus()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 5,
    gap: 10,
  },
  topLeft: {
    width: width * 0.55,
    justifyContent: "space-between",
  },

  topRight: {
    height: width * 0.25,
    width: width * 0.25,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    width: width * 0.55,
  },
  bottom: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  bottomLeft: {
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 40,
    flex: 1,
    paddingLeft: 10,
  },
  bottomRight: {
    width: width * 0.25,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SampleTestSummaryCard;
