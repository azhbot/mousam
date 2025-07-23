import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import CustomImage from "../../../components/image";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { colors } from "../../../constant/colors";

const { width } = Dimensions.get("window");

const SavedCompanies = ({ companies }) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(companies, "in savedCompanies");
  }, [companies]);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("company", { companyId: item.id })}
      style={styles.store}
    >
      <View style={styles.imageContainer}>
        <CustomImage
          source={item?.logo}
          size={width * 0.14}
          resizeMode="cover"
        />
      </View>
      <View style={styles.nameAndIcon}>
        <CustomLabel numberOfLines={1} fontSize={12}>
          {item.name}
        </CustomLabel>
        <Icon
          color={colors.tertiary}
          name="verified"
          library="materialIcons"
          size={16}
        />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={companies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ gap: 20 }}
        renderItem={renderItem}
      />

      <Pressable
        style={styles.viewMore}
        onPress={() => navigation.navigate("savedList", { companies })}
      >
        <Icon name="chevron-right" size={30} />
        <CustomLabel fontFamily="poppinsMedium">All</CustomLabel>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  store: {
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.16,
    height: width * 0.16,
    backgroundColor: "#fff",
    borderRadius: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.tertiary,
  },
  nameAndIcon: {
    width: width * 0.2,
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  viewMore: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SavedCompanies;
