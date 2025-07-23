import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useState } from "react";

const { width } = Dimensions.get("window");

const ProductDetailsSize = ({
  active,
  sizes = [],
  onSelectSize = () => {},
}) => {
  const [activeBox, setActiveBox] = useState(null);

  const handleSize = (size, index) => {
    if (!active) return;
    setActiveBox(index);
    onSelectSize(size);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.sizeBoxes}>
          {sizes.length > 0 ? (
            sizes.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => handleSize(item, index)}
                style={[
                  styles.sizeBox,
                  {
                    backgroundColor:
                      activeBox === index ? colors.tertiary : colors.secondary,
                  },
                ]}
              >
                <CustomLabel color={activeBox === index ? "#fff" : "#000"}>
                  {item}
                </CustomLabel>
              </Pressable>
            ))
          ) : (
            <CustomLabel>No sizes available</CustomLabel>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  sizeBoxes: {
    flexDirection: "row",
    alignItems: "center",
  },
  sizeBox: {
    height: 30,
    width: width * 0.17,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ProductDetailsSize;
