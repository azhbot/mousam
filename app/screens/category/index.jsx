import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import CategoryHeader from "./components/categoryHeader";
import CategoryCategories from "./components/categoryCategories";
import CategoryBanner from "./components/categoryBanner";
import CategorySubCategories from "./components/categorySubCategories";
import CustomLabel from "../../components/label";
import { options } from "../../data/options";
import { colors } from "../../constant/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const CategoryScreen = () => {
  const [genders, setGenders] = useState([]);
  const [currentGender, setCurrentGender] = useState("male");
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef(null);
  const subCategoryIndexMap = useRef({});
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    setGenders(Object.keys(options));
  }, []);

  const handleGenderOptionPress = useCallback(
    (gender) => {
      if (gender === currentGender) return;
      setCurrentGender(gender);
      setActiveIndex(0);
      isProgrammaticScroll.current = true;
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    },
    [currentGender]
  );

  const handleCategoryPress = useCallback((categoryId, index) => {
    setActiveIndex(index);
    isProgrammaticScroll.current = true;

    const targetIndex = subCategoryIndexMap.current[categoryId];
    if (targetIndex !== undefined && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: targetIndex, animated: true });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  }, []);

  const subCategoriesData = useMemo(() => {
    subCategoryIndexMap.current = {};
    const data = options[currentGender].map((item, index) => {
      subCategoryIndexMap.current[item.categoryId] = index + 1;
      return { type: "subcategory", data: item };
    });
    return [{ type: "banner" }, ...data];
  }, [currentGender]);

  const renderItem = useCallback(({ item }) => {
    if (item.type === "banner") return <CategoryBanner />;
    return (
      <CategorySubCategories
        title={item.data.categoryName}
        categoryId={item.data.categoryId}
        subCategories={item.data.subCategories}
      />
    );
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (isProgrammaticScroll.current) {
        return;
      }

      const firstVisibleSubcategory = viewableItems.find(
        (item) => item.item.type === "subcategory"
      );
      if (firstVisibleSubcategory) {
        const index = options[currentGender].findIndex(
          (item) =>
            item.categoryId === firstVisibleSubcategory.item.data.categoryId
        );
        if (index !== -1) setActiveIndex(index);
      }
    },
    [currentGender]
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.screen}>
      <CategoryHeader />
      <View style={styles.topOptions}>
        {genders.map((item) => {
          const active = item === currentGender;
          return (
            <Pressable
              onPress={() => handleGenderOptionPress(item)}
              style={[
                styles.option,
                {
                  backgroundColor: active
                    ? colors.secondary
                    : colors.veryLightGray,
                },
              ]}
              key={item}
            >
              <CustomLabel color={active ? "#000" : "#000"}>
                {item?.charAt(0).toUpperCase() + item?.slice(1)}
              </CustomLabel>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.container}>
        <CategoryCategories
          onCategoryPress={handleCategoryPress}
          categories={options[currentGender]}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <FlatList
          ref={flatListRef}
          data={subCategoriesData}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.type === "banner" ? "banner" : item.data.categoryId.toString()
          }
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  topOptions: {
    gap: 5,
    flexDirection: "row",
    margin: 10,
  },
  option: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  flatListContent: {
    paddingBottom: height * 0.5,
  },
});

export default CategoryScreen;
