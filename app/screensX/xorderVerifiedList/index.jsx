import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  BackHandler,
  Text,
} from "react-native";
import CustomLabel from "../../components/label";
import Icon from "../../components/icon";
import XorderVerifiedListCard from "./components/xorderVerifiedListCard";
import XorderVerifiedListButton from "./components/xorderVerifiedListButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectVerifiedOrderProducts } from "../../redux/order/orderSelector";
import { useEffect, useMemo, useRef, useState } from "react";
import { colors } from "../../constant/colors";
import Dropdown from "../../components/dropdown";
import { showMessage } from "../../utils/customMsgUtil";
import {
  addToCompanyOrderInvoices,
  addToVerifiedOrdersFiles,
} from "../../redux/order/orderSlice";

import dayjs from "dayjs";
import { nanoid } from "nanoid";

const XorderVerifiedListScreen = () => {
  const dispatch = useDispatch();
  const dotsRef = useRef(null);

  const [verifiedOrders, setVerifiedOrders] = useState([]);
  const [showDownload, setShowDownload] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [inputFileName, setInputFileName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const _verifiedOrders = useSelector(selectVerifiedOrderProducts);

  // useEffect(() => {
  //   console.log(_verifiedOrder, "in xorderverifiedlist");
  // }, []);

  useEffect(() => {
    const filtered = _verifiedOrders.filter(
      (order) => order.status !== "acceptedAndCancelled"
    );
    setVerifiedOrders(filtered);
  }, [_verifiedOrders]);

  useEffect(() => {
    const backAction = () => {
      if (showDownload || showCreateFile) {
        setSelectedCards({});
        setShowDownload(false);
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
  }, [showDownload, showCreateFile]);

  const handleDotsPress = () => {
    if (showDownload) return;
    dotsRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPosition({ top: y + height + 40, left: x - 140 });
      setShowDropdown(true);
    });
  };

  const handleSelectOption = (option) => {
    console.log("Selected:", option);
    setShowDropdown(false);
  };

  const handleFileCreation = () => {
    if (!inputFileName) return showMessage("File Name is required");

    const ids = verifiedOrders
      .filter((order) => !order.fileId)
      .map((order) => order.id);
    if (ids.length === 0) return console.warn("No orders selected.");

    const newFile = {
      id: nanoid(10),
      createdAt: new Date(),
      date: dayjs().format("MMMM D, YYYY, h:mm A"),
      fileName: inputFileName,
      ids,
    };

    dispatch(addToVerifiedOrdersFiles(newFile));
    setShowCreateFile(false);
    showMessage("File Created Successfully");
  };

  const handleInvoiceBottonPress = () => {
    if (!showDownload) setShowCreateFile(true);
  };

  const handleCardSelectFirst = (v) => {
    if (!showDownload) {
      setSelectedCards({ [v.id]: v });
      setShowDownload(true);
    }
  };

  const handleCardSelect = (v) => {
    if (!showDownload) return;
    setSelectedCards((prev) => {
      const updated = { ...prev };
      if (updated[v.id]) {
        delete updated[v.id];
      } else {
        updated[v.id] = v;
      }
      if (Object.keys(updated).length === 0) setShowDownload(false);
      return updated;
    });
  };

  const handleForward = () => {
    dispatch(addToCompanyOrderInvoices(Object.values(selectedCards)));
    showMessage("Forwarded");
    setSelectedCards({});
    setShowDownload(false);
  };

  const getIdsLength = () =>
    verifiedOrders.filter((order) => !order.fileId).length;

  const renderItem = ({ item, index }) => {
    if (item.type === "fileMarker") {
      return (
        <View style={{ padding: 10, alignItems: "center" }}>
          <View style={styles.fileMarker}>
            <CustomLabel color={colors.gray} fontSize={12}>
              📁 {item.fileName} — {item?.date}
            </CustomLabel>
          </View>
        </View>
      );
    }

    return (
      <XorderVerifiedListCard
        index={index}
        verifiedOrder={item}
        isSelected={!!selectedCards[item.id]}
        onPress={() => handleCardSelect(item)}
        onLongPress={() => handleCardSelectFirst(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <View style={styles.titleLeft}>
          <CustomLabel fontFamily="interMedium">Menu</CustomLabel>
          <Icon name="chevron-right" />
          <CustomLabel fontFamily="interMedium">Verified Orders</CustomLabel>
        </View>
        <TouchableOpacity onPress={handleDotsPress} ref={dotsRef}>
          <Icon name="dots-vertical" />
        </TouchableOpacity>
      </View>

      {verifiedOrders?.length === 0 ? (
        <View style={styles.empty}>
          <CustomLabel color={colors.gray}>No Orders</CustomLabel>
        </View>
      ) : (
        <FlatList
          data={verifiedOrders || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <XorderVerifiedListButton
        onPress={handleInvoiceBottonPress}
        title="Make Total"
        disabled={getIdsLength() === 0}
        disabledColor={colors.LightGray}
      />

      {showCreateFile && (
        <Pressable
          onPress={() => setShowCreateFile(false)}
          style={styles.fileCreate}
        >
          <View style={styles.fileCreateContent}>
            <View style={styles.fileCreateHeader}>
              <CustomLabel fontFamily="interRegular" color={colors.gray}>
                File Name ( {getIdsLength()} )
              </CustomLabel>
              <Icon name="close" size={16} />
            </View>
            <TextInput
              placeholderTextColor={colors.LightGray}
              placeholder="Write here"
              style={styles.input}
              numberOfLines={1}
              value={inputFileName}
              onChangeText={setInputFileName}
            />
            <Button
              onPress={handleFileCreation}
              title="OK"
              style={styles.OkButton}
            />
          </View>
        </Pressable>
      )}

      {showDownload && (
        <View style={styles.forwardBoxContainer}>
          <Pressable onPress={handleForward} style={styles.forwardBox}>
            <Icon name={"share-all"} />
          </Pressable>
          <Pressable onPress={handleForward} style={styles.forwardBox}>
            <Icon color={colors.red} name={"trash-can"} />
          </Pressable>
        </View>
      )}

      <Dropdown
        visible={showDropdown}
        dropdownList={["All Forward", "All Clear"]}
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
  fileCreateHeader: {
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
  OkButton: {
    borderRadius: 100,
  },
  forwardBoxContainer: {
    position: "absolute",
    width: "100%",
    bottom: "20%",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    gap: 20,
  },

  forwardBox: {
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
  fileMarker: {
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.veryLightGray,
  },
});

export default XorderVerifiedListScreen;
