import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CustomLabel from "../../components/label";

import Icon from "../../components/icon";
import { colors } from "../../constant/colors";
import CustomButton from "../../components/button";
import {
  removeAddress,
  setSelectedAddressId,
} from "../../redux/address/addressSlice";
import ConfirmationMsg from "../../components/confirmation";
import { showMessage } from "../../utils/customMsgUtil";
import { selectAddress } from "../../redux/address/addressSelector";
import XaddressChangeHeader from "./components/xaddressChangeHeader";
import XaddressChangeAddress from "./components/xaddressChangeAddress";

const XaddressChangeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { addresses: addressList, selectedAddressId } =
    useSelector(selectAddress);

  const [selectedId, setSelectedId] = useState(null);
  const [removalId, setRemovalId] = useState(null);

  useEffect(() => {}, [removalId]);

  useEffect(() => {
    if (selectedAddressId) {
      setSelectedId(selectedAddressId);
    }
  }, [selectedAddressId]);

  const handleSave = () => {
    if (selectedAddressId) {
      dispatch(setSelectedAddressId(selectedId));
    }
    navigation.goBack();
  };

  const handleRemove = (id) => {
    console.log(id, "in shipingaddress");
    dispatch(removeAddress(removalId));
    showMessage("Removed Successfully");
    setRemovalId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <XaddressChangeHeader /> */}

      <FlatList
        data={addressList}
        keyExtractor={(address) => address.id}
        ListHeaderComponent={
          <View style={styles.title}>
            <CustomLabel fontFamily="interMedium">Menu </CustomLabel>
            <Icon name="chevron-right" />
            <CustomLabel fontFamily="interMedium">
              {" "}
              Shipping Address
            </CustomLabel>
          </View>
        }
        renderItem={({ item }) => (
          <XaddressChangeAddress
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            address={item}
            onLongPress={(id) => setRemovalId(id)}
          />
        )}
        ListFooterComponent={
          <Pressable
            onPress={() => navigation.navigate("xaddressInput")}
            style={styles.addButton}
          >
            <Icon name="plus" library="materialIcon" />
            <CustomLabel>Add New</CustomLabel>
          </Pressable>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Only Save button fixed at bottom */}
      <View style={styles.fixedSaveButton}>
        <CustomButton
          onPress={handleSave}
          title="Save"
          backgroundColor={colors.primary}
          height={44}
          borderRadius={100}
        />
      </View>
      <ConfirmationMsg
        title="Delete"
        msg="Do you want to delete?"
        visible={removalId && true}
        onConfirm={handleRemove}
        onclose={() => setRemovalId(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    padding: 15,
    flexDirection: "row",
  },
  addButton: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  fixedSaveButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: "#fff",
    paddingBottom: 40,

    borderTopColor: colors.LightGray,
  },
});

export default XaddressChangeScreen;
