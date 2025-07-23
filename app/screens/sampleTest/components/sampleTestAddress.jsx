import { View, StyleSheet, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAddress } from "../../../redux/address/addressSelector";

const SampleTestAddress = () => {
  const navigation = useNavigation();
  const { addresses, selectedAddressId } = useSelector(selectAddress);

  const currentAddress = addresses.find(
    (address) => address.id === selectedAddressId
  );

  // useEffect(() => {
  //   console.log(currentAddress, "in cart address");
  // }, [currentAddress]);

  const getFormattedAddress = (address) => {
    if (!address) return "No address available";
    const text = [
      address.name,
      address.villageOrTown,
      address.postOffice,
      address.policeStation,
      address.district,
      address.state,
      address.country,
    ]
      .filter((item) => item?.trim())
      .join(", ");
    return text;
  };

  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="interMedium" fontSize={16}>
        Deliver To
      </CustomLabel>
      <View style={styles.addressContainer}>
        {!currentAddress ? (
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
              <View style={{ width: "80%" }}>
                <CustomLabel fontSize={12} numberOfLines={1}>
                  {getFormattedAddress(currentAddress)}{" "}
                  <CustomLabel fontSize={12} fontFamily="interBold">
                    {" " + currentAddress?.pin || "N/A"}
                  </CustomLabel>
                </CustomLabel>
              </View>
            </View>
            <View style={styles.bottom}>
              <View style={styles.phone}>
                <CustomLabel fontSize={12}>
                  Phone : {currentAddress?.phone || "N/A"}
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
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10,
    // paddingBottom: 0,
    borderRadius: 5,
    marginTop: 6,
  },
  address: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
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
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 5,
  },
});

export default SampleTestAddress;
