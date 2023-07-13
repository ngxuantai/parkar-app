import useColorScheme from "@src/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function AppStatusBar() {
  const theme = useColorScheme();

  return <StatusBar style={theme == "light" ? "dark" : "light"} />;
}
