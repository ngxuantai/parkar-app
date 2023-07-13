import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "@src/screens/NotFoundScreen";
import OnboardingScreen from "@src/screens/Onboarding";
import React, { useEffect, useState, useRef } from "react";
import { ColorSchemeName, Platform } from "react-native";
import { AppStackParams } from "./types";
import AppTabNavigator from "../AppTabNavigator";
import LinkingConfiguration from "../LinkingConfiguration";
import SignIn from "@src/screens/Authentication/SignIn";
import SignUp from "@src/screens/Authentication/SignUp";
import ResetPassword from "@src/screens/Authentication/ResetPassword";
import Verification from "@src/screens/Authentication/Verification";
import ChangePassword from "@src/screens/Authentication/ChangePassword";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/selectors";
import { userActions } from "@src/store/slices/userSlice";
import { Colors } from "@src/constants";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { userApi } from "@src/api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const Stack = createNativeStackNavigator<AppStackParams>();
const headerOption = {
  headerShown: false,
};
const AppNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isFirstLaunched, setIsFirstLaunched] = useState<boolean>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  useEffect(() => {
    const checkFirstLaunched = async () => {
      const isFirst = await AsyncStorage.getItem("isFirstLaunched");
      if (isFirst == null) {
        setIsFirstLaunched(true);
        AsyncStorage.setItem("isFirstLaunched", "false");
      } else {
        setIsFirstLaunched(false);
      }
    };

    const getUser = async () => {
      const idUser = await AsyncStorage.getItem("idUser");
      if (idUser) {
        setUpNotification(idUser);
        dispatch(userActions.getUser(idUser))
          .unwrap()
          .then(() => {
            setIsLogged(true);
          })
          .catch(() => {
            setIsLogged(false);
          });
      } else {
        setIsLogged(false);
      }
    };

    checkFirstLaunched();
    getUser();
  }, []);

  //
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await registerForPushNotificationsAsync();
  //     setExpoPushToken(token);
  //     const idUser = await AsyncStorage.getItem("idUser");
  //     userApi.addExpoToken(idUser, token);
  //     console.log(token);
  //   };
  //   fetchToken();

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current,
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  const setUpNotification = async (idUser: string) => {
    const token = await registerForPushNotificationsAsync();
    setExpoPushToken(token);
    userApi.addExpoToken(idUser, token);
    console.log(token);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <Stack.Navigator>
        {/* {isFirstLaunched && ( */}
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={headerOption}
        />
        {/* )} */}
        {/* {!isLogged && (
          <Stack.Group> */}
        <Stack.Screen name="SignIn" component={SignIn} options={headerOption} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "Sign up",
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTitleStyle: {
              color: Colors.light.primary,
              fontSize: 20,
              fontWeight: "700",
            },
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: Colors.light.primary,
            headerTitleAlign: "left",
            contentStyle: {
              backgroundColor: Colors.light.background,
            },
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={headerOption}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={headerOption}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={headerOption}
        />
        {/* </Stack.Group>
        )} */}
        <Stack.Screen
          name="App"
          component={AppTabNavigator}
          options={headerOption}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
