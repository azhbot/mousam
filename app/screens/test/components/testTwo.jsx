import { View, StyleSheet, Text, ScrollView } from "react-native";
import { images } from "../../../constant/images";
import { useCallback } from "react";
import CustomImage from "../../../components/image";

const arr = Array(1000).fill("item");

const TestTwo = () => {
  return (
    <ScrollView style={{ backgroundColor: "pink", flex: 1 }}>
      {arr.map((_, index) => (
        <CustomImage source={images.banner1} size={150} key={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default TestTwo;
