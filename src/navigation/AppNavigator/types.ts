import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface IResetPasswordParams {
  verificationId: string;
  type: string;
  phoneNumber: string;
}
interface ISignUpParams {
  verificationId: string;
  type: string;
  user: User;
}

interface IVerificationParams {
  phoneNumber: string;
}

export type AppStackParams = {
  OnboardingScreen: undefined;
  SignIn: undefined;
  SignUp: ISignUpParams;
  ResetPassword: IResetPasswordParams;
  Verification: IVerificationParams;
  App: undefined;
  NotFound: undefined;
  ChangePassword: undefined;
};
