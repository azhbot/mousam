import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import StoreHeader from "./components/storeHeader";
import StoreItemCards from "./components/storeItemCards";
import { selectProductState } from "../../redux/product/productSelector";
import { generateFilterKey } from "../../utils/generateFilterKey";
import { fetchFilteredProducts } from "../../redux/product/productThunks";
import LoadingOverlay from "../../components/loading/loadingOverlay";
import { companies } from "../../data/companies";

const CompanyScreen = ({ route }) => {
  const dispatch = useDispatch();
  const id = route?.params?.companyId;

  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [sortId, setSortId] = useState(null);
  const { filteredProductsCache, filteredStatus } =
    useSelector(selectProductState);

  // ✅ Check if companyId was passed
  if (!id) {
    return (
      <View style={styles.container}>
        <StoreHeader />
        <Text style={styles.message}>Company ID not provided.</Text>
      </View>
    );
  }

  const company = companies.find((c) => c.id === id);

  // ✅ Check if company exists
  if (!company) {
    return (
      <View style={styles.container}>
        <StoreHeader />
        <Text style={styles.message}>Company not found.</Text>
      </View>
    );
  }

  const filterParams = useMemo(
    () => (sortId ? { sortId, companyId: id } : { companyId: id }),
    [sortId, id]
  );

  const filterKey = useMemo(
    () => generateFilterKey(filterParams),
    [filterParams]
  );

  const companyProducts = filteredProductsCache?.[filterKey]?.pages
    ? Object.values(filteredProductsCache[filterKey].pages).flat()
    : [];

  useEffect(() => {
    if (!sortId) {
      dispatch(fetchFilteredProducts({ companyId: id }));
    }
  }, [dispatch, sortId, id]);

  const handleSort = useCallback(
    (selectedSortId) => {
      setSortId(selectedSortId);
      dispatch(
        fetchFilteredProducts({ sortId: selectedSortId, companyId: id })
      );
    },
    [id, dispatch]
  );

  const handleFetchMore = useCallback(() => {
    const currentCache = filteredProductsCache?.[filterKey];
    if (!currentCache?.hasMore || currentCache?.loadingMore) return;
    dispatch(fetchFilteredProducts(filterParams));
  }, [dispatch, filterParams, filteredProductsCache, filterKey]);

  return (
    <View style={styles.container}>
      {loadingOverlay && <LoadingOverlay />}
      <StoreHeader />
      <StoreItemCards
        company={company}
        companyProducts={companyProducts}
        handleFetchMore={handleFetchMore}
        handleSort={handleSort}
        isLoading={filteredStatus === "pending"}
        isError={filteredStatus === "rejected"}
        setLoadingOverlay={setLoadingOverlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  message: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "red",
  },
});

export default CompanyScreen;
