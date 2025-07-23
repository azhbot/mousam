import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import CustomLabel from "../../../components/label";
import Icon from "../../../components/icon";
import { colors } from "../../../constant/colors";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user/userSelector";
import CustomImage from "../../../components/image";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

const AccountPersonal = ({ handlePersonalPress }) => {
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(user?.dp, "in account personal");
  }, [user]);

  return (
    <Pressable
      onPress={handlePersonalPress}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={`User personal details: ${user?.name}`}
    >
      <View style={styles.containerLeft}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={user?.dp ? { uri: user.dp } : null}
            size={width * 0.2}
            borderRadius={width * 0.2}
            resizeMode="cover"
          />
        </View>
        <View>
          <CustomLabel fontFamily="poppinsBold" fontSize={20}>
            {user?.name || "Unknown User"}
          </CustomLabel>
          <CustomLabel fontFamily="poppinsMedium">
            {user?.email || "No email"}
          </CustomLabel>
          <CustomLabel color={colors.gray}>
            {user?.phone || "No phone number"}
          </CustomLabel>
        </View>
      </View>

      <Icon name="chevron-right" size={26} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  containerLeft: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    height: width * 0.2,
    width: width * 0.2,
    backgroundColor: colors.LightGray,
    borderRadius: width * 0.2,
    marginRight: 20,
  },
});

export default AccountPersonal;
