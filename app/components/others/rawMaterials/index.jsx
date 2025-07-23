import { View, StyleSheet } from "react-native";
import CustomLabel from "../../label";

const RawMaterials = ({ list = [] }) => {
  const rawMaterialsList = list.map((i) => i.name);

  const isLong = (name) => (name?.length || 0) > 20;

  let count = 1;

  const longItems = rawMaterialsList.filter(isLong);
  const shortItems = rawMaterialsList.filter((item) => !isLong(item));

  // Split shortItems into two nearly equal columns
  const midpoint = Math.ceil(shortItems.length / 2);
  const leftColumn = shortItems.slice(0, midpoint);
  const rightColumn = shortItems.slice(midpoint);

  return (
    <View style={styles.rawMaterials}>
      {/* Long Items - Full Width */}
      {longItems.map((item, idx) => (
        <View
          key={`long-${idx}`}
          style={[styles.materialItem, styles.fullWidth]}
        >
          <View style={{ flexDirection: "row" }}>
            <CustomLabel fontSize={10} fontFamily="poppinsMedium">
              {" "}
              {count++}.
            </CustomLabel>
            <CustomLabel fontSize={10}>{item}</CustomLabel>
          </View>
        </View>
      ))}

      {/* Two-column layout for short items */}
      <View style={styles.twoColumnContainer}>
        <View style={styles.column}>
          {leftColumn.map((item, index) => (
            <View key={`left-${index}`} style={styles.materialItem}>
              <View style={{ flexDirection: "row" }}>
                <CustomLabel fontSize={10} fontFamily="poppinsMedium">
                  {" "}
                  {count++}.
                </CustomLabel>
                <CustomLabel fontSize={10}>{item}</CustomLabel>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {rightColumn.map((item, index) => (
            <View key={`right-${index}`} style={styles.materialItem}>
              <View style={{ flexDirection: "row" }}>
                <CustomLabel fontSize={10} fontFamily="poppinsMedium">
                  {" "}
                  {count++}.
                </CustomLabel>
                <CustomLabel fontSize={10}>{item}</CustomLabel>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rawMaterials: {
    marginTop: 5,
    flexDirection: "column",
    paddingRight: 20,
  },
  twoColumnContainer: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  materialItem: {
    borderRadius: 4,

    paddingRight: 4,
  },
  fullWidth: {
    width: "100%",
  },
});

export default RawMaterials;
