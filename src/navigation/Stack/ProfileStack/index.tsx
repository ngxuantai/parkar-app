import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import ChangePasswordScreen from "@src/screens/ProfileScreen/ChangePasswordScreen";
import ProfileScreen from "@src/screens/ProfileScreen";
import FavoriteScreen from "@src/screens/ProfileScreen/FavoriteScreen";
import PersonalScreen from "@src/screens/ProfileScreen/PersonalScreen";
import VehicleScreen from "@src/screens/VehicleScreen";
import AddVehicleScreen from "@src/screens/VehicleScreen/AddVehicleScreen";
import React from "react";
import { ProfileStackParams } from "../types";

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.light.primary,
        contentStyle: {
          backgroundColor: Colors.light.background,
        },
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTitleStyle: {
          color: Colors.light.primary,
        },
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="PersonalScreen"
        component={PersonalScreen}
        options={{
          title: "Personal information",
        }}
      />
      <Stack.Screen
        name="VehicleScreen"
        component={VehicleScreen}
        options={{
          title: "My vehicles",
        }}
      />
      <Stack.Screen
        name="AddVehicleScreen"
        component={AddVehicleScreen}
        options={{
          title: "Add a vehicle",
        }}
      />
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          title: "Favorite parking lots",
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: "Change your password",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
