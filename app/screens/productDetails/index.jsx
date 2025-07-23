import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  InteractionManager,
  Dimensions,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useRef, useState } from "react";

import ProductDetailsHeader from "./components/porductDetailsHeader";
import ProductDetailsAdsBanner from "./components/productDetailsAdsBanner";
import ProductDetailsImage from "./components/productDetailsImage";
import ProductDetailsButton from "./components/productDetailsButton";
import ProductDetailsNameDetails from "./components/productDetailsNameDetails";
import ProductDetailsSize from "./components/productDetailsSize";
import { colors } from "../../constant/colors";
import ProductDetailsCompany from "./components/productDetailsCompany";
import ProductDetailsPriceDetils from "./components/productDetailsPriceDetails";
import ProductDetailsAddress from "./components/productDetailsAddress";
import ProductDetailsRawMaterials from "./components/productDetailsRawMaterials";
import ProductDetailsAdditionalDetails from "./components/productDetailsAdditionalDetails";
import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import ProductDetailsPolicies from "./components/productDetailsPolicies";
import ProductDetailsReviews from "./components/productDetailsReviews";
import ProductDetailsItemCards from "./components/productDetailsItemCards";
import ProductDetailsReviewCard from "./components/productDetailsReviewedCard";
import LoadingOverlay from "../../components/loading/loadingOverlay";
import { selectProductState } from "../../redux/product/productSelector";
import CustomMsg from "../../components/msg";
import {
  selectUser,
  selectUserVerifiedSamples,
} from "../../redux/user/userSelector";
import GrabCard from "./components/grabCard";
import ProductDetailsSkeleton from "./components/productDetailsSkeleton";
import ProductDetailsSampleTest from "./components/ProductDetailsSampleTest";
import { addToRecentProducts } from "../../redux/product/productSlice";
import { showMessage } from "../../utils/customMsgUtil";

const { height } = Dimensions.get("window");

const ProductDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = route?.params?.productId;
  const conditionForOnlyShow = route?.params?.onlyShow;
  const conditionForCompanyShow = route?.params?.companyShow;

  // useEffect(() => {
  //   console.log(id, "in productdetails");
  // }, [id]);

  const [loading, setLoading] = useState(true);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [showGrabCard, setShowGrabCard] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const msgRef = useRef();

  const productDetails = useSelector(selectProductState)?.productDetails;
  const user = useSelector(selectUser);
  const userVerifiedSamples = useSelector(selectUserVerifiedSamples);

  const userId = user.id;
  const userVerifiedSample = userVerifiedSamples.find(
    (sample) => sample.productId === id
  );

  const productDetail = productDetails?.find((detail) => detail.id === id);
  const productBasic = useMemo(() => {
    if (!productDetail) return null;
    return {
      id: productDetail?.id,
      image: productDetail?.images?.[0] ?? null, // safer
      name: productDetail?.name,
    };
  }, [productDetail]);

  const company = {
    id: productDetail?.companyId,
    name: productDetail?.companyName,
    logo: productDetail?.companyLogo,
  };

  const handleSampleRequest = () => {
    if (!selectedSize) {
      showMessage("Please select a size first");
    } else {
      navigation.navigate("sampleTest", {
        product: {
          ...productDetail,
          size: selectedSize,
        },
      });
    }
  };

  const handleSize = (s) => {
    setSelectedSize(s);
  };

  useEffect(() => {
    setLoading(false);
    if (productDetail) {
      dispatch(addToRecentProducts(productBasic));
    }

    // console.log("loading finished");
  }, [
    productDetails,
    userVerifiedSample,
    userId,
    id,
    conditionForCompanyShow,
    conditionForOnlyShow,
  ]);

  useEffect(() => {
    console.log(userVerifiedSamples, "in productD eatils ");
  }, []);

  // useEffect(() => {
  //   const task = InteractionManager.runAfterInteractions(() => {
  //     setLoading(false);
  //   });
  //   return () => task.cancel();
  // }, []);

  if (loading) return <ProductDetailsSkeleton />;

  if (!productDetail) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ProductDetailsHeader />
        <View style={styles.center}>
          <CustomLabel fontSize={18}>No Product found.</CustomLabel>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 10, padding: 10 }}
          >
            <CustomLabel color={colors.primary}>Go Back</CustomLabel>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!conditionForCompanyShow && !conditionForOnlyShow ? (
        <ProductDetailsHeader />
      ) : (
        <View style={{ padding: 15, paddingVertical: 5 }}>
          <CustomLabel fontSize={16}>Product</CustomLabel>
        </View>
      )}
      {loadingOverlay && <LoadingOverlay />}
      <ScrollView showsVerticalScrollIndicator={false}>
        {!conditionForOnlyShow ? (
          !conditionForCompanyShow && <ProductDetailsAdsBanner />
        ) : (
          <View style={{ height: 10 }} />
        )}
        {productDetail?.images && (
          <ProductDetailsImage
            productDetail={productDetail}
            productImages={productDetail?.images}
            condition={!conditionForCompanyShow}
          />
        )}
        <View style={styles.container}>
          <ProductDetailsNameDetails
            name={productDetail?.name}
            productDetail={productDetail}
            isShowComment={!conditionForCompanyShow}
          />
          <ProductDetailsSize
            active={!conditionForOnlyShow}
            sizes={productDetail?.sizes}
            onSelectSize={handleSize}
          />
          <ProductDetailsPriceDetils productDetail={productDetail} />

          {!conditionForCompanyShow && (
            <ProductDetailsSampleTest
              userVerifiedSample={userVerifiedSample}
              handleSampleRequest={handleSampleRequest}
              productDetail={productDetail}
            />
          )}
          {!conditionForCompanyShow && (
            <ProductDetailsCompany
              productDetail={productDetail}
              company={company}
              setLoadingOverlay={setLoadingOverlay}
            />
          )}

          {!conditionForOnlyShow && !conditionForCompanyShow && (
            <ProductDetailsAddress />
          )}
          {/* {productDetail?.rawMaterials && (
            <ProductDetailsRawMaterials
              rawMaterials={productDetail?.rawMaterials}
            />
          )} */}
          {/* {productDetail?.additionalDetails && (
            <ProductDetailsAdditionalDetails
              additionalDetails={productDetail?.additionalDetails}
            />
          )} */}

          <Pressable
            onPress={() => console.log("all details pressed")}
            style={styles.allDetails}
          >
            <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
              All Details
            </CustomLabel>
            <Icon name="chevron-right" />
          </Pressable>

          <ProductDetailsPolicies productDetail={productDetail} />
          {productDetail?.reviews && !conditionForCompanyShow && (
            <View style={styles.reviewsWrapper}>
              <ProductDetailsReviews reviews={productDetail?.reviews} />

              <ProductDetailsReviewCard reviews={productDetail?.reviews} />
            </View>
          )}
          {!conditionForOnlyShow && !conditionForCompanyShow && (
            <ProductDetailsItemCards />
          )}
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
      {!conditionForOnlyShow && !conditionForCompanyShow && (
        <ProductDetailsButton
          handleGotoCardPress={() => navigation.navigate("cart")}
          handleGrabitNowPress={() => setShowGrabCard(true)}
        />
      )}
      <CustomMsg ref={msgRef} />

      <Modal
        visible={showGrabCard}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.grabCardContainer}>
          <Pressable
            onPress={() => setShowGrabCard(false)}
            style={styles.closeSpace}
          />
          <GrabCard
            item={productDetail}
            onclose={() => setShowGrabCard(false)}
          />
          <Pressable
            onPress={() => setShowGrabCard(false)}
            style={styles.closeSpace}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  allDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  reviewsWrapper: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.LightGray,
    padding: 10,
  },
  grabCardContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeSpace: { height: height * 0.3 },
});

export default ProductDetailsScreen;
