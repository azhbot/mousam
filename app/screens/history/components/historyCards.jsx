import { View, StyleSheet, FlatList } from "react-native";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCompanyMap } from "../../../redux/company/companySelector";
import CustomLabel from "../../../components/label";
import HistoryCard from "./historyCard";
import { historyProductsSelector } from "../../../redux/history/historySelector";

const HistoryCards = () => {
  const historyProducts = useSelector(historyProductsSelector);

  const companyMap = useSelector(selectCompanyMap);

  useEffect(() => {
    console.log(historyProducts, "history Cards");
  }, [historyProducts]);

  if (!historyProducts || historyProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <CustomLabel style={{ bottom: 60 }} color={"#888"}>
          Create history.
        </CustomLabel>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={historyProducts}
        keyExtractor={(item, index) => index.toString()} // fix: index should be string
        renderItem={({ item, index }) => (
          <HistoryCard
            orderProduct={item}
            company={companyMap.get(item.companyId)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default HistoryCards;
