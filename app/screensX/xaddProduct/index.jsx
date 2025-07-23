import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { nanoid } from "nanoid";

import XaddProductHeader from "./components/xaddProductHeader";
import XaddProductPhotoUpload from "./components/xaddProductPhotoUpload";
import XaddProductInputs from "./components/xaddProductInputs";
import XaddProductAddtionalInputs from "./components/xaddProductAddtionalInputs";
import XaddProductAllDetails from "./components/xaddProductAllDetails";
import XaddProductRawInputs from "./components/xaddProductRawInputs";
import FormikWrapper from "../../components/formik";
import FormikSubmitButton from "../../components/formikSubmitButton";
import xaddProductSchema from "../../validation/xaddProductSchema";
import { companies } from "../../data/companies";
import { users } from "../../data/users";
import { useDispatch } from "react-redux";
import { addToAllProducts } from "../../redux/product/productSlice";
import { useEffect, useState } from "react";
import { showMessage } from "../../utils/customMsgUtil";
import XaddProductAddress from "./components/xaddProductAddress";
import { productDetails } from "../../data/productsDetails";

const uploadPhotos = Array(6).fill("");

const XaddProductScreen = ({ route }) => {
  const dispatch = useDispatch();

  const productId = route?.params?.productId;

  // if (!productId) return null;

  const product = productDetails.find((product) => product?.id === productId);
  const rawMaterials = product?.rawMaterials;
  const additionalDetails = product?.additionalDetails;

  const currentUser = users[0];
  const currentCompany = companies[0];

  const [images, setImages] = useState(Array(uploadPhotos.length).fill(null));

  useEffect(() => {
    const images = product?.images || [];
    setImages(images);
  }, [product?.images]);

  useEffect(() => {
    console.log(product, "in xaddProduct", productId);
    // if (product?.varients) {
    //   // setImages((prev) => [product?.varients[0]?.image, ...prev]);
    // }
  }, [product, productId]);

  const handleSubmit = (values) => {
    return;
    const productDetail = {
      ...values,
      id: nanoid(),
      images,
      userId: currentUser.id,
      companyId: currentCompany.id,
      companyName: currentCompany.name,
      companyLogo: currentCompany.logo,
      isCompanyVerified: false,
    };
    dispatch(addToAllProducts(productDetail));
    showMessage("Product added");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
      <FormikWrapper
        initialValues={{
          name: product?.name || "", // product name i0n validation
          cost: product?.cost?.toString() || "", // making price in validation
          gender: product?.gender || "",

          category: product?.categoryId?.toString() || "",
          subCategory: product?.subCategoryId?.toString() || "",
          size: product?.sizes || [],
          type: product?.mfgCategory || "",
          variant: product?.variant || "",
          rawMaterials: [], // Added this
          additionalDetails: [],
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={xaddProductSchema}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <XaddProductHeader />
          <XaddProductPhotoUpload
            uploadPhotos={uploadPhotos}
            images={images}
            setImages={setImages}
          />
          <XaddProductInputs />
          <XaddProductRawInputs rawMaterials={rawMaterials} />
          <XaddProductAddtionalInputs additionalDetails={additionalDetails} />
          <XaddProductAllDetails />
          <XaddProductAddress />
        </ScrollView>
        <View style={{ paddingHorizontal: 15 }}>
          <FormikSubmitButton title="LAUNCH PRODUCT" />
        </View>
      </FormikWrapper>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default XaddProductScreen;
