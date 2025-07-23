import { View, StyleSheet } from "react-native";

import CustomLable from "../../components/label/index";
import CustomImage from "../../components/image";
import { images } from "../../constant/images";
import CustomButton from "../../components/button";
import { colors } from "../../constant/colors";
import NoNetworkHeader from "./components/noNetworkHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const NoNetworkScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NoNetworkHeader />
      <View style={styles.container}>
        <CustomImage source={images.noInternet} size={200} />
        <CustomLable fontSize={20} fontFamily="poppinsMedium">
          No Internet Connection
        </CustomLable>
        <CustomLable fontFamily="poppinsMedium" color={colors.LightGray}>
          Please Check your Internet Connection and try again
        </CustomLable>
        <CustomButton
          title="Retry"
          backgroundColor={colors.tertiary}
          style={{ marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoNetworkScreen;
