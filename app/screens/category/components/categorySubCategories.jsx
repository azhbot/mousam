import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomImage from "../../../components/image";
import CustomLabel from "../../../components/label";
import { images } from "../../../constant/images";
import { colors } from "../../../constant/colors";

const { width } = Dimensions.get("window");

const containerWidth = width * 0.75 - 40;
const itemWidth = width * 0.16;
const numColumns = Math.max(Math.floor(containerWidth / itemWidth), 1);

const CategorySubCategories = ({ title, categoryId, subCategories = [] }) => {
  const navigation = useNavigation();

  // Early return if no subcategories to render nothing
  if (!subCategories || subCategories.length === 0) return null;

  return (
    <View style={styles.container}>
      <CustomLabel>{title}</CustomLabel>

      <FlatList
        data={subCategories}
        keyExtractor={(item, index) =>
          item.id?.toString() ?? `${title}-${index}`
        }
        scrollEnabled={false}
        numColumns={numColumns}
        columnWrapperStyle={{
          gap: width * 0.02,
          justifyContent: "flex-start", // Align columns left
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("products", {
                categoryId,
                subCategoryId: item?.subCategoryId,
              })
            }
            style={styles.subCategory}
          >
            <View style={styles.imageContainer}>
              <CustomImage
                source={item?.image || images.kurti}
                size={width * 0.12}
                style={styles.image}
              />
            </View>
            <CustomLabel fontSize={10} numberOfLines={1} ellipsizeMode="tail">
              {item?.subCategoryName || "Unknown"}
            </CustomLabel>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    width: width * 0.75,
    alignSelf: "center",
  },
  subCategory: {
    alignItems: "center",
    width: itemWidth,
    marginBottom: 10,
  },
  imageContainer: {
    width: itemWidth,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.LightGray,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
});

export default CategorySubCategories;
