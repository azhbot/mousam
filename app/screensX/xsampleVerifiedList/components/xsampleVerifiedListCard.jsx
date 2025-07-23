import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import CustomLine from "../../../components/line";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import { useEffect } from "react";
import RawMaterials from "../../../components/others/rawMaterials";
import Qrcode from "../../../components/others/qrcode";
import Barcode from "../../../components/others/barCode";
import { formatAddress } from "../../../utils/format/formatAddressUtil";

const { width } = Dimensions.get("window");

const XsampleVerifiedListCard = ({
  index,
  sample,
  onPress = () => {},
  onLongPress = () => {},
  isSelected,
}) => {
  // useEffect(() => {
  //   console.log(sample, "in XsampleVerifiedListCard");
  // }, [sample]);

  const company = {
    name: sample?.companyName || "Unknown Company",
    logo: sample?.companyLogo || null,
  };

  return (
    <Pressable
      onPress={() => {
        onPress(sample);
      }}
      onLongPress={() => {
        onLongPress(sample);
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
              {sample?.productName}
            </CustomLabel>

            <View style={styles.rowCenter}>
              <CustomLabel fontSize={12} style={{ flex: 0.7 }}>
                Rs {sample?.productCost} Rs
              </CustomLabel>
              <CustomLabel fontSize={12} style={{ flex: 0.3 }}>
                {sample?.productMfgCategory?.toUpperCase()}
              </CustomLabel>
            </View>

            <View style={styles.rowCenter}>
              <CustomLabel style={{ flex: 0.7 }} fontSize={12}>
                Qty: {sample?.quantity} Pcs
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
                {sample?.productVariant}, {sample?.productSize || "N/A"}
              </CustomLabel>
            </View>

            <RawMaterials list={sample?.productRawMaterials} />
          </View>

          <View style={styles.topRight}>
            <View style={styles.qrCode}>
              {/* <Icon size={width * 0.22} name="qrcode" /> */}
              <Qrcode type="qr" id={sample?.id} size={width * 0.2} />
            </View>
            <View style={styles.id}>
              <CustomLabel fontFamily="interMedium" fontSize={16}>
                {sample?.groupNumber?.toString().padStart(6, "0")}
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
                name={true ? "circle-outline" : "check-circle"}
                library={false ? "materialIcons" : undefined}
                color={colors.tertiary}
              />
              <CustomLabel>Reached</CustomLabel>
            </View>
          </View>
        </View>

        <View style={styles.idAndDate}>
          <CustomLabel fontSize={10}>ID: {sample?.id}</CustomLabel>
          <CustomLabel fontSize={10}>{sample?.date}</CustomLabel>
        </View>

        <CustomLine color="#fff" />

        <View style={styles.containerBottom}>
          <CustomLabel fontSize={12}>
            {formatAddress(sample?.userAddress)}
            {", "}
            <CustomLabel fontFamily="poppinsMedium">
              {sample?.userAddress?.pin}
            </CustomLabel>
          </CustomLabel>

          <VerifiedCompanyName
            isLogoShow={false}
            companyNameSize="large"
            company={company}
          />

          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 5,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Barcode value={sample?.id} />
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
    width: "70%",

    padding: 10,
    paddingLeft: 10,
    paddingRight: 0,
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

export default XsampleVerifiedListCard;
