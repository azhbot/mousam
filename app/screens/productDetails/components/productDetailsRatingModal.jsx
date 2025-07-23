import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import CustomButton from "../../../components/button";
import { colors } from "../../../constant/colors";

const ProductDetailsRatingModal = ({ visible, onClose, onPost }) => {
  const [comment, setComment] = useState([]);
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSend = () => {
    if (input.trim() || rating || selectedImage) {
      const newFeedback = {
        text: input.trim(),
        stars: rating,
        image: selectedImage,
      };
      setComment((prev) => [...prev, newFeedback]);
      setInput("");
      setRating(0);
      setSelectedImage(null);

      if (onPost) {
        onPost(newFeedback);
      }
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Pressable key={i} onPress={() => setRating(i)}>
          <Text
            style={{
              fontSize: 28,
              color: i <= rating ? colors.tertiary : "#ccc",
            }}
          >
            ★
          </Text>
        </Pressable>
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
        transparent
        statusBarTranslucent
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.2)", flex: 1 }}>
          <Pressable onPress={onClose} style={styles.closeSpace} />
          <View style={styles.header}>
            <CustomLabel fontSize={18} fontFamily={"interBold"}>
              Ratings
            </CustomLabel>
            <Pressable onPress={onClose}>
              <Icon name="close" />
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {/* Upload Image */}
              <View style={{ padding: 16 }}>
                <CustomLabel fontSize={16}>Upload Image</CustomLabel>
                <Pressable
                  onPress={handlePickImage}
                  style={{ marginVertical: 10 }}
                >
                  <View style={styles.imageUploadBox}>
                    {selectedImage ? (
                      <Image
                        source={{ uri: selectedImage }}
                        style={styles.imagePreview}
                      />
                    ) : (
                      <Text>+ Add</Text>
                    )}
                  </View>
                </Pressable>

                <CustomLabel fontSize={16}>Rate the Product</CustomLabel>
                {renderStars()}
              </View>

              {/* Comment Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a comment..."
                  value={input}
                  onChangeText={setInput}
                  multiline
                />
              </View>

              <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                <CustomButton
                  title="Send"
                  onPress={handleSend}
                  backgroundColor={colors.tertiary}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ProductDetailsRatingModal;

const styles = StyleSheet.create({
  closeSpace: {
    height: 300,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  content: {
    flex: 1,

    backgroundColor: "#fff",

    elevation: 1,
  },
  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 60,
    textAlignVertical: "top",
  },
  imageUploadBox: {
    width: 100,
    height: 100,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
