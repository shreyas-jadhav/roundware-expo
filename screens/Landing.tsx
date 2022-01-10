import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../App";
import { theme } from "../styles/theme";

const LandingScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Landing">) => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        labelStyle={styles.labelStyle}
        mode="contained"
        onPress={() => navigation.navigate("Listen")}
      >
        Listen
      </Button>
      <Button
        style={styles.button}
        labelStyle={styles.labelStyle}
        mode="contained"
        onPress={() => navigation.navigate("Speak")}
      >
        Speak
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  button: {
    margin: 8,
    width: 200,
    height: 50,
  },
  labelStyle: {
    fontSize: 24,
  },
});
export default LandingScreen;
