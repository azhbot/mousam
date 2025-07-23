import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useSelector } from "react-redux";
import { selectAddress } from "../../../redux/address/addressSelector";
import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";

const ProductDetailsAddress = () => {
  const navigation = useNavigation();
  const { addresses, selectedAddressId } = useSelector(selectAddress);

  const currentAddress = useMemo(() => {
    return addresses.find((address) => address.id === selectedAddressId);
  }, [addresses, selectedAddressId]);

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
      <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
        Deliver To
      </CustomLabel>

      <View style={styles.addressContainer}>
        {!currentAddress ? (
          <View style={styles.rowBetween}>
            <CustomLabel fontFamily="poppinsRegular" fontSize={12} color="red">
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
          <View style={styles.fullWidth}>
            <View style={styles.address}>
              <CustomLabel fontSize={12}>
                {getFormattedAddress(currentAddress)}
              </CustomLabel>
              <CustomLabel fontSize={12} fontFamily="poppinsMedium">
                {currentAddress.pin || "N/A"}
              </CustomLabel>
            </View>

            <View style={styles.rowBetween}>
              <View style={styles.phone}>
                <CustomLabel fontSize={12}>
                  Phone : {currentAddress.phone || "N/A"}
                </CustomLabel>
                <Icon name="phone" library="feather" size={12} />
              </View>
              <Pressable
                onPress={() => navigation.navigate("shipingAddressChange")}
              >
                <CustomLabel fontSize={12} style={styles.button}>
                  Change...
                </CustomLabel>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10,
    borderRadius: 5,

    flexDirection: "column",
    justifyContent: "center",
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  phone: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 5,
  },
  fullWidth: {
    width: "100%",
  },
});

export default ProductDetailsAddress;
