import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  Modal,
} from "react-native";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { useState } from "react";
import Camera from "../../../components/camera";
import CustomImage from "../../../components/image";
import { colors } from "../../../constant/colors";

const { height } = Dimensions.get("window");

const XofficeDp = () => {
  const [visible, setVisible] = useState(false);
  const [dpUri, setDpUri] = useState(null);
  const [backgroundUri, setBackgroundUri] = useState(null);
  const [cameraPurpose, setCameraPurpose] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageType, setModalImageType] = useState(""); // "dp" or "background"

  const handleImageSelect = (uri) => {
    if (!uri) return;
    console.log("handleImageSelect is on");
    if (cameraPurpose === "dp") {
      setDpUri(uri);
    } else if (cameraPurpose === "background") {
      setBackgroundUri(uri);
    }

    setVisible(false);
    setCameraPurpose("");
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.title}>
        <CustomLabel>Final Registration</CustomLabel>
      </View>

      {/* Background Section */}
      <View style={styles.background}>
        {backgroundUri && (
          <Pressable
            onPress={() => {
              setModalImageType("background");
              setModalVisible(true);
            }}
            style={{ height: "100%", width: "100%" }}
          >
            <Image
              source={{ uri: backgroundUri }}
              style={styles.backgroundImage}
            />
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            setCameraPurpose("background");
            setVisible(true);
          }}
          style={styles.circle}
        >
          <Icon name="camera" library="entypo" size={24} />
        </Pressable>
      </View>

      {/* DP Section */}
      <View style={styles.dp}>
        {dpUri && (
          <Pressable
            onPress={() => {
              setModalImageType("dp");
              setModalVisible(true);
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <CustomImage
              source={{ uri: dpUri }}
              resizeMode="cover"
              size={height * 0.18}
              borderRadius={200}
              style={{ borderWidth: 2, borderColor: "#fff" }}
            />
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            setCameraPurpose("dp");
            setVisible(true);
          }}
          style={styles.circle}
        >
          <Icon name="camera" library="entypo" size={24} />
        </Pressable>
      </View>

      {/* Camera Modal */}
      <Camera
        visible={visible}
        onClose={() => {
          setVisible(false);
          setCameraPurpose("");
        }}
        onImageSelect={handleImageSelect}
      />

      {/* Image Preview Modal */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setModalImageType("");
        }}
        presentationStyle="fullScreen"
      >
        <View style={styles.modalContent}>
          {modalImageType === "dp" && dpUri && (
            <CustomImage source={{ uri: dpUri }} size="100%" />
          )}
          {modalImageType === "background" && backgroundUri && (
            <CustomImage source={{ uri: backgroundUri }} size="100%" />
          )}
          <CustomLabel>hi modal</CustomLabel>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.32,
  },
  title: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  background: {
    height: height * 0.18,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: colors.veryLightGray,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  dp: {
    height: height * 0.18,
    width: height * 0.18,
    backgroundColor: colors.veryLightGray,
    borderRadius: height * 0.09,
    alignSelf: "center",
    bottom: height * 0.1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderWidth: 1,
    borderColor: colors.LightGray,
    // overflow: "hidden",
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default XofficeDp;
