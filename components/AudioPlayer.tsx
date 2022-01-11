import { Audio } from "expo-av";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Subheading,
  Text,
} from "react-native-paper";
interface Props {
  src: string;
}
const AudioPlayer = ({ src }: Props) => {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [loading, setLoading] = useState(true);
  async function playSound() {
    clearAll();

    await sound?.playAsync();
  }

  async function pauseSound() {
    clearAll();
    await sound?.pauseAsync();
  }

  const [timers, setTimers] = useState<NodeJS.Timer[]>([]);
  function clearAll() {
    timers.forEach((t) => clearInterval(t));
  }
  async function fadeIn() {
    if (!sound) return;
    clearAll();
    const interval = setInterval(async () => {
      // @ts-ignore
      const { volume } = await sound?.getStatusAsync();
      console.log(volume);
      if (volume > 0.9) {
        console.log(`Clearing`);
        clearInterval(interval);
      } else {
        const newVolume = volume + 0.05;
        console.log(`New Volume: `, newVolume);
        await sound?.setVolumeAsync(newVolume);
      }
    }, 100);
    setTimers((prev) => [...prev, interval]);
  }

  async function fadeOut() {
    if (!sound) return;
    clearAll();
    const interval = setInterval(async () => {
      // @ts-ignore
      const { volume } = await sound?.getStatusAsync();
      console.log(volume);
      if (volume < 0.1) {
        console.log(`Clearing`);
        clearInterval(interval);
      } else {
        const newVolume = volume - 0.05;
        console.log(`New Volume: `, newVolume);
        await sound?.setVolumeAsync(newVolume);
      }
    }, 100);
    setTimers((prev) => [...prev, interval]);
  }

  const [error, setError] = useState(false);
  React.useEffect(() => {
    Audio.Sound.createAsync({
      uri: src,
    })
      .then(({ sound }) => {
        setSound(sound);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return <Subheading>'Error'</Subheading>;
  if (loading) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        icon="play"
        onPress={playSound}
      >
        Play
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        icon="pause"
        onPress={pauseSound}
      >
        Pause
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        icon="pause"
        onPress={fadeIn}
      >
        Fade In
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        icon="pause"
        onPress={fadeOut}
      >
        Fade Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    margin: 2,
  },
});
export default AudioPlayer;
