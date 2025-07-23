import { View, StyleSheet, Modal } from "react-native";
import CustomImage from "../image";
import CustomLabel from "../label";

const ImagePreview = ({ visible = false, onClose = () => {}, uri, source }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <View style={styles.modalContent}>
        {uri && <CustomImage source={{ uri: uri }} size="100%" />}
        {source && <CustomImage source={source} size="100%" />}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#000",
  },
});

export default ImagePreview;
