import { View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import SavedListHeader from "./components/savedListHeader";
import SavedListCompany from "./components/savedListCompany";
import LoadingOverlay from "../../components/loading/loadingOverlay";

const SavedListScreen = ({ route }) => {
  const companies = route.params.companies;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(companies);
  // }, [companies]);

  const handleButtonPress = () => {
    console.log("pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <SavedListHeader />
      {loading && <LoadingOverlay />}
      <FlatList
        data={companies}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <SavedListCompany company={item} setLoading={setLoading} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SavedListScreen;
