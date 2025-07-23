import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { colors } from "../../constant/colors";
import SearchItemCards from "./components/SearchItemCards";
import { cardList } from "../../constant/data";
import Icon from "../../components/icon";
import Microphone from "../../components/microphone";
import Camera from "../../components/camera";
import CustomLabel from "../../components/label";
import { useDispatch, useSelector } from "react-redux";
import { selectSearches } from "../../redux/search/searchSelector";
import { addSearch, removeSearch } from "../../redux/search/searchSlice";

const SearchScreen = ({ route }) => {
  const dispatch = useDispatch();

  const [showCamera, setShowCamera] = useState(false);
  const [showMic, setShowMic] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searches = useSelector(selectSearches);

  useEffect(() => {
    console.log(cardList[0].name);
  }, [cardList]);

  useEffect(() => {
    if (route.params?.openCamera) {
      setShowCamera(true);
    }
    if (route.params?.openMic) {
      setShowMic(true);
    }
  }, [route.params]);

  const handleInputChange = (text) => {
    setSearch(text);
    setHasSearched(false);
  };

  const handleSearchSubmit = () => {
    const trimmed = search.trim();
    if (trimmed.length === 0) return;

    const filtered = cardList.filter((item) =>
      item.name.toLowerCase().includes(trimmed.toLowerCase())
    );
    setFilteredList(filtered);
    setHasSearched(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (!searches?.includes(trimmed)) {
      dispatch(addSearch(trimmed));
    }
  };

  const handleRecentPress = (item) => {
    setSearch(item);
    const filtered = cardList.filter((i) =>
      i.name.toLowerCase().includes(item.toLowerCase())
    );
    setFilteredList(filtered);
    setHasSearched(true);
  };

  const handleRemoveRecent = (item) => {
    dispatch(removeSearch(item)); // ✅ FIXED HERE
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={search}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoFocus
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setShowMic(true)}>
              <Icon name="mic" library="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCamera(true)}>
              <Icon name="camera" library="feather" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ margin: 10, flex: 1 }}>
          {!hasSearched ? (
            <FlatList
              data={searches}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View style={styles.recentItem}>
                  <Pressable
                    style={styles.recentTextWrapper}
                    onPress={() => handleRecentPress(item)}
                  >
                    <CustomLabel>{item}</CustomLabel>
                  </Pressable>

                  <Pressable
                    onPress={() => handleRemoveRecent(item)}
                    style={styles.recentDelete}
                  >
                    <Icon name="close" />
                  </Pressable>
                </View>
              )}
              ListHeaderComponent={() =>
                searches.length > 0 ? (
                  <View style={styles.recentHeader}>
                    <CustomLabel fontFamily="interBold" fontSize={16}>
                      Recent Searches
                    </CustomLabel>
                  </View>
                ) : null
              }
            />
          ) : (
            <SearchItemCards
              filteredList={filteredList}
              isLoading={isLoading}
            />
          )}
        </View>
      </View>

      {showMic && (
        <Microphone visible={showMic} onClose={() => setShowMic(false)} />
      )}
      {showCamera && (
        <Camera visible={showCamera} onClose={() => setShowCamera(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 15,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 10,
  },
  recentHeader: {
    marginVertical: 10,
  },
  recentItem: {
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  recentTextWrapper: {
    height: "100%",
    justifyContent: "center",
    paddingRight: 8,
  },
  recentDelete: {
    width: 40,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchScreen;
