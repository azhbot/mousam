import { View, StyleSheet, Pressable, Text } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useEffect } from "react";
import CustomButton from "../../../components/button";
import { useSelector } from "react-redux";
import { selectSamples } from "../../../redux/sample/sampleSelector";
import { selectUser } from "../../../redux/user/userSelector";

const ProductDetailsSampleTest = ({
  handleSampleRequest,
  productDetail,
  isSampleVerified,
}) => {
  const samples = useSelector(selectSamples);
  const user = useSelector(selectUser);
  const sample = samples.find(
    (sample) =>
      sample.productId === productDetail.id && sample.userId === user.id
  );

  // if (sample?.status === "passed") {
  //   return null;
  // }

  // useEffect(() => {
  //   console.log(sample, "in productDetailsSample text ");
  // }, [sample]);
  return (
    <View style={styles.sampleTest}>
      <CustomLabel fontFamily="poppinsMedium" fontSize={14}>
        Sample Test
      </CustomLabel>
      <CustomButton
        backgroundColor={sample ? "#fff" : colors.tertiary}
        textColor={sample ? colors.tertiary : "#fff"}
        title={"Apply"}
        onPress={handleSampleRequest}
        borderRadius={100}
        width={100}
        height={35}
        style={{
          borderWidth: sample ? 1.5 : 0,
          borderColor: colors.tertiary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sampleTest: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,

    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: colors.LightGray,
  },
});

export default ProductDetailsSampleTest;
