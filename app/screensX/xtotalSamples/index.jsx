import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomLabel from "../../components/label";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constant/colors";
import Icon from "../../components/icon";
import { selectSamplesFiles } from "../../redux/sample/sampleSelector";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import XtotalSamplesCard from "./components/xtotalSamplesCard";
import Dropdown from "../../components/dropdown";
import PopupOptions from "../../components/popupOptions";
import { showMessage } from "../../utils/customMsgUtil";

const XtotalSamplesScreen = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showDownloadForFile, setShowDownloadForFile] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const dotsRef = useRef(null);

  const samplesFiles = useSelector(selectSamplesFiles);

  // useEffect(() => {
  //   console.log(samplesFiles, "xtotalSamples  mmmm");
  // }, [samplesFiles]);

  const handleDotsPress = () => {
    if (showDownloadForFile) return;
    dotsRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPosition({ top: y + height + 40, left: x - 140 });
      setShowDropdown(true);
    });
  };

  const handleSelectOption = (option) => {
    setShowDropdown(false);
    console.log("Selected option:", option);
  };

  const handleFileSelectFirst = (v) => {
    if (showDownloadForFile) return;
    setSelectedFiles({ [v.id]: v });
    setShowDownloadForFile(true);
  };

  const handleFileSelect = (v) => {
    if (!showDownloadForFile) return;
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      if (updated[v.id]) delete updated[v.id];
      else updated[v.id] = v;

      if (Object.keys(updated).length === 0) setShowDownloadForFile(false);
      return updated;
    });
  };

  const handleFileForward = () => {
    console.log("forwarded");
    showMessage("Complete");
    setShowDownloadForFile(false);
    setSelectedFiles({});
  };

  const renderItem = ({ item }) => {
    return (
      <XtotalSamplesCard
        item={item}
        isSelected={!!selectedFiles[item.id]}
        onPress={(v) => handleFileSelect(v)}
        onLongPress={(v) => handleFileSelectFirst(v)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <View style={styles.titleLeft}>
          <CustomLabel fontFamily="interMedium">Menu</CustomLabel>
          <Icon name="chevron-right" />
          <CustomLabel fontFamily="interMedium">Total Samples</CustomLabel>
        </View>

        <TouchableOpacity onPress={handleDotsPress} ref={dotsRef}>
          <Icon name="dots-vertical" />
        </TouchableOpacity>
      </View>
      {samplesFiles?.length === 0 ? (
        <View style={styles.empty}>
          <CustomLabel color={colors.gray}>No Info</CustomLabel>
        </View>
      ) : (
        <FlatList
          data={samplesFiles}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <Dropdown
        visible={showDropdown}
        dropdownList={["All Clear", "All Share", "All Download", "All Print"]}
        onSelect={handleSelectOption}
        onClose={() => setShowDropdown(false)}
        dropdownPosition={dropdownPosition}
      />

      <PopupOptions
        visible={showDownloadForFile}
        options={["Delete", "Download", "Share", "Print"]}
        onClose={() => setShowDownloadForFile(false)}
        onOptionSelect={handleFileForward}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
  titleLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default XtotalSamplesScreen;
