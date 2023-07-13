import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "@src/constants";
import useColorScheme from "@src/hooks/useColorScheme";
import React from "react";
import {
  HomeIcon,
  TicketIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeIconSolid,
  TicketIcon as TicketIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from "react-native-heroicons/solid";
import BookingHistoryStack from "../Stack/BookingHistoryStack";
import HomeStack from "../Stack/HomeStack";
import ProfileStack from "../Stack/ProfileStack";
import { AppTabParams } from "./types";

const Tab = createBottomTabNavigator<AppTabParams>();

const AppTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].primary,
        tabBarInactiveTintColor: "#90A3BC",
        headerShown: false,
        tabBarLabelStyle: { marginBottom: 6 },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, focused }: any) =>
            focused ? (
              <HomeIconSolid color={color} />
            ) : (
              <HomeIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="History"
        component={BookingHistoryStack}
        options={{
          tabBarIcon: ({ color, focused }: any) =>
            focused ? (
              <TicketIconSolid color={color} />
            ) : (
              <TicketIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, focused }: any) =>
            focused ? (
              <UserCircleIconSolid color={color} />
            ) : (
              <UserCircleIcon color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
