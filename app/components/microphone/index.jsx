import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const Microphone = ({ visible, onClose }) => {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [URI, setURI] = useState("");

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      setURI(uri);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  const handleRecordPress = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.statusText}>
          {recording
            ? "Recording..."
            : URI
            ? "Recording Saved!"
            : "Press to Record"}
        </Text>

        <Pressable
          onPress={handleRecordPress}
          style={[
            styles.recordButton,
            recording ? styles.recording : styles.idle,
          ]}
        >
          <MaterialIcons
            name={recording ? "stop" : "mic"}
            size={48}
            color="#fff"
          />
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  statusText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 40,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  idle: {
    backgroundColor: "#ff3d00",
  },
  recording: {
    backgroundColor: "#d50000",
  },
});

export default Microphone;
