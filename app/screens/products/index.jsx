import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import ProductsHeader from "./components/productsHeader";
import ProductsSort from "./components/productsSort";
import ProductItemCards from "./components/procuctsItemCards";
import { fetchFilteredProducts } from "../../redux/product/productThunks";
import Loading from "../../components/loading";
import CustomLabel from "../../components/label";
import { generateFilterKey } from "../../utils/generateFilterKey";
import { selectProductState } from "../../redux/product/productSelector";

const ProductsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { categoryId, subCategoryId } = route?.params || {};

  const [sortId, setSortId] = useState(null);

  const { filteredProductsCache, filteredStatus } =
    useSelector(selectProductState);

  // useEffect(() => {
  //   console.log(filteredProductsCache, "in products");
  // }, [filteredProductsCache]);

  // Memoized filter params and key
  const filterParams = useMemo(
    () => (sortId ? { sortId } : { categoryId, subCategoryId }),
    [sortId, categoryId, subCategoryId]
  );

  const filterKey = useMemo(
    () => generateFilterKey(filterParams),
    [filterParams]
  );

  const productsToShow = filteredProductsCache?.[filterKey]?.pages
    ? Object.values(filteredProductsCache[filterKey].pages).flat()
    : [];

  // Fetch products on mount or when category/subCategory changes (if no sort is active)
  useEffect(() => {
    if (sortId) return; // Don't fetch on category change if sort is applied
    dispatch(fetchFilteredProducts({ categoryId, subCategoryId }));
  }, [categoryId, subCategoryId, dispatch, sortId]);

  const handleSortPress = (selectedSortId) => {
    setSortId(selectedSortId);
    dispatch(fetchFilteredProducts({ sortId: selectedSortId }));
  };

  const handleFetchMore = () => {
    const currentCache = filteredProductsCache?.[filterKey];
    if (!currentCache?.hasMore || currentCache?.loadingMore) return;
    dispatch(fetchFilteredProducts(filterParams));
  };

  if (filteredStatus === "pending" && productsToShow.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ProductsHeader />
        <ProductsSort handleSortPress={handleSortPress} />
        <Loading />
      </SafeAreaView>
    );
  }

  if (filteredStatus === "rejected" && productsToShow.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ProductsHeader />
        <ProductsSort handleSortPress={handleSortPress} />
        <View style={styles.fallbackContainer}>
          <CustomLabel color="#888888" fontSize={16}>
            Failed to load products.
          </CustomLabel>
        </View>
      </SafeAreaView>
    );
  }

  if (
    filteredStatus !== "pending" &&
    (!productsToShow || productsToShow.length === 0)
  ) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ProductsHeader />
        <ProductsSort handleSortPress={handleSortPress} />
        <View style={styles.fallbackContainer}>
          <CustomLabel color="#888888" fontSize={16}>
            No products found.
          </CustomLabel>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProductsHeader />
      <ProductsSort handleSortPress={handleSortPress} />
      <View style={styles.container}>
        <ProductItemCards
          products={productsToShow}
          status={filteredStatus}
          handleFetchMore={handleFetchMore}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductsScreen;
