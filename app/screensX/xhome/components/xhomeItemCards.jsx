import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import XhomeItemCard from "./xhomeItemCard";
import { cardList } from "../../../constant/data";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  selectProductState,
} from "../../../redux/product/productSelector";
import { useEffect, useMemo } from "react";
import { fetchFilteredProducts } from "../../../redux/product/productThunks";
import { generateFilterKey } from "../../../utils/generateFilterKey";
const { width, height } = Dimensions.get("window"); // Get the screen width

const XhomeItemCards = () => {
  const dispatch = useDispatch();
  const { filteredProductsCache } = useSelector(selectProductState);

  const filterKey = useMemo(() => generateFilterKey({ companyId: 1 }), []);

  const productsToShow = filteredProductsCache?.[filterKey]?.pages
    ? Object.values(filteredProductsCache[filterKey].pages).flat()
    : [];

  useEffect(() => {
    // console.log(filterKey, "in xhomeitemcoards");
    // console.log(filteredProductsCache?.[filterKey]?.pages, "in xhomeitemcards");
  }, [filteredProductsCache]);

  useEffect(() => {
    dispatch(fetchFilteredProducts({ companyId: 1 }));
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={productsToShow}
        keyExtractor={(item, index) => item.cost}
        renderItem={({ item, index }) => (
          <XhomeItemCard
            key={index}
            width={width * 0.45}
            lineColor={"#fff"}
            item={item}
          />
        )}
        numColumns={2} // Set the number of columns dynamically
        columnWrapperStyle={styles.columnWrapper} // Optional: to add spacing between columns
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,

    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    marginBottom: width * 0.033,
  },
});

export default XhomeItemCards;
