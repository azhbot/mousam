import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  InteractionManager,
  ActivityIndicator,
  Button,
  Dimensions,
} from "react-native";
import { colors } from "../../constant/colors";

import HomeHeader from "./components/homeHeader";
import HomeSearchBar from "./components/homeSearchBar";
import HomeBanner from "./components/homeBanner";
import HomeCategories from "./components/homeCategories";
import HomeSmallBanner from "./components/homeSmallBanner";
import HomeItemCards from "./components/homeItemCards";
import HomeBackgroundItemCards from "./components/homeBackgroundItemCards";
import HomeSmallItemCards from "./components/homeSmallItemCards";
import HomeSpecialItemCards from "./components/homeSpecialItemCards";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const components = [
    {
      id: "smallBanner1",
      component: (
        <View style={{ marginTop: 15 }}>
          <HomeSmallBanner />
        </View>
      ),
    },
    { id: "smallItemCards", component: <HomeSmallItemCards /> },
    { id: "smallBanner2", component: <HomeSmallBanner /> },
    { id: "backgroundItemCards", component: <HomeBackgroundItemCards /> },
    { id: "smallBanner3", component: <HomeSmallBanner /> },
    { id: "itemCards", component: <HomeItemCards /> },
    { id: "empty", component: <View style={{ height: 20 }} /> },
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader />
      {/* <Button title="test" onPress={() => navigation.navigate("test")} /> */}

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <HomeSearchBar />
        </View>

        <FlatList
          data={components}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <HomeBanner />
              <HomeCategories />
              <HomeSpecialItemCards />
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.componentWrapper}>{item.component}</View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: colors.secondary,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  headerContainer: {
    backgroundColor: colors.secondary,
  },
  componentWrapper: {
    paddingHorizontal: 0,
  },
});

export default HomeScreen;
