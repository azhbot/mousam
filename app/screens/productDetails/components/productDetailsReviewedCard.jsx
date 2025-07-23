import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import CustomLabel from "../../../components/label";
import CustomImage from "../../../components/image";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import ImagePreview from "../../../components/imagePreview";
import { images } from "../../../constant/images";

const ProductDetailsReviewCard = ({ reviews }) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleSelectedReview = (review) => {
    if (review?.id === selectedReview?.id) {
      console.log("okkkk");
      setSelectedReview(null);
    } else {
      setSelectedReview(review);
    }
  };

  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
        Photos
      </CustomLabel>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {reviews?.map((review, index) => (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => handleSelectedReview(review)}
          >
            <CustomImage source={review.image} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedReview && (
        <View style={styles.reviewCard}>
          <CustomLabel ffontFamily="poppinsMedium" fontSize={16}>
            {selectedReview.userName || "Reviewer Name"}
          </CustomLabel>

          <View style={styles.ratingsContainer}>
            <Pressable
              onPress={() => setShowImagePreview(true)}
              style={styles.uploadPhoto}
            >
              <CustomImage source={selectedReview?.image} />
            </Pressable>
            <View style={styles.ratings}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  color={colors.tertiary}
                  name={
                    i < Math.floor(selectedReview?.rating)
                      ? "star"
                      : selectedReview?.rating - i >= 0.5
                      ? "star-half"
                      : "star-border"
                  }
                  library="MaterialIcons"
                  size={20}
                />
              ))}

              <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
                {selectedReview?.rating}
              </CustomLabel>
            </View>
          </View>

          <View style={styles.reviews}>
            <CustomLabel fontFamily="poppinsRegular">
              Comment: {selectedReview?.text}
            </CustomLabel>
          </View>
        </View>
      )}
      <ImagePreview
        visible={showImagePreview}
        source={selectedReview?.image}
        onClose={() => setShowImagePreview(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
    marginTop: 10,
  },

  thumbnail: {
    height: 60,
    width: 60,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.LightGray,
  },
  reviewCard: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    padding: 10,
  },
  ratingsContainer: {
    flexDirection: "row",

    marginTop: 10,
    gap: 10,
  },
  uploadPhoto: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.LightGray,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  ratings: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  reviews: {
    marginTop: 10,
  },
});

export default ProductDetailsReviewCard;
