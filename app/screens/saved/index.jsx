import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SavedHeader from "./components/savedHeader";
import SavedCompanies from "./components/savedCompanies";
import SavedSort from "./components/savedSort";
import SavedItemCards from "./components/savedItemCards";
import SavedOptions from "./components/savedOptions";
import CustomLine from "../../components/line";
import CustomLabel from "../../components/label";
import { products } from "../../data/products";
import { cardList } from "../../constant/data";
import { selectSavedCompanies } from "../../redux/company/companySelector";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedScreen = () => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredList, setFilteredList] = useState([]);

  const savedCompanies = useSelector(selectSavedCompanies);

  // Filter products based on saved companies
  useEffect(() => {
    if (savedCompanies && savedCompanies.length > 0) {
      const savedCompanyIds = savedCompanies.map((c) => c.id);
      const filtered = products.filter((item) =>
        savedCompanyIds.includes(item.companyId)
      );
      setFilteredList(filtered);
    }
  }, [savedCompanies]);

  const handleOptions = (option) => setActiveOption(option);
  const handleSort = (sortType) => console.log("sort pressed:", sortType);

  if (!savedCompanies || savedCompanies.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <CustomLabel fontSize={16}>No saved companies found.</CustomLabel>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SavedHeader />
      <SavedCompanies companies={savedCompanies} />
      <SavedOptions handleOption={handleOptions} activeOption={activeOption} />
      <SavedSort handleSort={handleSort} />
      <SavedItemCards itemList={cardList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // optional: default background
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedScreen;
