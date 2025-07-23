import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import CustomImage from "../../../components/image/index";
import { images } from "../../../constant/images";
import { colors } from "../../../constant/colors";

import { banners } from "../../../constant/data";

const categories = [
  { name: "Shoes", image: images.shoes },
  { name: "Pants", image: images.pants },
  { name: "Trousers", image: images.trousers },
  { name: "Shirts", image: images.shirts },
  { name: "Cap", image: images.cap },
  { name: "Watch", image: images.watch },
];

const { width, height } = Dimensions.get("window");
const bannerWidth = width * 0.75;
const bannerHeight = height * 0.2;

const CategoryBanner = ({ onBannerPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners?.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / bannerWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
        getItemLayout={(_, index) => ({
          length: bannerWidth,
          offset: bannerWidth * index,
          index,
        })}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onBannerPress && onBannerPress(item)}
            style={[
              styles.banner,
              {
                width: bannerWidth,
                height: bannerHeight,
                alignSelf: "flex-end",
              },
            ]}
          >
            <CustomImage
              source={item.image}
              size={"100%"}
              borderRadius={10}
              resizeMode="cover"
            />

            {/* <View style={styles.bannerContent}>
              <CustomLabel color="#000" fontFamily="poppinsBold" fontSize={24}>
                {item.title}
              </CustomLabel>
              <CustomLabel
                fontFamily="poppinsMedium"
                fontSize={16}
                color="#000"
              >
                {item.text}
              </CustomLabel>
              <CustomButton
                fontSize={10}
                title="View Details"
                borderRadius={100}
                backgroundColor={colors.LightGray}
                textColor="#000"
                paddingHorizontal={30}
                paddingVertical={8}
              />
            </View> */}
          </TouchableOpacity>
        )}
      />

      {/* Dot Indicators */}
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              flatListRef.current?.scrollToIndex({ index, animated: true })
            }
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeIndex === index ? colors.LightGray : "rgba(0,0,0,0)",
                width: activeIndex === index ? 34 : 22,
                borderWidth: activeIndex === index ? 0 : 0.5,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 20,
  },
  banner: {
    overflow: "hidden",
    alignItems: "center",
    padding: 10,
  },

  bannerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "center",
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
    borderColor: colors.LightGray,
  },
});

export default CategoryBanner;
