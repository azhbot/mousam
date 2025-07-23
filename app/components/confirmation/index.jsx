import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import CustomLabel from "../label";
import CustomButton from "../button";
import { colors } from "../../constant/colors";

const ConfirmationMsg = ({
  title = "title",
  msg = "msg",
  onConfirm,
  onclose,
  visible = false,
  list = null,
  isConfirmBlocked = false,
  onSelectItem = () => {},
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

  const handleConfirm = () => {
    if (list && !selectedItem) return; // Prevent confirm if nothing selected
    onConfirm(selectedItem);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onclose}
    >
      <TouchableWithoutFeedback onPress={onclose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <CustomLabel fontFamily="poppinsMedium" fontSize={16}>
                {title}
              </CustomLabel>
              <CustomLabel style={{ marginBottom: 10 }}>
                {msg || "Are you sure?"}
              </CustomLabel>

              {Array.isArray(list) && list.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContainer}
                >
                  {list.map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleSelectItem(item)}
                      style={[
                        styles.listItem,
                        selectedItem === item && styles.selectedItem,
                      ]}
                    >
                      <CustomLabel
                        color={selectedItem === item ? "#fff" : "#000"}
                      >
                        {item}
                      </CustomLabel>
                    </Pressable>
                  ))}
                </ScrollView>
              )}

              <View style={styles.buttons}>
                <CustomButton
                  title="No"
                  backgroundColor={colors.tertiary}
                  style={{ flex: 1 }}
                  onPress={onclose}
                  height={30}
                />
                <CustomButton
                  title="Yes"
                  backgroundColor={
                    list && !selectedItem ? colors.disabled : colors.tertiary
                  }
                  style={{ flex: 1, opacity: list && !selectedItem ? 0.5 : 1 }}
                  onPress={!isConfirmBlocked ? () => handleConfirm() : null}
                  height={30}
                  disabled={list && !selectedItem}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 300,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    alignItems: "center",
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    gap: 60,
  },
  scrollContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  listItem: {
    width: 60,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: colors.tertiary,
  },
});

export default ConfirmationMsg;
