import { View, StyleSheet, Pressable } from "react-native";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import Icon from "../../../components/icon";

const XproductDetailsAdsBanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}></View>
      <View style={styles.containerMiddle}>
        <CustomLabel fontFamily="poppinsMedium">
          Name of the Product
        </CustomLabel>
        <VerifiedCompanyName />
        <CustomLabel ontFamily="poppinsMedium" fontSize={12}>
          Rs 12/Pcs . 1000Pcs
        </CustomLabel>
      </View>
      <View style={styles.containerRight}>
        <CustomLabel fontFamily="poppinsMedium" fontSize={10}>
          Ads
        </CustomLabel>
        <Pressable
          onPress={() => console.log("view Pressed")}
          style={styles.view}
        >
          <CustomLabel
            fontFamily="poppinsMedium"
            fontSize={12}
            style={{ paddingTop: 1 }}
          >
            View
          </CustomLabel>
          <Icon name="chevron-right" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: colors.LightGray,
  },
  containerLeft: {
    height: 74,
    width: 74,
    backgroundColor: "red",
  },
  containerMiddle: {
    padding: 5,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "space-around",
  },
  containerRight: {
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default XproductDetailsAdsBanner;
