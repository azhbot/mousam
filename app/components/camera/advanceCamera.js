import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";

const CameraGallery = ({ visible, onClose, onImageSelect }) => {
  const [pickedImage, setPickedImage] = useState(null);

  // Function to take a photo with the camera
  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPickedImage(uri);
      onImageSelect(uri); // Call onImageSelect with the captured photo URI
    }
  };

  // Function to open the gallery
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPickedImage(uri);
      onImageSelect(uri); // Call onImageSelect with the selected image URI
    }
  };

  useEffect(() => {
    if (visible) {
      takePhotoWithCamera();  // Automatically open the camera when modal is visible
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Display captured image */}
        {pickedImage && <Image source={{ uri: pickedImage }} style={styles.preview} />}

        {/* Option to open the gallery */}
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.text}>Open Gallery</Text>
        </TouchableOpacity>

        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#00000080",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  preview: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginTop: 20,
    borderRadius: 10,
  },
});

export default CameraGallery;
