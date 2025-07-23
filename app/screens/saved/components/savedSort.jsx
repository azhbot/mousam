import { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";

const { width, height } = Dimensions.get("window");
const SIDE_MARGIN = 10;
const DROPDOWN_WIDTH = 150;

const dropdownData = {
  sort: ["Price: Low to High", "Price: High to Low", "Newest"],
  category: ["Shoes", "Clothing", "Accessories"],
  gender: ["Men", "Women", "Others"],
  filter: ["In Stock", "Discounted", "Popular"],
};

const SaveSort = ({ handleSort = () => {} }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onTabPress = (tab, e) => {
    const { pageX, pageY } = e.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setSelectedTab((prev) => (prev === tab ? "" : tab));
  };

  const getDropdownStyle = () => {
    let left = position.x - DROPDOWN_WIDTH / 2;
    left = Math.max(
      SIDE_MARGIN,
      Math.min(left, width - DROPDOWN_WIDTH - SIDE_MARGIN)
    );

    return {
      top: Math.min(position.y + 40, height - 200),
      left,
      width: DROPDOWN_WIDTH,
    };
  };

  return (
    <View style={styles.container}>
      {Object.keys(dropdownData).map((key, i) => (
        <Pressable
          key={i}
          style={[
            styles.box,
            {
              backgroundColor:
                selectedTab === key ? colors.secondary : colors.veryLightGray,
            },
          ]}
          onPress={(e) => onTabPress(key, e)}
        >
          {(key === "sort" || key === "filter") && (
            <Icon name={key === "sort" ? "sort" : "filter-outline"} size={20} />
          )}
          <CustomLabel fontSize={12} fontFamily="poppinsMedium">
            {key[0].toUpperCase() + key.slice(1)}
          </CustomLabel>
          {key !== "sort" && key !== "filter" && (
            <Icon name="chevron-down" size={20} />
          )}
        </Pressable>
      ))}

      {!!selectedTab && (
        <Modal
          visible
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setSelectedTab("")}
        >
          <Pressable style={styles.overlay} onPress={() => setSelectedTab("")}>
            <View style={[styles.dropdown, getDropdownStyle()]}>
              <FlatList
                data={dropdownData[selectedTab]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      handleSort(item);
                      setSelectedTab("");
                    }}
                    style={({ pressed }) => [
                      styles.dropdownItem,
                      { opacity: pressed ? 0.5 : 1 },
                    ]}
                  >
                    <CustomLabel>{item}</CustomLabel>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: colors.LightGray,
    backgroundColor: colors.secondary,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default SaveSort;
