import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import Icon from "../../../components/icon";
import CustomLabel from "../../../components/label";
import { colors } from "../../../constant/colors";
import { useEffect, useState } from "react";
import Camera from "../../../components/camera";
import CustomImage from "../../../components/image";
import ImagePreview from "../../../components/imagePreview";

const { height, width } = Dimensions.get("window");
const IMG_WIDTH = width - 30;
const IMG_HEIGHT = (IMG_WIDTH * 4) / 3;

const XaddProductPhotoUpload = ({ uploadPhotos, images, setImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cameraVisible, setCameraVisible] = useState(false);

  const [previewVisible, setPreViewVisible] = useState(false);

  useEffect(() => {
    console.log(images, "in xaddproductphotoupload");
  }, [images]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 30));
    setActiveIndex(index);
  };

  const handleImage = (uri) => {
    const updatedImages = [...images];
    updatedImages[activeIndex] = uri;
    setImages(updatedImages);
    setCameraVisible(false);
  };

  const handlePreview = () => {
    setPreViewVisible(true);
  };

  return (
    <View style={styles.container}>
      <CustomLabel fontSize={16} style={{ paddingLeft: 15 }}>
        Add New Product
      </CustomLabel>

      <FlatList
        data={uploadPhotos}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        onScroll={handleScroll}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={({ index }) => (
          <View>
            {images[index] ? (
              <View style={styles.uploadedBox}>
                <Pressable onPress={handlePreview}>
                  <CustomImage
                    source={
                      typeof images[index] === "number"
                        ? images[index] // static require
                        : images[index]
                        ? { uri: images[index] } // dynamic from camera
                        : null
                    }
                    ratio={3 / 4}
                    width={IMG_WIDTH}
                    resizeMode="cover"
                  />
                </Pressable>
                <Pressable
                  style={styles.editIcon}
                  onPress={() => {
                    setActiveIndex(index);
                    setCameraVisible(true);
                  }}
                >
                  <Icon name="edit" size={20} library="feather" color="white" />
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  setActiveIndex(index);
                  setCameraVisible(true);
                }}
                style={styles.uploadBox}
              >
                <View style={styles.box}>
                  <Icon name="plus" />
                </View>
                <CustomLabel>Upload photo of product</CustomLabel>
              </Pressable>
            )}
          </View>
        )}
      />

      <View style={styles.dots}>
        {uploadPhotos.map((_, index) => (
          <View
            style={activeIndex === index ? styles.activeDot : styles.dot}
            key={index.toString()}
          />
        ))}
      </View>

      <Camera
        visible={cameraVisible}
        onImageSelect={handleImage}
        onClose={() => setCameraVisible(false)}
        aspectRatio={[3, 4]}
      />
      <ImagePreview
        visible={previewVisible}
        source={
          typeof images[activeIndex] === "number" ? images[activeIndex] : null
        }
        uri={
          typeof images[activeIndex] !== "number" ? images[activeIndex] : null
        }
        onClose={() => setPreViewVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingVertical: 15,
  },
  uploadBox: {
    marginHorizontal: 15,
    borderRadius: 10,
    height: IMG_HEIGHT,
    width: IMG_WIDTH,
    borderWidth: 1,
    borderColor: colors.LightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: height * 0.05,
    width: height * 0.1,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  uploadedBox: {
    marginHorizontal: 15,
    position: "relative",
    width: IMG_WIDTH,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },

  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 20,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: colors.LightGray,
    borderRadius: 10,
  },
  activeDot: {
    height: 10,
    width: 10,
    backgroundColor: "red",
    borderRadius: 10,
  },
});

export default XaddProductPhotoUpload;
