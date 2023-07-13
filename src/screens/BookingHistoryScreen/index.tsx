import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import TabBarBooking from "@src/components/BookingHistory/TabBarBooking";
import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import HistoryBookingScreen from "./HistoryBookingScreen";
import ScheduledBookingScreen from "./ScheduledBookingScreen";

const Tab = createMaterialTopTabNavigator();

const BookingHistoryScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: Colors.light.background }}
        tabBar={(props: MaterialTopTabBarProps) => (
          <TabBarBooking {...props} />
        )}>
        <Tab.Screen name="SCHEDULED PARKINGS">
          {(props) => <ScheduledBookingScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="PARKING HISTORY">
          {(props) => <HistoryBookingScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
