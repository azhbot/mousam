import { View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { nanoid } from "nanoid";

import SampleTestHeader from "./components/sampleTestHeader";
import SampleTestSteps from "./components/sampleTestSteps";
import SampleTestAddress from "./components/sampleTestAddress";
import SampleTestRequestSample from "./components/sampleTestRequestSample";
import LoadingOverlay from "../../components/loading/loadingOverlay";
import {
  addTosamples,
  removeFromsamples,
} from "../../redux/sample/sampleSlice";
import { showMessage } from "../../utils/customMsgUtil";
import { selectUser } from "../../redux/user/userSelector";
import { selectSamples } from "../../redux/sample/sampleSelector";
import Icon from "../../components/icon";
import { colors } from "../../constant/colors";
import CustomLabel from "../../components/label";
import CustomButton from "../../components/button";
import { addVerifiedSample } from "../../redux/user/userSlice";
import { selectCompanyMap } from "../../redux/company/companySelector";
import { selectAddress } from "../../redux/address/addressSelector";

const SampleTestScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const product = route?.params?.product;

  const [isRequestSent, setIsRequestSent] = useState(false);

  const user = useSelector(selectUser);
  const samples = useSelector(selectSamples) || [];
  const companiesMap = useSelector(selectCompanyMap);
  const { selectedAddress } = useSelector(selectAddress);

  const currentSample = samples.find(
    (sample) => sample.productId === product.id && sample.userId === user.id
  );

  const company = companiesMap.get(product?.companyId);

  useEffect(() => {
    console.log(product, "in sampletest", user.id);
  }, [product]);

  const handletempo = () => {
    navigation.navigate("xnewSampleTestList");
  };

  const handleSampleRequestSend = () => {
    const now = new Date();
    const sampleRequestDate = dayjs(now).format("MMMM D, YYYY, h:mm A"); // or ISO string if you prefer
    dispatch(
      addTosamples({
        id: nanoid(10),
        createdAt: now.toISOString(), // For backend sorting
        date: sampleRequestDate,
        status: "requested",
        isReturned: false,
        productId: product?.id,
        productName: product?.name,
        productCost: product?.cost,
        productImage: product?.images[0], /// risky here
        productMfgCategory: product?.mfgCategory,
        productRawMaterials: product?.rawMaterials,
        productSize: product?.size,
        productVariant: product?.variant,
        companyId: product?.companyId,
        companyName: product?.companyName,
        companyLogo: product?.companyLogo,
        quantity: 3,
        userName: user?.name,
        userId: user?.id,
        userAddress: selectedAddress,
        pinNumber: user?.pinNumber,
        numberOfMachine: user?.numberOfMachine,
        groupNumber: company?.nextSampleNumber,
      })
    );

    //   addVerifiedSample({
    //     productId: product.productId,
    //     isVerified: false,
    //   }
    // );

    showMessage("Request sent");
  };

  const handleSampleRequest = () => {
    console.log("request sent");
    setIsRequestSent(true);
    handleSampleRequestSend();
  };

  const handleDone = () => {
    // dispatch(
    //   addVerifiedSample({
    //     productId: 1,
    //     isVerified: "true",
    //   })
    // );
    console.log("sample added to user");
    navigation.goBack();
  };

  const handleTryAgain = () => {
    dispatch(removeFromsamples({ id: currentSample.id }));
    console.log("removed succesfuly");
    navigation.goBack();
  };

  const condition =
    currentSample?.status === "passed" || currentSample?.status === "cancelled";

  return (
    <SafeAreaView style={styles.container}>
      {/* {loading && <LoadingOverlay />} */}
      <SampleTestHeader />
      <SampleTestSteps currentSample={currentSample} />
      {!condition && (
        <>
          <SampleTestAddress />
          <SampleTestRequestSample
            handleSampleRequest={handleSampleRequest}
            currentSample={currentSample}
            isRequestSent={isRequestSent}
          />
        </>
      )}

      {currentSample?.status === "passed" && (
        <View style={{ alignItems: "center", paddingVertical: 100, gap: 10 }}>
          <View
            style={{
              backgroundColor: colors.tertiary,
              borderRadius: "100%",
              padding: 10,
            }}
          >
            <Icon
              name="done"
              library="materialIcons"
              size={100}
              color={"#fff"}
            />
          </View>
          <CustomLabel fontSize={16}>Congratulation !</CustomLabel>
          <CustomButton
            onPress={handleDone}
            title={"You are done here! click here"}
            backgroundColor={colors.veryLightGray}
            textColor="#000"
            paddingHorizontal={20}
          />
        </View>
      )}

      {/* {!condition && (
        <>
          <SampleTestAddress />
          <SampleTestRequestSample
            handleSampleRequest={handleSampleRequest}
            currentSample={currentSample}
            isRequestSent={isRequestSent}
          />
        </>
      )} */}

      {currentSample?.status === "cancelled" && (
        <View style={{ alignItems: "center", paddingVertical: 100, gap: 60 }}>
          <View
            style={{
              backgroundColor: colors.red,
              borderRadius: "100%",
              padding: 10,
            }}
          >
            <Icon name="close" library="AntDesign" size={100} color={"#fff"} />
          </View>

          <CustomButton
            onPress={handleTryAgain}
            title={"Opps! Try again..."}
            backgroundColor={colors.veryLightGray}
            textColor="#000"
            paddingHorizontal={20}
          />
        </View>
      )}

      <Button title="tempo btn for complete" onPress={handletempo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: 10 },
});

export default SampleTestScreen;
