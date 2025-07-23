import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import Icon from "../icon";

const width = Dimensions.get("screen").width;
const HALF = width * 0.5 - 40;

// original one
const Camera = ({
  visible = false,
  onClose = () => {},
  onImageSelect = () => {},
  aspectRatio = [4, 4],
}) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState(null);
  const [camera, setCamera] = useState(null);

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const pickImageFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Sorry, we need media library permissions to access your photos!"
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [aspectRatio[0], aspectRatio[1]],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setPickedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPickedImage(photo.uri);
    }
  };

  const saveImage = () => {
    if (pickedImage) {
      onImageSelect(pickedImage);
      onClose();
      setPickedImage(null);
    }
  };

  const clearPickedImage = () => {
    setPickedImage(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      {!permission ? (
        <View />
      ) : !permission.granted ? (
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      ) : (
        <View style={styles.container}>
          {pickedImage ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: pickedImage }} style={styles.preview} />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearPickedImage}
              >
                <Icon
                  name="close-circle"
                  library="ionicons"
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CameraView
              style={styles.camera}
              facing={facing}
              ref={(ref) => setCamera(ref)}
            >
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraFacing}
                >
                  <Icon
                    name="flip-camera-android"
                    library="materialIcons"
                    color="white"
                    size={40}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <Icon
                    name="circle"
                    library="materialIcons"
                    color="white"
                    size={40}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={pickImageFromGallery}
                >
                  <Icon
                    name="insert-photo"
                    library="materialIcons"
                    color="white"
                    size={40}
                  />
                </TouchableOpacity>
              </View>
            </CameraView>
          )}
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  clearButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "#00000080",
    borderRadius: 20,
  },
  saveButton: {
    position: "absolute",
    bottom: 40,
    height: 80,
    width: 80,
    // width: "30%",
    left: HALF,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Camera;
