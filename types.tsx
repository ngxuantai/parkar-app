/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootStackParamList = {
  OnboardingScreen: undefined;
  App: NavigatorScreenParams<AppTabParamList> | undefined;
  NotFound: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AppTabParamList = {
  HomeStack: undefined;
  BookingStack: undefined;
  ProfileStack: undefined;
};

export type RootTabScreenProps<Screen extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
