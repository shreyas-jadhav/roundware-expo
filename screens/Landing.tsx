import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline, Subheading } from "react-native-paper";
import { RootStackParamList } from "../App";
import { theme } from "../styles/theme";

const LandingScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Landing">) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Headline style={styles.heading}>Roundware</Headline>
        <Subheading style={styles.subheading}>
          Contributory Audio Augmented Reality
        </Subheading>
      </View>
      <View>
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
  headingContainer: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 34,
    textAlign: "center",
  },
  subheading: {
    textAlign: "center",
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
