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
import { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import XreturendAndCancelledCard from "./components/xreturnedAndCancelledCard";
import Dropdown from "../../components/dropdown";

import {
  selectReturnedAndCancelledVerifiedOrders,
  selectReturnedAndCancelledVerifiedOrdersFiles,
  selectVerifiedOrderProducts,
} from "../../redux/order/orderSelector";
import {
  addToOrderInvoices,
  addToReturnedAndCancelledVerifiedOrdersFiles,
} from "../../redux/order/orderSlice";
import { showMessage } from "../../utils/customMsgUtil";
import { colors } from "../../constant/colors";
import XreturnedAndCancelledButton from "./components/xreturnedAndCancelledButton";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { enhancedAnyOrdersUtil } from "../../utils/enhancedAnyOrdersUtil";
import XreturnedAndCancelledFile from "./components/xreturnedAdnCancelledFile";
import PopupOptions from "../../components/popupOptions";

const XreturnedAndCancelledScreen = () => {
  const dispatch = useDispatch();

  const [showDownload, setShowDownload] = useState(false);
  const [showDownloadForFile, setShowDownloadForFile] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [cancelledOrderFiles, setCancelledOrderFiles] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const dotsRef = useRef(null);

  const files = useSelector(selectReturnedAndCancelledVerifiedOrdersFiles);
  const returnAndCancelledVerifiedOrders = useSelector(
    selectReturnedAndCancelledVerifiedOrders
  );

  const enhancedVerifiedOrders = useMemo(
    () => enhancedAnyOrdersUtil(cancelledOrders),
    [cancelledOrders]
  );

  useEffect(() => {
    const filterData = returnAndCancelledVerifiedOrders.filter(
      (order) => !order.fileId
    );
    setCancelledOrders(filterData);
    setCancelledOrderFiles(files);
  }, [returnAndCancelledVerifiedOrders, files]);

  useEffect(() => {
    const backAction = () => {
      if (showDownload || showDownloadForFile || showCreateFile) {
        setSelectedCards({});
        setSelectedFiles({});
        setShowDownload(false);
        setShowDownloadForFile(false);
        setShowCreateFile(false);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [showDownload, showCreateFile, showDownloadForFile]);

  const handleDotsPress = () => {
    if (showDownload || showDownloadForFile) return;
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
    if (showDownload || showDownloadForFile) return;
    setShowCreateFile(true);
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

  const handleCardSelectFirst = (v) => {
    if (showDownload) return;
    setSelectedCards({ [v.id]: v });
    setShowDownload(true);
  };

  const handleCardSelect = (v) => {
    if (!showDownload) return;
    setSelectedCards((prev) => {
      const updated = { ...prev };
      if (updated[v.id]) delete updated[v.id];
      else updated[v.id] = v;

      if (Object.keys(updated).length === 0) setShowDownload(false);
      return updated;
    });
  };

  const handleForward = () => {
    const selectedCardsArray = Object.values(selectedCards);
    // dispatch(addToOrderInvoices(selectedCardsArray));
    showMessage("Forwarded");
    setSelectedCards({});
    setShowDownload(false);
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) {
      showMessage("File name required");
      return;
    }

    if (!cancelledOrders || cancelledOrders.length === 0) {
      showMessage("No verified products to group");
      return;
    }

    const ids = cancelledOrders.map((order) => order.id);
    const now = new Date();
    const date = dayjs(now).format("MMMM D, YYYY, h:mm A");
    const newFile = {
      id: nanoid(10),
      date: date,
      fileName: newFileName,
      ids,
    };

    dispatch(addToReturnedAndCancelledVerifiedOrdersFiles(newFile));
    setShowCreateFile(false);
    setNewFileName("");
    showMessage("File created successfully");
  };

  const mergedData = useMemo(() => {
    return [
      // { type: "header", title: "Cancelled Files" },
      ...cancelledOrderFiles.map((item) => ({
        ...item,
        type: "cancelled",
      })),
      // { type: "header", title: "Verified Products" },
      ...(enhancedVerifiedOrders || []).map((item) => ({
        ...item,
        type: "verified",
      })),
    ];
  }, [cancelledOrderFiles, enhancedVerifiedOrders]);

  const getIdsLength = () => cancelledOrders.map((order) => order.id).length;

  const renderItem = ({ item, index }) => {
    switch (item.type) {
      case "header":
        return (
          <View style={{ padding: 10, backgroundColor: colors.veryLightGray }}>
            <CustomLabel fontFamily="interMedium">{item.title}</CustomLabel>
          </View>
        );
      case "cancelled":
        return (
          <XreturnedAndCancelledFile
            item={item}
            isSelected={!!selectedFiles[item.id]}
            onPress={(v) => handleFileSelect(v)}
            onLongPress={(v) => handleFileSelectFirst(v)}
          />
        );
      case "verified":
        return (
          <XreturendAndCancelledCard
            index={index}
            verifiedOrder={item}
            isSelected={!!selectedCards[item.id]}
            onPress={(v) => handleCardSelect(v)}
            onLongPress={(v) => handleCardSelectFirst(v)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <View style={styles.titleLeft}>
          <CustomLabel fontFamily="interMedium">Menu</CustomLabel>
          <Icon name="chevron-right" />
          <CustomLabel fontFamily="interMedium">
            Returned & Cancelled Orders
          </CustomLabel>
        </View>
        <TouchableOpacity onPress={handleDotsPress} ref={dotsRef}>
          <Icon name="dots-vertical" />
        </TouchableOpacity>
      </View>
      {mergedData?.length === 0 ? (
        <View style={styles.empty}>
          <CustomLabel color={colors.gray}>
            No Returned & Cancelled Orders
          </CustomLabel>
        </View>
      ) : (
        <FlatList
          data={mergedData}
          keyExtractor={(item, index) => item.id?.toString() || `key-${index}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showCreateFile && (
        <Pressable
          onPress={() => setShowCreateFile(false)}
          style={styles.fileCreate}
        >
          <View style={styles.fileCreateContent}>
            <View style={styles.rowBetween}>
              <CustomLabel fontFamily="interRegular" color={colors.gray}>
                File Name {"(" + cancelledOrders?.length + ")"}
              </CustomLabel>
              <TouchableOpacity onPress={() => setShowCreateFile(false)}>
                <Icon name="close" size={16} />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholderTextColor={colors.LightGray}
              placeholder="Write here"
              style={styles.input}
              value={newFileName}
              onChangeText={setNewFileName}
              numberOfLines={1}
            />
            <Button title="OK" onPress={handleCreateFile} />
          </View>
        </Pressable>
      )}

      {mergedData.lenght !== 0 && (
        <XreturnedAndCancelledButton
          onPress={handleInvoiceBottonPress}
          title="Make Total"
          disabled={getIdsLength() === 0}
          disabledColor={colors.LightGray}
        />
      )}

      <PopupOptions
        visible={showDownloadForFile}
        options={["Delete", "Download", "Share", "Print"]}
        onClose={() => setShowDownloadForFile(false)}
        onOptionSelect={handleFileForward}
      />
      <PopupOptions
        visible={showDownload}
        options={["Delete", "Download", "Share", "Print"]}
        onClose={() => setShowDownload(false)}
        onOptionSelect={handleForward}
      />

      <Dropdown
        visible={showDropdown}
        dropdownList={["All Clear", "All Download", , "All Share", "All Print"]}
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
  fileCreateDateContainer: {
    alignItems: "center",
  },
  fileCreateDate: {
    backgroundColor: colors.veryLightGray,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  fileCreate: {
    position: "absolute",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.1)",
    justifyContent: "center",
  },
  fileCreateContent: {
    padding: 20,
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: colors.LightGray,
    marginVertical: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});

export default XreturnedAndCancelledScreen;
