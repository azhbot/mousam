import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { TabNavigator } from "./tabNavigator";
import Icon from "../components/icon";
import CustomLabel from "../components/label";
import CustomLine from "../components/line";
import { colors } from "../constant/colors";
import CustomImage from "../components/image";
import { images } from "../constant/images";

const Drawer = createDrawerNavigator();

// ♻️ Reusable Drawer Button Component
const DrawerButton = ({ title, icon, onPress, library = null }) => (
  <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
    <Icon name={icon} library={library} size={24} color="#333" />
    <CustomLabel fontFamily="interMedium">{title}</CustomLabel>
  </TouchableOpacity>
);

// 🔹 Drawer Menu Items
const drawerItems = [
  { title: "MOUSAAM", icon: "home", screen: "MOUSAAM" },
  { title: "Random", icon: "shuffle" },
  { title: "MOUSAM PLUS", icon: "plus-outline" },
  { title: "ALL CATEGORY", icon: "apps" },
  { title: "SELECT LANGUAGE", icon: "language", library: "materialIcons" },
  { title: "FONT SIZE", icon: "format-font" },
  { title: "THEME", icon: "theme-light-dark" },
  { title: "ADS ON MOUSAM", icon: "google-ads" },
  { title: "NOTIFICATION PRE", icon: "notifications-none", library: "materialIcons" },
  { title: "SHARE OUR APP", icon: "share-variant-outline" },
  { title: "HELP CENTER", icon: "help-circle-outline" },

];

const contentHeight=Dimensions.get("window").height

// 🔹 Custom Drawer Content
const CustomDrawerContent = ({ navigation }) => (
  <View style={styles.drawerContainer} >
    {/* Drawer Header */}
    <View style={styles.header}>
      <CustomLabel color="#fff" fontFamily="poppinsBold" fontSize={18}>MOUSAM POINT</CustomLabel>
      <CustomImage source={images.mousam} size={60}/>
    </View>

    {/* Drawer Items Rendered Dynamically */}
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:contentHeight-70}}>
      {drawerItems.map(({ title, icon, screen, library }) => (
      <View key={title}>
      <DrawerButton 
        key={title} 
        title={title} 
        icon={icon} 
        library={library} 
        onPress={() => screen ? navigation.navigate(screen) : console.log(`${title} Clicked`)} 
      /> 
      <CustomLine color={colors.LightGray}/>
      </View>
    ))}
</ScrollView>
  </View>
);

// 🔹 Drawer Navigator
export const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false, drawerStyle: { width: "70%",overflow:"hidden" } }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="MOUSAAM" component={TabNavigator} />
  </Drawer.Navigator>
);

// 🔹 Styles
const styles = StyleSheet.create({
  drawerContainer: {flex:1},
  header: {
    paddingTop:60,
    height: 120,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "#000",
    padding:15
  },
  drawerItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",

    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});

