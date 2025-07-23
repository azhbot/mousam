import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import CustomLine from "../../../components/line";
import React, { useCallback } from "react";

const { width } = Dimensions.get("window");

const CategoryCategories = ({
  onCategoryPress,
  categories,
  activeIndex,
  setActiveIndex,
}) => {
  const renderCategoryItem = useCallback(
    ({ item, index }) => {
      const isActive = activeIndex === index;
      const isAboveActive = activeIndex === index - 1;
      const isBelowActive = activeIndex === index + 1;

      return (
        <View>
          <Pressable
            onPress={() => {
              onCategoryPress(item?.categoryId, index);
            }}
            style={[
              styles.category,
              {
                backgroundColor: isActive ? "#fff" : colors.secondary,
                borderBottomRightRadius: isBelowActive ? 10 : 0,
                borderTopRightRadius: isAboveActive ? 10 : 0,
              },
            ]}
          >
            <CustomLabel numberOfLines={1}>{item?.categoryName}</CustomLabel>
          </Pressable>
          <CustomLine color="#fff" />
        </View>
      );
    },
    [activeIndex, onCategoryPress]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.categoryId}
        showsVerticalScrollIndicator={false}
        renderItem={renderCategoryItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    marginTop: 20,
  },
  category: {
    paddingVertical: 20,
    justifyContent: "center",
    padding: 10,
    paddingLeft: 15,
  },
});

export default React.memo(CategoryCategories);
