import { LoadingService } from "@nghinv/react-native-loading";
import useCachedResources from "@src/hooks/useCachedResources";
import useColorScheme from "@src/hooks/useColorScheme";
import AppNavigator from "@src/navigation/AppNavigator";
import React from "react";
import { LogBox, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../thepatch";
import { store } from "./store";

LogBox.ignoreAllLogs();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <LoadingService>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <AppNavigator colorScheme={colorScheme} />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </Provider>
      </LoadingService>
    );
  }
}
