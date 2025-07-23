import { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

const Playback = ({ URI }) => {
  const [sound, setSound] = useState();

  useEffect(() => {
    console.log("in playback ", URI);
  }, [URI]);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: URI });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});

export default Playback;
