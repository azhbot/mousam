import { View, StyleSheet } from "react-native";
import CustomLabel from "../../../components/label";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import Icon from "../../../components/icon";
import { useMemo, useState } from "react";
import { calculateAverageRating } from "../../../utils/calculateAverageRating";
import ProductDetailsRatingModal from "./productDetailsRatingModal";

const ProductDetailsReviews = ({ reviews }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  // Calculate average rating using useMemo

  const averageRating = useMemo(
    () => calculateAverageRating(reviews),
    [reviews]
  );

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => {
      let iconName = "star-border";
      if (i < Math.floor(averageRating)) {
        iconName = "star";
      } else if (averageRating - i >= 0.5) {
        iconName = "star-half";
      }
      return (
        <Icon
          color={colors.tertiary}
          name={iconName}
          library="MaterialIcons"
          key={i}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
          Rating & Reviews
        </CustomLabel>
        <CustomButton
          onPress={() => setShowRatingModal(true)}
          backgroundColor={colors.tertiary}
          textColor="#fff"
          title="Rate Product"
          height={40}
        />
      </View>

      <View style={styles.ratingContainer}>
        <View style={styles.ratings}>{renderStars()}</View>
        <CustomLabel fontFamily="poppinsRegular" fontSize={12}>
          {reviews?.length > 0
            ? `${averageRating.toFixed(1)} average · ${reviews.length} reviews`
            : "No reviews yet"}
        </CustomLabel>
      </View>

      <CustomLabel fontFamily="poppinsRegular" fontSize={12}>
        Client's review summary
      </CustomLabel>
      <ProductDetailsRatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProductDetailsReviews;
