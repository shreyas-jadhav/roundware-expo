import React, { useState } from "react";
import { View, Text } from "react-native";
import { Audio } from "expo-av";
import { Button } from "react-native-paper";

const ListenScreen = () => {
  const [sound, setSound] = React.useState<Audio.Sound>();

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

  React.useEffect(() => {
    Audio.Sound.createAsync(require("../assets/hmm.wav")).then(({ sound }) => {
      setSound(sound);
    });

    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button mode="contained" icon="play" onPress={playSound}>
        Play
      </Button>
      <Button mode="contained" icon="pause" onPress={pauseSound}>
        Pause
      </Button>
      <Button mode="contained" icon="pause" onPress={fadeIn}>
        Fade In
      </Button>
      <Button mode="contained" icon="pause" onPress={fadeOut}>
        Fade Out
      </Button>
    </View>
  );
};

export default ListenScreen;
