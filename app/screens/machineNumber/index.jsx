import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomLebel from "../../components/label";
import Icon from "../../components/icon";
import { colors } from "../../constant/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import FormikWrapper from "../../components/formik";
import FormikInputField from "../../components/formikInput";
import FormikSubmitButton from "../../components/formikSubmitButton";
import profileSchema from "../../validation/profileSchema";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelector";
import { setUser } from "../../redux/user/userSlice";
import machineSchema from "../../validation/machineSchema";
import { showMessage } from "../../utils/customMsgUtil";

const height = Dimensions.get("window").height;

const MachineNumberScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleSumbit = (values) => {
    console.log(values);
    dispatch(setUser({ ...user, ...values }));
    showMessage("updated");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <CustomLebel
            color={colors.primary}
            fontFamily="interMedium"
            fontSize={14}
          >
            MY ACCOUNT
          </CustomLebel>
        </View>
        <View style={styles.headerMiddle}>
          <CustomLebel fontSize={12} fontFamily="interMedium">
            Verified
          </CustomLebel>
          <Icon
            color={colors.tertiary}
            name="verified"
            library="materialIcons"
            size={16}
          />
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={() => navigation.navigate("qr")}>
            <Icon size={26} name="qrcode" />
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FormikWrapper
          initialValues={{ numberOfMachine: user.numberOfMachine }}
          onSubmit={(values) => handleSumbit(values)}
          validationSchema={machineSchema}
        >
          <FormikInputField
            name="numberOfMachine"
            placeholder="No. of Machines"
            keyboardType="numeric"
          />
          <FormikSubmitButton title="Submit" />
        </FormikWrapper>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: colors.LightGray, // Optional improvement
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  headerMiddle: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 10,
    flex: 1,
  },
  inputContainer: {
    paddingTop: height * 0.1,
    padding: 15,
    flex: 1,
    gap: height * 0.2,
  },
});

export default MachineNumberScreen;
