import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import CustomItemCard from "../../../components/itemCard";
import CustomLabel from "../../../components/label";

const items = Array(9).fill("shirts");
const { width, height } = Dimensions.get("window"); // Get the screen width

const XproductDetailsItemCards = ({ handleItemCardPress }) => {
  return (
    <View style={styles.container}>
      <CustomLabel fontFamily="interMedium" fontSize={16}>
        Explore More Like This
      </CustomLabel>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index}
        scrollEnabled={false}
        renderItem={({ _, index }) => (
          <CustomItemCard
            key={index}
            width={width * 0.465}
            height={height * 0.27}
            lineColor={"#fff"}
            handleItemCardPress={handleItemCardPress}
          />
        )}
        numColumns={2} // Set the number of columns dynamically
        columnWrapperStyle={styles.columnWrapper} // Optional: to add spacing between columns
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 10,
  },
  columnWrapper: {
    justifyContent: "space-between", // Adds space between the columns
  },
});

export default XproductDetailsItemCards;
