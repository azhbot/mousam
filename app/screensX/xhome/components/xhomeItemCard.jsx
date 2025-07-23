import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import Icon from "../../../components/icon";
import CustomImage from "../../../components/image";
import { images } from "../../../constant/images";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import VerifiedCompanyName from "../../../components/verifiedCompany";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "../../../utils/customMsgUtil";

const { width, height } = Dimensions.get("window");

const XhomeItemCard = ({
  item,
  width,
  color = colors.secondary,
  companyNameSize,
  lineColor,
}) => {
  const navigation = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ X: 0, Y: 0 });
  const [available, setAvailable] = useState(true);

  const company = {
    name: item?.name,
    logo: item?.companyLogo,
  };

  // useEffect(() => {
  //   console.log(company, "in xhomeitemcards");
  // }, []);

  const handleItemCardPress = () => {
    navigation.navigate("productDetails", {
      productId: item.id,
      companyShow: true,
    });
  };
  const handleEditPress = () => {
    navigation.navigate("xaddProduct", { productId: item.id });
  };

  const handleDotsPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setDropdownPosition({ X: pageX, Y: pageY });
    setShowDropdown(true);
  };

  const handleOptionPress = (option) => {
    setShowDropdown(false);
    if (option === 1) {
      setAvailable(true);
      showMessage("Product Available Now ");
    }
    if (option === 2) {
      setAvailable(false);
      showMessage("Product Unavailable Now ");
    }
  };

  return (
    <>
      <Pressable
        onPress={handleItemCardPress}
        style={[
          styles.specialItem,
          { width, backgroundColor: color, aspectRatio: 3 / 4 },
        ]}
      >
        <View style={styles.imageContainer}>
          {/* Heart Icon */}
          <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
            <Icon name={"square-edit-outline"} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(event) => handleDotsPress(event)}
            style={styles.dotsIcon}
          >
            <Icon name={"dots-vertical"} size={24} />
          </TouchableOpacity>

          {/* Product Image */}
          <CustomImage
            source={item?.image}
            resizeMode="contain"
            style={styles.image}
          />

          {/* Cart Icon */}
          <TouchableOpacity style={styles.crossIcon}>
            {/* <Icon name={"square"} library="fontAwasome" size={24} /> */}
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: available ? "green" : "red",
                borderRadius: 4,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.line, { backgroundColor: lineColor }]} />

        <View style={styles.textContainer}>
          <CustomLabel fontFamily="poppinsBold" fontSize={10}>
            Rs {item?.cost} Per Pcs
          </CustomLabel>
          <CustomLabel fontFamily="poppinsMedium" fontSize={10}>
            Saree
          </CustomLabel>
          <VerifiedCompanyName
            companyNameSize={companyNameSize}
            company={company}
          />
        </View>
      </Pressable>
      {showDropdown && (
        <Modal transparent animationType="fade" statusBarTranslucent={true}>
          <Pressable
            onPress={() => setShowDropdown(false)}
            style={styles.overLay}
          >
            <Pressable
              style={[
                styles.dropDown,
                {
                  top: dropdownPosition.Y,
                  left: dropdownPosition.X - width * 0.85,
                },
              ]}
            >
              <Pressable
                onPress={() => handleOptionPress(1)}
                style={styles.rowCenter}
              >
                <CustomLabel>Available Now</CustomLabel>
                <Icon color={colors.green} name="check" library="entypo" />
              </Pressable>
              <Pressable
                onPress={() => handleOptionPress(2)}
                style={styles.rowCenter}
              >
                <CustomLabel>Not Available</CustomLabel>
                <Icon color={colors.red} name="cross" library="entypo" />
              </Pressable>
              <Pressable
                onPress={() => handleOptionPress(3)}
                style={styles.rowCenter}
              >
                <CustomLabel>Delete Product</CustomLabel>
                <Icon color={colors.red} name="delete" />
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  specialItem: {
    borderRadius: 8,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "70%",
  },
  editIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  dotsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 1,
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  overLay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dropDown: {
    width: width * 0.4,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: height * 0.05,
  },
});

export default XhomeItemCard;
