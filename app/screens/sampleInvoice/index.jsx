import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constant/colors";
import Dropdown from "../../components/dropdown";
import { showMessage } from "../../utils/customMsgUtil";
import PopupOptions from "../../components/popupOptions";
import SampleInvoiceCard from "./components/sampleInvoiceCard";
import { selectManufacturerSamplesInvoices } from "../../redux/sample/sampleSelector";

const SampleInvoiceScreen = () => {
  const dispatch = useDispatch();

  const [showPopupOptions, setShowPopupOptions] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dotsRef = useRef(null);

  const samplesInvoices = useSelector(selectManufacturerSamplesInvoices);

  useEffect(() => {
    const backAction = () => {
      if (showPopupOptions) {
        setSelectedCards({});
        setShowPopupOptions(false);
        return true; // blocks default back action
      }
      return false; // allow default back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [showPopupOptions]);

  const handleDotsPress = () => {
    if (showPopupOptions) return;
    dotsRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPosition({ top: y + height + 40, left: x - 140 });
      setShowDropdown(true);
    });
  };

  const handleSelectOption = (option) => {
    console.log("Selected:", option);
    setShowDropdown(false);
  };

  const handleInvoiceBottonPress = () => {
    if (showPopupOptions) return;
    console.log("hii");
    setShowCreateFile(true);
  };

  const handleCardSelectFirst = (v) => {
    if (showPopupOptions) return;
    setSelectedCards({ [v.id]: v });
    setShowPopupOptions(true);
  };

  const handleCardSelect = (v) => {
    if (!showPopupOptions) return;

    setSelectedCards((prev) => {
      const updated = { ...prev };
      if (updated[v.id]) {
        delete updated[v.id];
      } else {
        updated[v.id] = v;
      }

      // If after update it's empty, hide download box
      if (Object.keys(updated).length === 0) {
        setShowPopupOptions(false);
      }

      return updated;
    });
  };

  const handlePopupOption = () => {
    showMessage("complete");
    setSelectedCards({});
    setShowPopupOptions(false);
  };

  const renderItem = ({ item, index }) => (
    <SampleInvoiceCard
      index={index}
      sampleInvoice={item}
      isSelected={!!selectedCards[item.id]}
      onPress={(v) => handleCardSelect(v)}
      onLongPress={(v) => handleCardSelectFirst(v)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <XorderVerifiedListHeader /> */}
      <View style={styles.title}>
        <View style={styles.titleLeft}>
          <CustomLabel fontFamily="interMedium">Account</CustomLabel>
          <Icon name="chevron-right" />
          <CustomLabel fontFamily="interMedium">Sample Invoices</CustomLabel>
        </View>

        <TouchableOpacity onPress={handleDotsPress} ref={dotsRef}>
          <Icon name="dots-vertical" />
        </TouchableOpacity>
      </View>
      {samplesInvoices.length === 0 ? (
        <View style={styles.empty}>
          <CustomLabel color={colors.gray}>No Sample Invoices</CustomLabel>
        </View>
      ) : (
        <FlatList
          data={samplesInvoices || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }} // Prevents last item from being cut off
          showsVerticalScrollIndicator={false}
        />
      )}

      {showCreateFile && (
        <Pressable
          onPress={() => setShowCreateFile(false)}
          style={styles.fileCreate}
        >
          <View style={styles.fileCreateContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomLabel fontFamily="interRegular" color={colors.gray}>
                File Name
              </CustomLabel>
              <Icon name="close" size={16} />
            </View>

            <TextInput
              placeholderTextColor={colors.LightGray}
              placeholder="Write here"
              style={styles.input}
              numberOfLines={1}
            />
            <Button title="OK" style={styles.OkButton} />
          </View>
        </Pressable>
      )}

      <PopupOptions
        visible={showPopupOptions}
        options={["Delete", "Download", "Share", "Print"]}
        onClose={() => setShowPopupOptions(false)}
        onOptionSelect={handlePopupOption}
      />

      <Dropdown
        visible={showDropdown}
        dropdownList={["All clear", "All download", "All Share", "All print"]}
        onSelect={handleSelectOption}
        onClose={() => setShowDropdown(false)}
        dropdownPosition={dropdownPosition}
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

  fileCreate: {
    position: "absolute",
    alignItems: "center",
    paddingTop: "70%",
    bottom: 100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.1)",
  },
  fileCreateContent: {
    padding: 20,

    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: colors.LightGray,
    marginVertical: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  OkButton: {
    borderRadius: 100,
  },
  forwardBox: {
    position: "absolute",
    width: "100%",
    bottom: 200,
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  forwardBoxCentent: {
    backgroundColor: "#FFF",
    padding: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
});

export default SampleInvoiceScreen;
