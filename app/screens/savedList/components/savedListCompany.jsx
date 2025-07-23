import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";
import CustomImage from "../../../components/image";
import { useNavigation } from "@react-navigation/native";
import useCompanyActions from "../../../hooks/useCompanyActions";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.3;

const SavedListCompany = ({ company, setLoading }) => {
  const navigation = useNavigation();

  const { handleCompanySave, isSaved } = useCompanyActions(company);

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(isSaved);
  }, []);

  const handlePress = () => {
    setFollowed((prev) => !prev);

    handleCompanySave(company); // Perform the save/unsave action
  };

  return (
    <View style={styles.store}>
      <View style={styles.storeLeft}>
        <Pressable
          onPress={() =>
            navigation.navigate("company", { companyId: company.id })
          }
          style={styles.imageContainer}
        >
          <CustomImage source={company?.logo} size={width * 0.16} />
        </Pressable>
        <View style={styles.nameContainer}>
          <CustomLabel>{company?.name}</CustomLabel>
          <Icon
            color={colors.tertiary}
            name="verified"
            library="materialIcons"
            size={16}
          />
        </View>
      </View>
      {/* <CustomButton
        title={isSaved ? "Unfollow" : "Follow"}
        width={buttonWidth}
        backgroundColor={isSaved ? colors.veryLightGray : colors.primary}
        textColor={isSaved ? "#888888" : "#fff"}
        onPress={handlePress}
        borderRadius={100}
      /> */}
      <CustomButton
        onPress={handlePress}
        title={followed ? "Unfollow" : "Follow"}
        backgroundColor={followed ? "#fff" : colors.tertiary}
        textColor={followed ? colors.tertiary : "#fff"}
        borderRadius={100}
        width={100}
        height={35}
        opacity={followed ? 0.8 : 1}
        style={{
          borderWidth: followed ? 1.5 : 0,
          borderColor: colors.tertiary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  store: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    paddingHorizontal: 10,
  },
  storeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imageContainer: {
    height: width * 0.18,
    width: width * 0.18,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default SavedListCompany;
