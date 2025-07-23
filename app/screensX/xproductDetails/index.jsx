import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomLine from "../../components/line";
import { colors } from "../../constant/colors";
import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import XproductDetailsHeader from "./components/xporductDetailsHeader";
import XproductDetailsAdsBanner from "./components/xproductDetailsAdsBanner";
import XproductDetailsImage from "./components/xproductDetailsImage";
import XproductDetailsNameDetails from "./components/xproductDetailsNameDetails";
import XproductDetailsVariant from "./components/xProductDetailsVariant";
import XproductDetailsSize from "./components/xproductDetailsSize";
import XproductDetailsPriceDetils from "./components/xproductDetailsPriceDetails";
import XproductDetailsAddress from "./components/xproductDetailsAddress";
import XproductDetailsRawMaterials from "./components/xproductDetailsRawMaterials";
import XproductDetailsAdditionalDetails from "./components/xproductDetailsAdditionalDetails";
import XproductDetailsPolicies from "./components/xproductDetailsPolicies";
import XproductDetailsReviews from "./components/xproductDetailsReviews";
import XproductDetailsButton from "./components/xproductDetailsButton";
import XproductDetailsItemCards from "./components/xproductDetailsItemCards";
import XproductDetailsReviewerName from "./components/xproductDetailsReviewerName";
import XproductDetailsPhotoReviews from "./components/xproductDetailsPhotoReviews";
import { SafeAreaView } from "react-native-safe-area-context";

const XproductDetailsScreen = () => {
  const navigation = useNavigation();

  const handleApplyPress = () => {
    console.log("working but not");
    navigation.navigate("sampleTest");
  };

  const handleItemCardPress = () => {
    navigation.replace("productDetails");
  };

  return (
    <View style={{ flex: 1 }}>
      <XproductDetailsHeader />
      <ScrollView>
        {/* <XproductDetailsAdsBanner /> */}
        <XproductDetailsImage />
        <View style={styles.container}>
          {/* <XproductDetailsNameDetails /> */}

          <XproductDetailsVariant />
          <CustomLine
            height={0.5}
            color={colors.LightGray}
            marginVertical={5}
          />
          <XproductDetailsSize />
          <CustomLine
            height={0.5}
            color={colors.LightGray}
            marginVertical={10}
          />

          <CustomLine marginVertical={10} />
          <XproductDetailsPriceDetils handleApplyPress={handleApplyPress} />
          <CustomLine marginVertical={10} />
          <XproductDetailsAddress />
          <CustomLine marginVertical={10} />
          <XproductDetailsRawMaterials />
          <CustomLine marginVertical={10} />
          <XproductDetailsAdditionalDetails />
          <CustomLine marginVertical={10} />
          <Pressable
            onPress={() => console.log("all details pressed")}
            style={styles.allDetails}
          >
            <CustomLabel fontFamily="interMedium" fontSize={16}>
              All Details
            </CustomLabel>
            <Icon name="chevron-right" />
          </Pressable>
          <CustomLine marginVertical={10} />
          <XproductDetailsPolicies />
          {/* <CustomLine marginVertical={10} /> */}
          {/* <XproductDetailsReviews /> */}
          {/* <CustomLine marginVertical={10} /> */}
          {/* <XproductDetailsPhotoReviews /> */}
          {/* <CustomLine marginVertical={10} /> */}
          {/* <XproductDetailsReviewerName /> */}
          {/* <CustomLine marginVertical={10} /> */}
          {/* <XproductDetailsItemCards handleItemCardPress={handleItemCardPress} /> */}
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
      {/* <XproductDetailsButton
        handleGotoCardPress={() => navigation.navigate("cart")}
        handleGrabitNowPress={() => null}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default XproductDetailsScreen;
