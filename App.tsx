import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./styles/theme";
import LandingScreen from "./screens/Landing";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListenScreen from "./screens/Listen";
import SpeakScreen from "./screens/Speak";

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  Landing: undefined;
  Listen: undefined;
  Speak: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <Appbar /> */}
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.background,
                fontSize: 24,
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={LandingScreen}
              options={{ title: "Roundware" }}
            />
            <Stack.Screen
              name="Listen"
              component={ListenScreen}
              options={{ headerBackTitle: "" }}
            />
            <Stack.Screen
              name="Speak"
              component={SpeakScreen}
              options={{ headerBackTitle: "" }}
            />
          </Stack.Navigator>

          <Footer />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
