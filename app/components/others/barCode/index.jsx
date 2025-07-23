import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const WIDTH = Dimensions.get("window").width * 0.8;

const Barcode = ({
  value = "EXPO123456",
  format = "code128",
  scale = 3,
  barcodeHeight = 10,
  includeText = true,
  textAlign = "center",
}) => {
  const canvasWidth = WIDTH;
  const canvasHeight = barcodeHeight * scale + (includeText ? 20 : 0);

  const html = `
    <html>
      <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;">
        <canvas id="canvas" width="${canvasWidth}" height="${canvasHeight}"></canvas>
        <script src="https://unpkg.com/bwip-js/dist/bwip-js-min.js"></script>
        <script>
          try {
            bwipjs.toCanvas(document.getElementById('canvas'), {
              bcid: '${format}',
              text: '${value}',
              scale: ${scale},
              height: ${barcodeHeight},
              includetext: ${includeText},
              textxalign: '${textAlign}',
            });
          } catch (e) {
            document.body.innerHTML = '<pre>' + e + '</pre>';
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.container, { width: canvasWidth, height: canvasHeight }]}
      >
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          style={{ width: "100%", height: "100%" }}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});

export default Barcode;
