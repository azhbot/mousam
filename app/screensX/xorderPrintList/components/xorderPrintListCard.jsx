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
import { formatAddress } from "../../../utils/format/formatAddressUtil";
import Barcode from "../../../components/others/barCode";
import Qrcode from "../../../components/others/qrcode";

const { width } = Dimensions.get("window");

const XorderPrintListCard = ({
  index,
  orderInvoice,
  onPress = () => {},
  onLongPress = () => {},
  isSelected,
}) => {
  // console.log("orderInvoice", orderInvoice, "in <XorderPrintListCard />");

  const company = {
    name: orderInvoice?.companyName,
    logo: orderInvoice?.companyLogo,
  };
  return (
    <Pressable
      onPress={() => {
        console.log("press");
        onPress(orderInvoice);
      }}
      onLongPress={() => {
        onLongPress(orderInvoice);
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
              {orderInvoice?.productName}
            </CustomLabel>
            <View style={styles.rowCenter}>
              <CustomLabel fontSize={12} style={{ flex: 0.7 }}>
                Rs {orderInvoice?.productCost}
              </CustomLabel>

              <CustomLabel fontSize={12} style={{ flex: 0.3 }}>
                {orderInvoice?.productMfgCategory?.toUpperCase()}
              </CustomLabel>
            </View>
            <View style={styles.rowCenter}>
              <CustomLabel style={{ flex: 0.7 }} fontSize={12}>
                Qty: {orderInvoice?.quantity} Pcs
              </CustomLabel>
              <CustomLabel style={{ flex: 0.3 }} fontSize={12}>
                Lot: {orderInvoice?.quantity / 1000}
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
                {orderInvoice?.quantity * orderInvoice?.productCost}
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
                {orderInvoice?.productVariant} {orderInvoice?.productSize}
              </CustomLabel>
            </View>
            <RawMaterials list={orderInvoice?.productRawMaterials} />
          </View>
          <View style={styles.topRight}>
            <View style={styles.qrCode}>
              <Qrcode id={orderInvoice?.id} size={width * 0.2} />
            </View>
            <View style={styles.id}>
              <CustomLabel fontFamily="interMedium" fontSize={16}>
                {orderInvoice?.groupNumber?.toString()?.padStart(6, "0")}
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
                name={false ? "radio-button-checked" : "check-circle"}
                library="materialIcons"
                color={colors.tertiary}
              />
              <CustomLabel>Order</CustomLabel>
              <CustomLabel fontFamily="interBold">
                ({orderInvoice?.orderPositionInGroup})
              </CustomLabel>
            </View>
          </View>
        </View>
        <View style={styles.idAndDate}>
          <CustomLabel fontSize={10}>{orderInvoice?.id}</CustomLabel>
          <CustomLabel fontSize={10}>{orderInvoice?.date}</CustomLabel>
        </View>
        <CustomLine color="#fff" />
        <View style={styles.containerBottom}>
          <CustomLabel fontSize={12}>
            {formatAddress(orderInvoice?.userAddress)} {", "}
            <CustomLabel fontFamily="poppinsMedium">
              {orderInvoice?.userAddress?.pin}
            </CustomLabel>
          </CustomLabel>
          <View style={styles.rowCenter}>
            <View style={{ width: "70%" }}>
              <VerifiedCompanyName
                isLogoShow={false}
                companyNameSize="large"
                company={company}
              />
            </View>
            {orderInvoice?.isForwarded && (
              <CustomLabel fontSize={10}>
                <Icon size={12} name={"share-all"} /> Forwarded
              </CustomLabel>
            )}
          </View>

          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 5,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Barcode value={orderInvoice?.id} />
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

export default XorderPrintListCard;
