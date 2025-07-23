import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { images } from "../../../constant/images";
import { useCallback } from "react";
import CustomImage from "../../../components/image";

const { width } = Dimensions.get("window");
const HALF_WIDTH = width / 2;
const arr = Array(1000).fill("item");

const TestOne = () => {
  const renderItem = useCallback(
    ({ item, index }) => <CustomImage source={images.banner1} size={150} />,
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={arr}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: HALF_WIDTH,
    padding: 10,
  },
});

export default TestOne;
