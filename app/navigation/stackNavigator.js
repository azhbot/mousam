import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductDetailsScreen from "../screens/productDetails";
import FavouriteScreen from "../screens/favourite";
import CartScreen from "../screens/cart";
import PaymentScreen from "../screens/payment";
import OrderSummaryScreen from "../screens/orderSummary";
import SampleTestScreen from "../screens/sampleTest";
import ProductsScreen from "../screens/products";
import SavedListScreen from "../screens/savedList";
import CompanyScreen from "../screens/store";
import ProfileScreen from "../screens/profile";
import VerifyAccountScreen from "../screens/verifyAccount";
import ShipingAddressInputScreen from "../screens/shipingAddressInput";
import ShipingAddressChangeScreen from "../screens/shipingAddressChange";
import SampleTestSummaryScreen from "../screens/sampleTestSummary";
import ShipingScreen from "../screens/shiping";
import XhomeScreen from "../screensX/xhome";
import XhomeCreateScreen from "../screensX/xhomeCreate";
import XregistrationScreen from "../screensX/xregistration";
import XregistrationPasswordScreen from "../screensX/xregistrationPassword";
import XregistrationFinalScreen from "../screensX/xregistrationFinal";
import XproductDetailsScreen from "../screensX/xproductDetails";
import XaddProductScreen from "../screensX/xaddProduct";
import XmenuScreen from "../screensX/xmenu";
import XofficeScreen from "../screensX/xoffice";
import XorderVerifiedListScreen from "../screensX/xorderVerifiedList";
import XorderPrintListScreen from "../screensX/xorderPrintList";
import XpaymentListScreen from "../screensX/xpaymentList";
import XnewSampleTestListScreen from "../screensX/xnewSampleTestList.jsx";
import XnewOrderListScreen from "../screensX/xnewOrderList";
import { DrawerNavigator } from "./drawerNavigator.js";
import CancelScreen from "../screens/cancel/index.jsx";
import XordersScreen from "../screensX/xorders/index.jsx";
import XsampleVerifiedListScreen from "../screensX/xsampleVerifiedList/index.jsx";
import XsamplePrintListScreen from "../screensX/xsamplePrintList/index.jsx";
import QrScreen from "../screens/qr/index.jsx";
import SearchScreen from "../screens/search/index.jsx";
import SignupScreen from "../screens/auth/signup.jsx";
import MachineNumberScreen from "../screens/machineNumber/index.jsx";
import SigninScreen from "../screens/auth/signin.jsx";
import HomeScreen from "../screens/home/index.jsx";
import DoneScreen from "../screens/done/index.jsx";
import TestScreen from "../screens/test/index.jsx";
import HistoryScreen from "../screens/history/index.jsx";
import XaddressInputScreen from "../screensX/xaddressInput/index.jsx";
import XaddressChangeScreen from "../screensX/xaddressChange/index.jsx";
import OrderInvoiceScreen from "../screens/orderInvoice/index.jsx";
import SampleInvoiceScreen from "../screens/sampleInvoice/index.jsx";
import XpassPINScreen from "../screensX/xpassPIN/index.jsx";
import XpassPINCreateScreen from "../screensX/xpassPINCreate/index.jsx";
import WaitingScreen from "../screens/waiting/index.jsx";
import XreturnedAndCancelledScreen from "../screensX/xreturnedAndCancelled/index.jsx";
import XtotalSamplesScreen from "../screensX/xtotalSamples/index.jsx";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="signup" component={SignupScreen} />
    <Stack.Screen name="signin" component={SigninScreen} />
  </Stack.Navigator>
);

export const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="drawer" component={DrawerNavigator} />
    <Stack.Screen name="test" component={TestScreen} />
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="search" component={SearchScreen} />
    <Stack.Screen name="qr" component={QrScreen} />
    <Stack.Screen name="productDetails" component={ProductDetailsScreen} />
    <Stack.Screen name="favourite" component={FavouriteScreen} />
    <Stack.Screen name="cart" component={CartScreen} />
    <Stack.Screen name="payment" component={PaymentScreen} />
    <Stack.Screen name="orderSummary" component={OrderSummaryScreen} />

    <Stack.Screen name="history" component={HistoryScreen} />
    <Stack.Screen name="cancel" component={CancelScreen} />
    <Stack.Screen name="sampleTest" component={SampleTestScreen} />
    <Stack.Screen name="products" component={ProductsScreen} />
    <Stack.Screen name="savedList" component={SavedListScreen} />
    <Stack.Screen name="company" component={CompanyScreen} />
    <Stack.Screen name="profile" component={ProfileScreen} />
    <Stack.Screen name="verifyAccount" component={VerifyAccountScreen} />
    <Stack.Screen
      name="shipingAddressInput"
      component={ShipingAddressInputScreen}
    />
    <Stack.Screen
      name="shipingAddressChange"
      component={ShipingAddressChangeScreen}
    />
    <Stack.Screen
      name="sampleTestSummary"
      component={SampleTestSummaryScreen}
    />
    <Stack.Screen name="sampleInvoice" component={SampleInvoiceScreen} />
    <Stack.Screen name="orderInvoice" component={OrderInvoiceScreen} />
    <Stack.Screen name="shiping" component={ShipingScreen} />
    <Stack.Screen name="machineNumber" component={MachineNumberScreen} />
    <Stack.Screen name="done" component={DoneScreen} />
    <Stack.Screen name="waiting" component={WaitingScreen} />
    <Stack.Screen name="xhome" component={XhomeScreen} />
    <Stack.Screen name="xhomeCreate" component={XhomeCreateScreen} />
    <Stack.Screen name="xregistration" component={XregistrationScreen} />
    <Stack.Screen
      name="xregistrationPassword"
      component={XregistrationPasswordScreen}
    />
    <Stack.Screen
      name="xregistrationFinal"
      component={XregistrationFinalScreen}
    />
    <Stack.Screen name="xproductDetails" component={XproductDetailsScreen} />
    <Stack.Screen name="xaddProduct" component={XaddProductScreen} />
    <Stack.Screen name="xeditProduct" component={XaddProductScreen} />
    <Stack.Screen name="xmenu" component={XmenuScreen} />
    <Stack.Screen name="xorders" component={XordersScreen} />
    <Stack.Screen name="xoffice" component={XofficeScreen} />
    <Stack.Screen
      name="xorderVerifiedList"
      component={XorderVerifiedListScreen}
    />
    <Stack.Screen name="xorderPrintList" component={XorderPrintListScreen} />
    <Stack.Screen
      name="xsampleVerifiedList"
      component={XsampleVerifiedListScreen}
    />
    <Stack.Screen
      name="xreturnedAndCancelled"
      component={XreturnedAndCancelledScreen}
    />
    <Stack.Screen name="xsamplePrintList" component={XsamplePrintListScreen} />
    <Stack.Screen name="xtotalSamples" component={XtotalSamplesScreen} />
    <Stack.Screen name="xpaymentList" component={XpaymentListScreen} />
    <Stack.Screen
      name="xnewSampleTestList"
      component={XnewSampleTestListScreen}
    />
    <Stack.Screen name="xnewOrderList" component={XnewOrderListScreen} />
    <Stack.Screen name="xaddressInput" component={XaddressInputScreen} />
    <Stack.Screen name="xaddressChange" component={XaddressChangeScreen} />
    <Stack.Screen name="xpassPIN" component={XpassPINScreen} />
    <Stack.Screen name="xpassPINCreate" component={XpassPINCreateScreen} />
  </Stack.Navigator>
);
