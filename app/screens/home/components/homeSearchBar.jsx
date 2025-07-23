import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../../components/icon";

const HomeSearchBar = () => {
  const navigation = useNavigation();

  const onPressSearch = () => navigation.navigate("search");
  const onPressMic = () => navigation.navigate("search", { openMic: true });
  const onPressCamera = () =>
    navigation.navigate("search", { openCamera: true });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressSearch}
        style={styles.searchPlaceholder}
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Icon name="search" library="feather" />
      </Pressable>

      <Pressable
        onPress={onPressMic}
        style={styles.icon}
        accessibilityRole="button"
        accessibilityLabel="Voice search"
      >
        <Icon name="mic" library="feather" />
      </Pressable>

      <Pressable
        onPress={onPressCamera}
        style={styles.icon}
        accessibilityRole="button"
        accessibilityLabel="Camera search"
      >
        <Icon name="camera" library="feather" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchPlaceholder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    padding: 10,
  },
});

export default HomeSearchBar;
