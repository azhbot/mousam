import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { colors } from "../../../constant/colors";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { useEffect } from "react";

const XtotalSamplesCard = ({ item, onLongPress, onPress, isSelected }) => {
  useEffect(() => {
    console.log(item, "XtotalSamplesCard item");
  }, []);
  return (
    <Pressable
      onPress={() => {
        if (item) {
          onPress(item);
          console.log("press file", item);
        }
      }}
      onLongPress={() => {
        if (item) {
          onLongPress(item);
          console.log("long press file", item);
        }
      }}
      style={styles.file}
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomLabel>
          {item?.fileName} ({item?.ids?.length} )
        </CustomLabel>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="chevron-right" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          paddingRight: 10,
        }}
      >
        <CustomLabel fontSize={10}>{item?.date}</CustomLabel>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  file: {
    justifyContent: "center",
    padding: 15,
    paddingVertical: 10,
    backgroundColor: colors.secondary,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default XtotalSamplesCard;
