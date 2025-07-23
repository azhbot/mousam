import { View, StyleSheet, Pressable, Keyboard } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useEffect, useMemo, useState } from "react";
import { calculateAverageRating } from "../../../utils/calculateAverageRating";
import CommentModal from "../../../components/comment";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/user/userSelector";
import { addComment } from "../../../redux/product/productSlice";
import { showMessage } from "../../../utils/customMsgUtil";
import { formatNumber } from "../../../utils/formatNumberUtil";

const ProductDetailsNameDetails = ({ productDetail, isShowComment = true }) => {
  const dispatch = useDispatch();
  const [commentVisible, setCommentVisible] = useState(false);

  const user = useSelector(selectUser);

  const averageRating = useMemo(
    () => calculateAverageRating(productDetail?.reviews),
    [productDetail?.reviews]
  );

  useEffect(() => {
    console.log("changed in productDetailsnamedetails");
    Keyboard.dismiss();
  }, [productDetail?.comments]);

  const handleCommentSubmit = (text) => {
    const productId = productDetail?.id;
    const date = new Date();
    const comment = {
      userName: user?.name,
      text,
      createdAt: date.toDateString(),
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
        <CustomLabel>360° View</CustomLabel>
      </View>

      <View style={styles.containerTwo}>
        <View style={styles.rating}>
          <CustomLabel fontFamily="poppinsBold" fontSize={16}>
            {averageRating > 0 ? averageRating.toFixed(1) : "No Ratings"}{" "}
            {/* Display dynamic rating */}
          </CustomLabel>
          {/* <Icon
            color={colors.lightYellow}
            name="star"
            library="fontAwesome"
            size={20}
          /> */}
          <CustomLabel fontFamily="poppinsMedium" color={colors.tertiary}>
            Stars
          </CustomLabel>
          <CustomLabel fontFamily="poppinsMedium">{"\u2022"}</CustomLabel>
          <CustomLabel fontFamily="poppinsMedium">
            {productDetail?.reviews?.length > 0
              ? (averageRating * productDetail?.reviews.length).toFixed(0) +
                " rating"
              : "No ratings"}
          </CustomLabel>
        </View>
        {isShowComment && (
          <Pressable
            onPress={() => setCommentVisible(true)}
            style={styles.comment}
          >
            <Icon name="commenting" library="fontAwesome" />
            <CustomLabel>
              {formatNumber(productDetail?.comments.length)}
            </CustomLabel>
          </Pressable>
        )}
      </View>
      <CommentModal
        comments={productDetail?.comments}
        visible={commentVisible}
        onClose={() => {
          setCommentVisible(false);
        }}
        onPost={handleCommentSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerTwo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // bottom: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    bottom: 10,
    gap: 5,
  },
  comment: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
    // right: 10,
    bottom: 20,
    // right: 60,
  },
});

export default ProductDetailsNameDetails;
