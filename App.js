import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler"

import { store,persistor } from "./app/redux/store"; // adjust if needed
import Index from "./app/index";
import { Toast, toastConfig } from "./app/components/toast/index";
import { PersistGate } from "redux-persist/integration/react";
import CustomMsg from "./app/components/msg";
import { setMessageRef } from "./app/utils/customMsgUtil";
import CustomTheme from "./app/navigation/theme/customTheme";

export default function App() {
  const msgRef = useRef();
  useEffect(() => {
    setMessageRef(msgRef.current);

  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer theme={CustomTheme}>
<PersistGate loading={null} persistor={persistor}>

      <Index />
      </PersistGate > 
      <Toast config={toastConfig} />
      <CustomMsg ref={msgRef} duration={1500} />
      </NavigationContainer>
      
    </Provider>
  );
}
