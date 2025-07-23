import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import CustomButton from "../../../components/button";
import { useEffect, useState } from "react";
import CustomImage from "../../../components/image";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateSampleStatus } from "../../../redux/sample/sampleSlice";
import { showMessage } from "../../../utils/customMsgUtil";
import ConfirmationMsg from "../../../components/confirmation";

const { width } = Dimensions.get("window");

const XnewSampleTestCard = ({ item, index }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showCrossConfirmation, setShowCrossConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [sampleQuantity, setSampleQuantity] = useState(3);

  useEffect(() => {
    setSampleQuantity(item?.quantity || 3);
  }, []);

  const handleAccept = (sample) => {
    const sampleId = sample?.id;
    dispatch(
      updateSampleStatus({
        sampleId,
        quantity: sampleQuantity,
        status: "accepted",
      })
    );
    showMessage("Accepted");
    console.log("Accepted", sampleQuantity);
  };

  const handleCrossPress = () => {
    if (item?.status === "requested") {
      const sampleId = item?.id;
      dispatch(updateSampleStatus({ sampleId, status: "rejected" }));
      console.log("rejected");
      showMessage("Rejected");
    }
  };

  const handleDropDown = () => {
    if (item?.status === "requested") {
      showMessage("Sample is not Accepted yet");
    } else {
      setShowDropDown((prev) => !prev);
    }
  };

  const handlePass = (sample) => {
    if (item?.status === "ready") {
      const sampleId = sample?.id;
      const productId = sample?.productId;
      const userId = sample?.userId;

      dispatch(updateSampleStatus({ sampleId, status: "passed" }));

      showMessage("Verified");
    } else {
      showMessage("Not ready yet");
    }
  };

  const handleReject = (sample) => {
    const sampleId = sample?.id;
    dispatch(updateSampleStatus({ sampleId, status: "rejected" }));
    showMessage("rejected");
  };

  const handleCancel = (sample) => {
    if (item?.status === "ready") {
      const sampleId = sample?.id;
      dispatch(updateSampleStatus({ sampleId, status: "cancelled" }));
      showMessage("Cancelled");
      setShowCancelConfirmation(false);
    } else {
      showMessage("Not ready yet");
      setShowCancelConfirmation(false);
    }
  };

  const handleSamples = (action) => {
    if (item?.status === "requested") {
      if (action === "plus") {
        setSampleQuantity((prev) => (prev < 3 ? prev + 1 : prev));
      } else {
        setSampleQuantity((prev) => (prev > 1 ? prev - 1 : 1));
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Cross Icon Positioned Overlapping the QR Container */}
      <View style={styles.crossIconContainer}>
        <Pressable
          style={[
            styles.crossIcon,
            {
              backgroundColor:
                item.status === "requested" ? colors.red : colors.gray,
            },
          ]}
          onPress={() => {
            if (item.status === "requested") {
              setShowCrossConfirmation(true);
            }
          }}
        >
          <Icon name="cross" library="entypo" color={"#fff"} />
        </Pressable>
      </View>

      <View style={styles.containerTop}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.navigate("xproductDetails")}>
            <CustomLabel fontFamily="poppinsBold">
              {item?.productName}
            </CustomLabel>
          </Pressable>
          <View style={styles.rowCenter}>
            <CustomLabel fontFamily="poppinsMedium">
              Qty: {sampleQuantity} Pcs
            </CustomLabel>
            <CustomLabel fontFamily="poppinsMedium">
              {/* {item?.productMfgCategory.toUpporCase} */}
              INDOOR
            </CustomLabel>
          </View>

          <View>
            <CustomLabel fontFamily="poppinsMedium">
              {item?.userName}
            </CustomLabel>
            <CustomLabel>
              No. of Machines:6
              {/* {item?.userNumberOfMachine} */}
            </CustomLabel>

            <CustomLabel>743704, Habra {/* {item?.userPinCode} */}</CustomLabel>
          </View>
        </View>

        <View style={styles.topRight}>
          {/* Updated QR Container Name */}
          <Pressable
            style={styles.imageContainer}
            onPress={() => navigation.navigate("xproductDetails")}
          >
            <CustomImage source={item?.productImage} size={"90%"} />
          </Pressable>
          <View style={styles.id}>
            <CustomLabel fontFamily="interMedium" fontSize={16}>
              {item?.groupNumber?.toString().padStart(6, "0")}
            </CustomLabel>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomTop}>
          <CustomLabel style={styles.bottomTopLeft}>Select</CustomLabel>
          <View style={styles.bottomTopMiddle}>
            <View style={styles.upDown}>
              <Pressable onPress={() => handleSamples("minus")}>
                <Icon name="chevron-down" />
              </Pressable>
              <CustomLabel>{sampleQuantity}</CustomLabel>
              <Pressable onPress={() => handleSamples("plus")}>
                <Icon name="chevron-up" />
              </Pressable>
            </View>
          </View>
          <View style={styles.bottomTopRight}>
            <CustomButton
              borderRadius={10}
              textColor={item?.status === "requested" ? "#fff" : "#000"}
              backgroundColor={
                item?.status === "requested" ? colors.tertiary : "#fff"
              }
              title={item?.status === "requested" ? "Accept" : "Accepted"}
              style={{ width: "100%" }}
              onPress={() => handleAccept(item)}
              disabled={item?.status !== "requested"}
              fontSize={14}
            />
          </View>
        </View>
        <View style={styles.bottomBottom}>
          <CustomLabel fontSize={10}>Id:9AE6F9AS</CustomLabel>
          <CustomLabel fontSize={10}> {item?.date}</CustomLabel>
        </View>
      </View>
      <View style={styles.dropDown}>
        {showDropDown && (
          <View style={styles.dropdownButtons}>
            <CustomButton
              title={"Shipping Details"}
              width={"100%"}
              height={34}
              backgroundColor="#fff"
              textColor="#000"
            />
            <View style={styles.dropDownBottomButtons}>
              <CustomButton
                title={"Cancel"}
                onPress={() => setShowCancelConfirmation(true)}
                width={width * 0.4}
                backgroundColor="#fff"
                textColor={item?.status === "passed" ? colors.gray : colors.red}
                disabled={item?.status === "passed"}
              />
              <CustomButton
                title={item?.status === "passed" ? "Passed" : "Pass"}
                onPress={() => handlePass(item)}
                width={width * 0.4}
                backgroundColor={
                  item?.status === "passed" ? "#fff" : colors.tertiary
                }
                textColor={item?.status === "passed" ? colors.gray : "#fff"}
                disabled={item?.status === "passed"}
              />
            </View>
          </View>
        )}

        <Pressable onPress={handleDropDown} style={styles.chevronIcon}>
          <Icon name={showDropDown ? "chevron-up" : "chevron-down"} />
        </Pressable>
      </View>
      <ConfirmationMsg
        title="Confirmation"
        msg="Do you Really Want to Delete?"
        visible={showCrossConfirmation}
        onConfirm={handleCrossPress}
        onclose={() => setShowCrossConfirmation(false)}
      />
      <ConfirmationMsg
        title="Confirmation"
        msg="Do you Really Want to Cancel Verification?"
        visible={showCancelConfirmation}
        onConfirm={() => handleCancel(item)}
        onclose={() => setShowCancelConfirmation(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: colors.secondary,
  },
  crossIconContainer: {
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
  crossIcon: {
    height: 40,
    width: 40,

    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
  },
  containerTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
  },
  topLeft: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  topRight: {
    width: "40%",
    padding: 5,
    // paddingTop: 12,
    paddingRight: 20,
    alignItems: "flex-end",
    gap: 10,
  },
  imageContainer: {
    width: "80%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "relative",
  },
  id: {
    width: "80%",
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  bottomTop: {
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomTopLeft: { width: "18%", paddingLeft: 15, alignSelf: "center" },
  bottomTopMiddle: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
  upDown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "100%",
  },

  chevronIcon: {
    padding: 5,
    width: "100%",
    alignItems: "center",
  },
  bottomTopRight: {
    paddingRight: 20,
    width: "36%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  bottomBottom: {
    paddingLeft: 15,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropDown: {
    paddingTop: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
  },

  dropdownButtons: {
    width: "100%",
    gap: 10,
  },
  dropDownBottomButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default XnewSampleTestCard;
