import { View, StyleSheet, ActivityIndicator } from "react-native";
import FavouriteHeader from "./components/favouriteHeader";
import CustomButton from "../../components/button";
import CustomLabel from "../../components/label";
import { colors } from "../../constant/colors";
import FavouriteOptions from "./components/favouriteOptions";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavouriteItems } from "../../redux/favourites/favouriteThunks";
import FavouriteItemCards from "./components/favouriteItemCards";
import { selectFavourites } from "../../redux/favourites/favouriteSelector";

const FavouriteScreen = ({ route }) => {
  const navigation = useNavigation();
  const [currentOption, setCurrentOption] = useState("FAVOURITES");

  const routeTag = route?.params?.tag;

  const dispatch = useDispatch();
  const { favouriteItems, loading } = useSelector(selectFavourites);

  useEffect(() => {
    if (routeTag === "shared") {
      setCurrentOption("SHARED");
      console.log("shared seted");
    }
    dispatch(fetchFavouriteItems());
  }, [routeTag]);

  const handleArrowPress = () => {
    navigation.goBack();
  };

  const handleOptionPress = (option) => {
    setCurrentOption(option);
  };

  const handleLoadMore = () => {
    if (!loading) {
      dispatch(fetchFavouriteItems());
    }
  };

  const showItems = favouriteItems.length > 0;

  const renderEmptyState = () => (
    <SafeAreaView style={styles.container}>
      <CustomLabel color={colors.LightGray} fontFamily="interBold">
        {currentOption === "FAVOURITES"
          ? "No products in your favourites"
          : "No products shared"}
      </CustomLabel>
      <CustomButton
        title="View Products"
        backgroundColor={colors.tertiary}
        fontFamily="inter"
        fontWeight="bold"
        onPress={() => navigation.navigate("products")}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FavouriteHeader handleArrowPress={handleArrowPress} />

      <FavouriteOptions
        currentOption={currentOption}
        handleOptionPress={handleOptionPress}
      />

      {!showItems && renderEmptyState()}

      {showItems && currentOption === "FAVOURITES" && (
        <FavouriteItemCards
          favouriteItems={favouriteItems}
          handleLoadMore={handleLoadMore}
          loading={loading}
        />
      )}

      {showItems && currentOption === "SHARED" && (
        <View style={styles.container}>
          <CustomLabel color={colors.LightGray} fontFamily="interBold">
            Shared items will be shown here.
          </CustomLabel>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default FavouriteScreen;
