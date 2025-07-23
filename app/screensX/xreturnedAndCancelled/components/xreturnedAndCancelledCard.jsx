import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  InteractionManager,
} from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import CustomLine from "../../../components/line";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import RawMaterials from "../../../components/others/rawMaterials";
import Qrcode from "../../../components/others/qrcode";
import Barcode from "../../../components/others/barCode";
import { formatAddress } from "../../../utils/format/formatAddressUtil";

const { width } = Dimensions.get("window");

const XreturendAndCancelledCard = ({
  index,
  verifiedOrder,
  onPress = () => {},
  onLongPress = () => {},
  isSelected,
}) => {
  const company = {
    name: verifiedOrder?.companyName,
    logo: verifiedOrder?.companyLogo,
  };

  return (
    <Pressable
      onPress={() => {
        console.log("press");
        onPress(verifiedOrder);
      }}
      onLongPress={() => {
        onLongPress(verifiedOrder);
        console.log("long press");
      }}
      style={{ paddingVertical: 6 }}
    >
      {isSelected && (
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        />
      )}
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.topLeft}>
            <CustomLabel fontFamily="poppinsMedium" fontSize={12}>
              {verifiedOrder?.productName}
            </CustomLabel>
            <View style={styles.rowCenter}>
              <CustomLabel fontSize={12} style={{ flex: 0.7 }}>
                Rs {verifiedOrder?.productCost} Per Pcs
              </CustomLabel>

              <CustomLabel fontSize={12} style={{ flex: 0.3 }}>
                {verifiedOrder?.productMfgCategory?.toUpperCase()}
              </CustomLabel>
            </View>

            <View style={styles.rowCenter}>
              <CustomLabel style={{ flex: 0.7 }} fontSize={12}>
                Qty: {verifiedOrder?.productQuantity} Pcs
              </CustomLabel>
              <CustomLabel style={{ flex: 0.3 }} fontSize={12}>
                Lot:{verifiedOrder?.productQuantity / 1000}
              </CustomLabel>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CustomLabel fontSize={12}>Value </CustomLabel>
              <CustomLabel
                fontSize={12}
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
              >
                {verifiedOrder?.productCost * verifiedOrder?.productQuantity}
              </CustomLabel>
            </View>
            <View style={styles.rowCenter}>
              <CustomLabel
                fontFamily="poppinsMedium"
                fontSize={12}
                style={{ flex: 0.7 }}
              >
                Raw Materials
              </CustomLabel>
              <CustomLabel
                fontFamily="poppinsMedium"
                fontSize={12}
                style={{ flex: 0.3 }}
              >
                {verifiedOrder?.productVarified}, {verifiedOrder?.productSize}
              </CustomLabel>
            </View>
            <RawMaterials list={verifiedOrder?.productRawMaterials} />
          </View>
          <View style={styles.topRight}>
            <View style={styles.qrCode}>
              <Qrcode id={verifiedOrder?.id} size={width * 0.22} />
            </View>
            <View style={styles.id}>
              <CustomLabel fontFamily="interMedium" fontSize={16}>
                {verifiedOrder?.groupNumber?.toString()?.padStart(6, "0")}
              </CustomLabel>
            </View>
            <View
              style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "flex-end",

                bottom: 0,
              }}
            >
              <Icon
                name={"cancel"}
                library="materialIcons"
                color={colors.red}
              />
              <CustomLabel>Order</CustomLabel>
              <CustomLabel>{verifiedOrder?.groupPosition}</CustomLabel>
            </View>
          </View>
        </View>
        <View style={styles.idAndDate}>
          <CustomLabel fontSize={10}>{verifiedOrder?.id}</CustomLabel>
          <CustomLabel fontSize={10}>{verifiedOrder?.date}</CustomLabel>
        </View>
        <CustomLine color="#fff" />
        <View style={styles.containerBottom}>
          <CustomLabel fontSize={12}>
            {formatAddress(verifiedOrder?.userAddress)} {", "}
            <CustomLabel fontFamily="poppinsMedium">
              {verifiedOrder?.userAddress?.pin}
            </CustomLabel>
          </CustomLabel>
          <VerifiedCompanyName
            isLogoShow={false}
            companyNameSize="large"
            company={{ company }}
          />

          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 5,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Barcode value={verifiedOrder?.id} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,

    borderRadius: 10,
    backgroundColor: colors.secondary,
  },
  containerTop: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  topLeft: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 10,
    paddingRight: 0,
  },
  rawMaterials: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  topRight: {
    width: "30%",
    paddingVertical: 15,

    alignItems: "center",
    gap: 10,
  },
  qrCode: {
    width: "80%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  id: {
    width: "80%",
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  idAndDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerBottom: {
    padding: 10,
  },
});

export default XreturendAndCancelledCard;
