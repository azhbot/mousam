import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Pressable, Image } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import CustomButton from "../../../components/button";
import CustomImage from "../../../components/image";
import useCompanyActions from "../../../hooks/useCompanyActions";

const { height, width } = Dimensions.get("window");

const StoreStore = ({ company, setLoadingOverlay }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { isSaved, handleCompanySave } = useCompanyActions(company);

  const handleSavePress = () => {
    setLoadingOverlay(true);
    setTimeout(() => {
      handleCompanySave();
      setLoadingOverlay(false);
    }, 1000);
  };

  if (!company) return null;

  const descriptionText = company?.description;

  const handleShowMore = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      {company?.bg && (
        <Image
          source={company?.bg}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      )}

      {/* Store Info */}
      <View style={styles.store}>
        <View style={styles.imageContainer}>
          <CustomImage source={company?.logo} />
        </View>
        <View>
          <View style={styles.nameContainer}>
            <CustomLabel fontFamily="poppinsMedium" fontSize={24}>
              {company.name || "Unnamed Store"}
            </CustomLabel>
            <Icon
              color={colors.tertiary}
              name="verified"
              library="materialIcons"
            />
          </View>
          <CustomLabel fontFamily="poppinsMedium">
            @{company?.email}
          </CustomLabel>
          <View style={styles.collectors}>
            <CustomLabel fontFamily="poppinsMedium">
              {company?.subscriber} collectors
            </CustomLabel>
            <View style={styles.dot} />
            <CustomLabel fontFamily="poppinsMedium">
              {company?.productsQuantity} products
            </CustomLabel>
          </View>
        </View>
      </View>

      {/* Description and Save Button */}
      <View style={styles.descriptionContainer}>
        <View style={styles.description}>
          <CustomLabel fontSize={10}>
            {showFullDescription
              ? descriptionText
              : descriptionText.slice(0, 100) + "..."}
          </CustomLabel>
          <Pressable onPress={handleShowMore}>
            {descriptionText.length > 100 && (
              <CustomLabel style={styles.showMore}>
                {showFullDescription ? "Show less" : "Show more"}
              </CustomLabel>
            )}
          </Pressable>
        </View>
        <CustomButton
          title={isSaved ? "Unfollow" : "Follow"}
          width={width * 0.85}
          onPress={handleSavePress}
          textColor={isSaved ? "#888888" : "#fff"}
          backgroundColor={isSaved ? colors.veryLightGray : "black"}
          borderRadius={100}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  backgroundImage: {
    height: height * 0.2,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
  },
  store: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  imageContainer: {
    height: width * 0.25,
    width: width * 0.25,
    borderRadius: 100,
    overflow: "hidden",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  collectors: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  descriptionContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  description: {
    paddingBottom: 10,
    width: "100%",
  },
  showMore: {
    color: colors.primary,
    marginTop: 5,
  },
});

export default StoreStore;
