import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home";
import Icon from "../components/icon";
import { icons } from "../constant/icons";
import SavedScreen from "../screens/saved";
import AccountScreen from "../screens/account";
import CategoryScreen from "../screens/category";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSelector";

import XhomeCreateScreen from "../screensX/xhomeCreate";
import XpassPINScreen from "../screensX/xpassPIN";
import XhomeCreatePasswordScreen from "../screensX/xhomeCreate/xhomeCreatePasswordScreen";
import XhomeScreen from "../screensX/xhome";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const user = useSelector(selectUser);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        animation: "fade",
      }}
      initialRouteName="home" // Set Home tab as default when app opens
      backBehavior="initialRoute"
    >
      <Tab.Screen
        name="xpass"
        // children={() => {
        //   if (!user) return <XhomeCreateScreen />;
        //   else if (!user.userPIN) return <XhomeCreatePasswordScreen />;
        //   else return <XpassPINScreen />;
        // }}
        component={XhomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size} source={focused ? icons.plusBlack : icons.plus} />
          ),
        }}
      />

      <Tab.Screen
        name="category"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size} source={focused ? icons.appsBlack : icons.apps} />
          ),
        }}
      />
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size} source={focused ? icons.homeBlack : icons.home} />
          ),
        }}
      />
      <Tab.Screen
        name="saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size} source={focused ? icons.saveBlack : icons.save} />
          ),
        }}
      />
      <Tab.Screen
        name="accountr"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Icon size={size} source={focused ? icons.userBlack : icons.user} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
