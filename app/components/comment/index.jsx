import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import CustomLabel from "../label";
import Icon from "../icon";
import { colors } from "../../constant/colors";

const CommentsModal = ({ comments, visible, onClose, onPost }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onPost(input.trim());
      setInput("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentBubble}>
      <CustomLabel fontFamily={"interBold"}>{item?.userName}</CustomLabel>
      <CustomLabel>{item?.text}</CustomLabel>
      <CustomLabel fontSize={10} color={colors.LightGray}>
        {item?.createdAt}
      </CustomLabel>
    </View>
  );

  const FooterItem = () => {
    return <View style={{ height: 100 }} />;
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
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={80}
        >
          <Pressable onPress={onClose} style={styles.closeSpace} />

          <View style={styles.commentsList}>
            <View style={styles.header}>
              <CustomLabel fontSize={18} fontFamily={"interBold"}>
                Comments
              </CustomLabel>
              <Pressable onPress={onClose}>
                <Icon name="close" />
              </Pressable>
            </View>
            <FlatList
              data={comments.slice().reverse()}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              ListFooterComponent={FooterItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              blurOnSubmit={false}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
  },
  closeSpace: {
    height: 300,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: colors.LightGray,
    padding: 20,
  },
  commentsList: {
    flex: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: "#fff",
    paddingBottom: 80,
  },
  commentBubble: {
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
