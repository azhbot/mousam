import { Modal, StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { fonts } from "./constant/fonts";
import { HomeNavigator } from "./navigation/stackNavigator.js";
import { selectUser } from "./redux/user/userSelector.js";
import LoginPopup from "./components/loginPopup/index.jsx";
import HomeScreen from "./screens/home/index.jsx";
import TestScreen from "./screens/test/index.jsx";
import HistoryScreen from "./screens/history/index.jsx";
import XaddProductScreen from "./screensX/xaddProduct/index.jsx";
import XaddressChangeScreen from "./screensX/xaddressChange/index.jsx";

const Index = () => {
  const [loaded, error] = useFonts(fonts);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ flex: 1 }}>
          {/* <XaddProductScreen /> */}
          <HomeNavigator />
          {/* <XpassPIN /> */}
          {/* <XaddressChangeScreen /> */}
          {/* <TestScreen /> */}
          {/* <HistoryScreen /> */}
          {/* <TestScreen/> */}
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Index;
