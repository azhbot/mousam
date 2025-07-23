import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import CustomImage from "../../../components/image";
import { colors } from "../../../constant/colors";
import { banners } from "../../../constant/data";

const { width, height } = Dimensions.get("window");
const bannerWidth = width;
const bannerHeight = height * 0.26;

const HomeBanner = ({ onBannerPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;

        // Scroll without animation if looping from last to first
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: prevIndex !== banners.length - 1, // no animation when jumping to first
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
          <View
            style={[
              styles.banner,
              { width: bannerWidth, height: bannerHeight },
            ]}
          >
            <CustomImage
              source={item.image}
              size="100%"
              resizeMode="cover"
              borderRadius={10}
            />
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: "#fff",
                width: activeIndex === index ? 40 : 20,
                paddingVertical: activeIndex === index ? 2.5 : 0,
                borderColor: colors.LightGray,
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  banner: {
    overflow: "hidden",
    alignItems: "center",
    padding: width * 0.02,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 3,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default HomeBanner;
