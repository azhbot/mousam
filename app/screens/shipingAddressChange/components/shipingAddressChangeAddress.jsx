import { View, StyleSheet, Pressable } from "react-native";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const ShipingAddressChangeAddress = ({
  address,
  selectedId,
  setSelectedId,
  onLongPress,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(selectedId, "in shippingAddressChangeAddress");
  }, [selectedId]);

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
      <Pressable
        onPress={() => setSelectedId(address?.id)}
        onLongPress={() => onLongPress(address?.id)}
        style={styles.rowCenter}
      >
        <Icon
          name={
            selectedId === address?.id
              ? "radio-button-checked"
              : "radio-button-unchecked"
          }
          library="materialIcons"
        />
        <View style={styles.address}>
          <CustomLabel numberOfLines={2}>
            {getFormattedAddress(address)}

            <CustomLabel fontFamily="poppinsMedium">
              {" "}
              {address?.pin ? ` ${address.pin}` : " N/A"}
            </CustomLabel>
          </CustomLabel>
        </View>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("shipingAddressInput", { id: address.id })
        }
        style={styles.viewAddress}
      >
        <Icon name="chevron-right" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12, // content-based height with padding
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    marginHorizontal: 10,
    marginBottom: 10, // spacing between items
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenter: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 15,
  },
  viewAddress: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ShipingAddressChangeAddress;
