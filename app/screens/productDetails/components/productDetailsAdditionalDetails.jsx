import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useState } from "react";

const ProductDetailsAdditionalDetails = ({ additionalDetails }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll
    ? additionalDetails
    : additionalDetails?.slice(0, 2);

  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
        Additional Product Details
      </CustomLabel>

      <View style={styles.additionalDetails}>
        {displayedItems?.map((item, index) => (
          <View style={styles.boxContainer} key={index.toString()}>
            <View style={styles.boxOne}>
              <CustomLabel fontFamily="poppinsMedium">
                {index + 1}. {item}
              </CustomLabel>
            </View>
            <View style={styles.boxTwo}>
              <CustomLabel fontFamily="poppinsRegular">
                i am going to school will you come with me today i have a great
                plan after the school you will be surprise to know i am going to
                school will you come with me today i have a great plan after the
                school you will be surprise to know
              </CustomLabel>
            </View>
          </View>
        ))}

        {additionalDetails?.length > 2 && (
          <Pressable
            style={{
              borderColor: colors.LightGray,
            }}
            onPress={() => setShowAll((prev) => !prev)}
          >
            <CustomLabel
              style={{
                color: colors.primary,
                textAlign: "center",
              }}
              fontFamily="poppinsRegular"
            >
              {showAll ? "Show Less" : "Show More..."}
            </CustomLabel>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  additionalDetails: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 8,

    paddingTop: 10,
  },
  boxContainer: {
    // flexDirection: "row",
  },
  boxOne: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  boxTwo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
});

export default ProductDetailsAdditionalDetails;
