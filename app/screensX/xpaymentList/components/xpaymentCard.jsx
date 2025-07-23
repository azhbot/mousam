import { View, StyleSheet, Pressable, Modal, Dimensions } from "react-native";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import CustomButton from "../../../components/button";
import CustomLine from "../../../components/line";
import XpaymentSteps from "./xpaymentSteps";
import { useState } from "react";
import dayjs from "dayjs";

const { width } = Dimensions.get("window");

const XpaymentCard = ({ item, handlePay = () => {} }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isSingle, setIsSingle] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropdownPosition, setDropDownPosition] = useState({ X: 0, Y: 0 });
  const [isPaid, setIsPaid] = useState(false);

  const now = new Date();
  const formatedDate = dayjs(now).format("MMMM D, YYYY, h:mm A");

  const handleDotsPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setDropDownPosition({ X: pageX, Y: pageY });
    setShowDropDown(true);
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rowCenter}>
          <CustomLabel>
            {item?.fileName} ({item?.ids?.length})
          </CustomLabel>
          <Pressable onPress={handleDotsPress} style={{ paddingLeft: 10 }}>
            <Icon name="dots-vertical" />
          </Pressable>
        </View>

        <XpaymentSteps activeStep={activeStep} isSingle={isSingle} />
      </View>

      <CustomLine color="#fff" />

      <View style={styles.containerBottom}>
        <View style={styles.date}>
          <CustomLabel fontSize={11}>{formatedDate}</CustomLabel>
        </View>
        <CustomButton
          onPress={() => (isPaid ? null : handlePay())}
          title={isPaid ? "Chapter Closed" : "Pay Now"}
          textColor={isPaid ? colors.gray : "#fff"}
          backgroundColor={isPaid ? "#fff" : colors.tertiary}
        />
      </View>
      {showDropDown && (
        <Modal transparent>
          <Pressable
            onPress={() => setShowDropDown(false)}
            style={styles.overLay}
          >
            <View
              style={[
                styles.dropDown,
                {
                  top: dropdownPosition.Y - 50,
                  left: dropdownPosition.X - 150,
                },
              ]}
            >
              <Pressable style={styles.rowCenter}>
                <CustomLabel fontSize={12}>Print</CustomLabel>
                <Icon name="printer" library="feather" size={16} />
              </Pressable>
              <CustomLine color={colors.veryLightGray} />
              <Pressable style={styles.rowCenter}>
                <CustomLabel fontSize={12}>Download</CustomLabel>
                <Icon name="download" library="feather" size={16} />
              </Pressable>
              <CustomLine color={colors.veryLightGray} />
              <Pressable style={styles.rowCenter}>
                <CustomLabel fontSize={12}>Share</CustomLabel>
                <Icon name="share-2" library="feather" size={16} />
              </Pressable>
              <CustomLine color={colors.veryLightGray} />
              <Pressable
                style={styles.rowCenter}
                onPress={() => {
                  if (isPaid) return;
                  setIsSingle((prev) => !prev);
                  setShowDropDown(false);
                }}
              >
                <CustomLabel fontSize={12}>
                  {isSingle ? "Split Pay" : "Single Pay"}
                </CustomLabel>
                <Icon
                  name={isSingle ? "call-split" : "relation-many-to-one"}
                  size={16}
                />
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 15,
    margin: 7,
    borderRadius: 10,
    backgroundColor: colors.secondary,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rs: {
    alignItems: "center",
    // top: 25,
    backgroundColor: "pink",
  },
  date: {
    alignItems: "flex-end",
    marginVertical: 5,
  },
  overLay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dropDown: {
    width: width * 0.35,
    height: width * 0.45,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    position: "absolute",
  },
});

export default XpaymentCard;
