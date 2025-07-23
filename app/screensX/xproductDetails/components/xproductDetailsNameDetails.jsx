import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useMemo, useState } from "react";
import { calculateAverageRating } from "../../../utils/calculateAverageRating";
import CommentModal from "../../../components/comment";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/user/userSelector";
import { addComment } from "../../../redux/product/productSlice";
import { showMessage } from "../../../utils/customMsgUtil";

const XproductDetailsNameDetails = ({ productDetail }) => {
  const dispatch = useDispatch();
  const [commentVisible, setCommentVisible] = useState(false);

  const user = useSelector(selectUser);

  const averageRating = useMemo(
    () => calculateAverageRating(productDetail?.reviews),
    [productDetail?.reviews]
  );

  const handleCommentSubmit = (text) => {
    const productId = productDetail?.id;
    const comment = {
      userName: user?.name,
      text,
    };
    dispatch(addComment({ comment, productId }));
    console.log("sent");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>
        <CustomLabel fontFamily="poppinsBold" fontSize={20}>
          {productDetail?.name ? productDetail?.name : "Product Name"}
        </CustomLabel>
        <CustomLabel>36d deg View</CustomLabel>
      </View>

      <View style={styles.containerTwo}>
        <View style={styles.rating}>
          <CustomLabel fontFamily="poppinsBold" fontSize={16}>
            {averageRating > 0 ? averageRating.toFixed(1) : "No Ratings"}{" "}
            {/* Display dynamic rating */}
          </CustomLabel>
          <Icon color={colors.lightYellow} name="star" library="fontAwesome" />
        </View>
        <CustomLabel fontFamily="poppinsMedium">
          {productDetail?.reviews?.length > 0
            ? (averageRating * productDetail?.reviews.length).toFixed(0) +
              " rating"
            : "No ratings"}
        </CustomLabel>
        <Pressable
          onPress={() => setCommentVisible(true)}
          style={styles.comment}
        >
          <Icon name="commenting" library="fontAwesome" />
        </Pressable>
      </View>
      <CommentModal
        comments={productDetail?.comments}
        visible={commentVisible}
        onClose={() => {
          setCommentVisible(false);
        }}
        onSubmit={handleCommentSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 10,
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerTwo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  comment: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default XproductDetailsNameDetails;
