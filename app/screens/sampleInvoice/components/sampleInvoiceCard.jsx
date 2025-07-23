import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import CustomLine from "../../../components/line";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import { useEffect } from "react";
import RawMaterials from "../../../components/others/rawMaterials";
import { formatAddress } from "../../../utils/format/formatAddressUtil";
import Qrcode from "../../../components/others/qrcode";
import Barcode from "../../../components/others/barCode";

const { width } = Dimensions.get("window");

const SampleInvoiceCard = ({
  index,
  sampleInvoice,
  onPress = () => {},
  onLongPress = () => {},
  isSelected,
}) => {
  useEffect(() => {
    console.log("Sample Invoice:", sampleInvoice, "in XsamplePrintListCard");
  }, [sampleInvoice]);

  const company = {
    name: sampleInvoice?.companyName,
    logo: sampleInvoice?.companyLogo,
  };

  return (
    <Pressable
      onPress={() => {
        console.log("press");
        onPress(sampleInvoice);
      }}
      onLongPress={() => {
        onLongPress(sampleInvoice);
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
              {sampleInvoice?.productName}
            </CustomLabel>
            <View style={styles.rowCenter}>
              <CustomLabel fontSize={12} style={{ flex: 0.7 }}>
                Rs {sampleInvoice?.productCost} Per Pcs
              </CustomLabel>

              <CustomLabel fontSize={12} style={{ flex: 0.3 }}>
                {sampleInvoice?.productMfgCategory?.toUpperCase()}
              </CustomLabel>
            </View>
            <View style={styles.rowCenter}>
              <CustomLabel style={{ flex: 0.7 }} fontSize={12}>
                Qty: {sampleInvoice?.quantity} Pcs
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
                {sampleInvoice?.productVariant}, {sampleInvoice?.productSize}
              </CustomLabel>
            </View>
            <RawMaterials list={sampleInvoice?.productRawMaterials} />
          </View>
          <View style={styles.topRight}>
            <View style={styles.qrCode}>
              <Qrcode id={sampleInvoice?.id} size={width * 0.2} />
            </View>
            <View style={styles.id}>
              <CustomLabel fontFamily="interMedium" fontSize={16}>
                {sampleInvoice?.groupNumber?.toString()?.padStart(6, "0")}
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
              <CustomLabel>Sample</CustomLabel>
            </View>
          </View>
        </View>
        <View style={styles.idAndDate}>
          <CustomLabel fontSize={10}>{sampleInvoice?.id}</CustomLabel>
          <CustomLabel fontSize={10}>{sampleInvoice?.date}</CustomLabel>
        </View>
        <CustomLine color="#fff" />
        <View style={styles.containerBottom}>
          <CustomLabel fontSize={12}>
            {formatAddress(sampleInvoice?.userAddress)} {", "}
            <CustomLabel fontFamily="poppinsMedium">
              {sampleInvoice?.userAddress?.pin}
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
            {sampleInvoice?.isForwarded && (
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
            <Barcode value={sampleInvoice?.id} />
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

export default SampleInvoiceCard;
