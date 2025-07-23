import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomLabel from "../../../components/label";
import CustomImage from "../../../components/image";
import { colors } from "../../../constant/colors";
import { categoryList } from "../../../constant/data";
import { images } from "../../../constant/images";

const { width } = Dimensions.get("window");
const ITEM_CATEGORY_WIDTH = 95;

// Set fixed height for subcategory container here (adjust as needed)
const FIXED_SUBCATEGORY_HEIGHT = 280;

const HomeCategories = () => {
  const navigation = useNavigation();
  const categoryListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [activeCategoryId, setActiveCategoryId] = useState(
    categoryList[0]?.id ?? null
  );
  const [loading, setLoading] = useState(false);

  const activeCategory = useMemo(
    () => categoryList.find((cat) => cat.id === activeCategoryId) || {},
    [activeCategoryId]
  );

  const [firstList, secondList] = useMemo(() => {
    const subCategories = activeCategory.subCategories ?? [];
    const first = [];
    const second = [];
    subCategories.forEach((item, index) => {
      (index % 2 === 0 ? first : second).push(item);
    });
    return [first, second];
  }, [activeCategory]);

  const handleCategoryPress = useCallback((item, index) => {
    setLoading(true);

    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setActiveCategoryId(item.id);

      // Simulate loading delay
      setTimeout(() => {
        setLoading(false);

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, 150);

      if (categoryListRef.current) {
        categoryListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.4,
        });
      }
    });
  }, []);

  const renderCategoryBox = useCallback(
    ({ item, index }) => {
      const isActive = activeCategoryId === item.id;
      return (
        <Pressable
          onPress={() => handleCategoryPress(item, index)}
          style={[styles.categoryBox, isActive && styles.activeCategory]}
        >
          <CustomLabel
            fontFamily="poppinsRegular"
            style={isActive && styles.activeText}
          >
            {item?.category}
          </CustomLabel>
        </Pressable>
      );
    },
    [activeCategoryId, handleCategoryPress]
  );

  const handleSubCategoryPress = useCallback(
    (item) => {
      navigation.navigate("products", {
        categoryId: activeCategoryId,
        subCategoryId: item.id,
      });
    },
    [navigation, activeCategoryId]
  );

  const renderSubCategoryItem = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => handleSubCategoryPress(item)}
        style={styles.item}
      >
        <View style={styles.itemImageContainer}>
          <CustomImage
            source={item?.image ?? images.frock}
            resizeMode="contain"
            size={50}
          />
        </View>
        <View style={styles.textContainer}>
          <CustomLabel fontSize={10}>{item?.cost ?? "N/A"}</CustomLabel>
          <CustomLabel fontSize={10}>{item?.name ?? "Unknown"}</CustomLabel>
        </View>
      </Pressable>
    ),
    [handleSubCategoryPress]
  );

  return (
    <View style={styles.container}>
      {/* Category Tabs */}
      <FlatList
        ref={categoryListRef}
        data={categoryList}
        renderItem={renderCategoryBox}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: ITEM_CATEGORY_WIDTH,
          offset: ITEM_CATEGORY_WIDTH * index,
          index,
        })}
        initialScrollIndex={categoryList.findIndex(
          (cat) => cat.id === activeCategoryId
        )}
      />

      {/* Subcategory Content with Fade Animation and fixed height container */}
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <View style={styles.subCategoryFixedHeightContainer}>
          {loading ? (
            <View />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              <FlatList
                data={firstList}
                renderItem={renderSubCategoryItem}
                keyExtractor={(item) => `${item?.id}-row1`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.subListContainer}
              />
              <FlatList
                data={secondList}
                renderItem={renderSubCategoryItem}
                keyExtractor={(item) => `${item?.id}-row2`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.subListContainer}
              />
            </ScrollView>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: width * 0.02,
  },
  categoryBox: {
    height: 32,
    width: width * 0.25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    borderColor: colors.secondary,
  },
  activeCategory: {
    backgroundColor: colors.primary,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    width: width * 0.25,
    height: 120,
    backgroundColor: "#fff",
    marginRight: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  itemImageContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,.2)",
  },
  textContainer: {
    alignItems: "center",
  },
  subListContainer: {
    paddingTop: 10,
  },
  subCategoryFixedHeightContainer: {
    height: FIXED_SUBCATEGORY_HEIGHT,
    overflow: "hidden",
  },
});

export default HomeCategories;
