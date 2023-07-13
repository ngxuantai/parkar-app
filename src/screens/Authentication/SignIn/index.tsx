import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "@src/components/common/AppButton";
import { FacebookLoginButton } from "@src/components/Login/FacebookLoginButton";
import GoogleLoginButton from "@src/components/Login/GoogleLoginButton";
import { Colors } from "@src/constants";
import { useAppDispatch } from "@src/store/hooks";
import { userActions } from "@src/store/slices/userSlice";
import { StatusBar } from "expo-status-bar";
import { Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";
import * as Yup from "yup";

type Props = {
  navigation: NavigationScreenProp<any, any>;
};
type LoginValue = {
  phoneNumber: string;
  password: string;
};

const SignIn = (props: Props) => {
  const [isRemember, setIsRemember] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useAppDispatch();
  const formikRef = useRef<FormikProps<LoginValue>>();
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(new RegExp("^0"), "Invalid phone number")
      .required("Please enter phone number!")
      .length(10, "Phone number must include 10 numbers")
      .nullable(),
    password: Yup.string().required("Please enter password").nullable(),
  });

  const toggleSwitch = async () =>
    setIsRemember((previousState) => !previousState);

  const login = async (values: any) => {
    try {
      setIsLoading(true);
      const result = await dispatch(
        userActions.login({
          username: values.phoneNumber,
          password: values.password,
        }),
      ).unwrap();
      console.log("result ", result);

      setIsLoading(false);
      if (result.errorMessage) {
        Alert.alert("Error: " + result.errorMessage);
        return;
      }
      console.log("values ", values);
      if (isRemember) {
        await AsyncStorage.setItem("phoneNumber", values.phoneNumber);
        await AsyncStorage.setItem("password", values.password);
        await AsyncStorage.setItem("idUser", result.id);
      } else {
        await AsyncStorage.removeItem("phoneNumber");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("idUser");
      }
      props.navigation.navigate("App");
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert("Error: " + error);
    }
  };

  const handleLoginWithOauth = (newUser: User) => {
    dispatch(userActions.loginWithOauth(newUser));
    props.navigation.navigate("App");
  };

  useEffect(() => {
    const saveIntoAsyncStorage = async () => {
      if (formikRef.current) {
        const phoneNumber = await AsyncStorage.getItem("phoneNumber");
        const password = await AsyncStorage.getItem("password");
        formikRef.current.setFieldValue("phoneNumber", phoneNumber);
        formikRef.current.setFieldValue("password", password);
      }
    };
    saveIntoAsyncStorage();
  }, [formikRef]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={{ height: "20%", justifyContent: "center" }}>
          <Text style={styles.title}>Sign in</Text>
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{ phoneNumber: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => login(values)}>
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View style={styles.controller}>
              <View style={styles.containerInput}>
                <View style={styles.groupInput}>
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={22}
                    color={Colors.light.text}
                  />
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#CBD5E1"
                    onChangeText={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    keyboardType="number-pad"
                    style={styles.input}
                  />
                  <View style={{ width: 22 }} />
                </View>
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.validateError}>
                    * {errors.phoneNumber}
                  </Text>
                )}
                <View style={styles.groupInput}>
                  <MaterialCommunityIcons
                    name="key-outline"
                    size={22}
                    color={Colors.light.text}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#CBD5E1"
                    onChangeText={handleChange("password")}
                    value={values.password}
                    style={styles.input}
                    secureTextEntry={hidePassword}
                  />
                  <Octicons
                    name={hidePassword ? "eye" : "eye-closed"}
                    size={22}
                    color={Colors.light.text}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.validateError}>* {errors.password}</Text>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                <Switch
                  trackColor={{
                    false: "#FFF",
                    true: Colors.light.tabIconSelected,
                  }}
                  thumbColor={isRemember ? "#FFF" : "#8F8F9D"}
                  onValueChange={toggleSwitch}
                  value={isRemember}
                  style={styles.switch}
                />
                <Text
                  style={{
                    color: Colors.light.text,
                    marginLeft: 5,
                  }}>
                  Remember me
                </Text>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    props.navigation.navigate("ResetPassword");
                  }}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: Colors.light.text,
                      fontWeight: "700",
                    }}>
                    Quên mật khẩu?
                  </Text>
                </TouchableOpacity>
              </View>
              <AppButton
                style={styles.btnSignIn}
                isLoading={isLoading}
                onPress={handleSubmit}>
                <Text
                  style={{ fontSize: 22, fontWeight: "600", color: "white" }}>
                  Sign in
                </Text>
              </AppButton>
              <View style={styles.oauth}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "#90A3BC",
                    marginBottom: 12,
                    fontWeight: "600",
                  }}>
                  OR
                </Text>
                <View style={{ marginBottom: 10 }}>
                  <GoogleLoginButton handleLogin={handleLoginWithOauth} />
                </View>
                {/* <View>
                  <FacebookLoginButton handleLogin={handleLoginWithOauth} />
                </View> */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 15,
                    marginBottom: 10,
                  }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("SignUp");
                    }}>
                    <Text
                      style={{
                        color: Colors.light.primary,
                        fontSize: 16,
                        fontWeight: "800",
                        marginLeft: 10,
                      }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary,
    height: "100%",
    alignItems: "center",
  },
  controller: {
    height: "80%",
    width: "100%",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 50,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
  },
  containerInput: {
    width: "100%",
  },
  groupInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#90A3BC",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.light.text,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
  },
  btnSignIn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.8 }],
    paddingLeft: 0,
    marginLeft: 0,
    marginTop: 5,
  },
  oauth: {
    width: "100%",
    marginTop: 20,
  },
  btnOauth: {
    backgroundColor: "#FFF",
    color: Colors.light.text,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 10,
  },
  iconOauth: {
    marginRight: 10,
  },
  validateError: {
    color: "red",
    fontSize: 14,
    marginTop: 2,
    marginBottom: -12,
  },
});
export default SignIn;
