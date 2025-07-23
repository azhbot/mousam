import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAddress } from "../../../redux/address/addressSelector";
import { useEffect } from "react";

const XaddProductAddress = () => {
  const navigation = useNavigation();
  const { addresses, selectedAddressId, selectedAddress } =
    useSelector(selectAddress);

  // Uncomment for debugging:
  // useEffect(() => {
  //   console.log("Selected Address in Cart:", selectedAddress);
  // }, [selectedAddress]);

  const getFormattedAddress = (address) => {
    if (!address) return "No address available";
    const text = [
      address.name,
      address.village,
      address.post,
      address.policeStation,
      address.district,
      address.state,
      address.country,
    ]
      .filter((item) => item?.trim())
      .join(", ");
    return text.length > 25 ? text.slice(0, 25) + "..." : text;
  };

  return (
    <View style={styles.container}>
      <CustomLabel fontSize={16}>Form</CustomLabel>
      <View style={styles.addressContainer}>
        {!selectedAddress ? (
          <View style={styles.bottom}>
            <CustomLabel fontSize={12} color="red">
              No delivery address selected.
            </CustomLabel>
            <Pressable
              onPress={() => navigation.navigate("shipingAddressChange")}
            >
              <CustomLabel fontSize={12} style={styles.button}>
                + add...
              </CustomLabel>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.address}>
              <CustomLabel fontSize={12}>
                {getFormattedAddress(selectedAddress)}
              </CustomLabel>
              <CustomLabel fontSize={12} fontFamily="poppinsMedium">
                {selectedAddress?.pin ? ` ${selectedAddress.pin}` : " N/A"}
              </CustomLabel>
            </View>
            <View style={styles.bottom}>
              <View style={styles.phone}>
                <CustomLabel fontSize={12}>
                  Phone : {selectedAddress?.phone || "N/A"}
                </CustomLabel>
                <Icon name="phone" library="feather" size={12} />
              </View>
              <Pressable onPress={() => navigation.navigate("xaddressChange")}>
                <CustomLabel fontSize={12} style={styles.button}>
                  Change...
                </CustomLabel>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 60,
  },
  addressContainer: {
    gap: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  address: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  phone: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 5,
  },
});

export default XaddProductAddress;
