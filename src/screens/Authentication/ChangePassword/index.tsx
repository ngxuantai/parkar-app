import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import authApi from "@src/api/authApi";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";
import * as Yup from "yup";

type Props = {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<any, any>;
};

const ChangePassword = (props: Props) => {
  const routeData = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string().required("Please enter new password!"),
    passwordConfirm: Yup.string().required("Please re-enter your password!"),
  });

  const handleChangePassword = async (values: any) => {
    try {
      setIsLoading(true);

      if (values.password !== values.passwordConfirm) {
        Alert.alert("Failed! Password does not match! ");
        setIsLoading(false);
        return;
      }
      const isSuccess = await authApi.resetPassword(
        values.password,
        routeData.phoneNumber,
      );
      setIsLoading(false);
      if (isSuccess.data.status) {
        const password = await AsyncStorage.getItem("password");
        if (password) {
          await AsyncStorage.setItem("password", values.password);
        }
        props.navigation.navigate("SignIn");
        Alert.alert("You have successfully changed password!");
      } else {
        Alert.alert("Failed");
      }
    } catch (err: any) {
      Alert.alert(`Error: ${err.message}`);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <View style={styles.container}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => props.navigation.navigate("ResetPassword")}
          />
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.description}>Please enter new a password</Text>
          <Formik
            initialValues={{ password: "", passwordConfirm: "" }}
            onSubmit={(values) => handleChangePassword(values)}
            validationSchema={ChangePasswordSchema}>
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <>
                <View style={styles.containerInput}>
                  <View style={styles.groupInput}>
                    <MaterialCommunityIcons
                      name="key-outline"
                      size={22}
                      color="black"
                    />
                    <TextInput
                      placeholder="New password"
                      placeholderTextColor="#CBD5E1"
                      onChangeText={handleChange("password")}
                      value={values.password}
                      autoFocus
                      style={styles.input}
                      secureTextEntry={hidePassword}
                    />
                    <Octicons
                      name={hidePassword ? "eye-closed" : "eye"}
                      size={22}
                      color={Colors.light.text}
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.validateError}>
                      * {errors.password}
                    </Text>
                  )}
                  <View style={styles.groupInput}>
                    <MaterialCommunityIcons
                      name="key-outline"
                      size={22}
                      color="black"
                    />
                    <TextInput
                      placeholder="Re-enter password"
                      placeholderTextColor="#CBD5E1"
                      onChangeText={handleChange("passwordConfirm")}
                      value={values.passwordConfirm}
                      style={styles.input}
                      secureTextEntry={hidePassword}
                    />
                    <Octicons
                      name={hidePassword ? "eye-closed" : "eye"}
                      size={22}
                      color={Colors.light.text}
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  </View>
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <Text style={styles.validateError}>
                      * {errors.passwordConfirm}
                    </Text>
                  )}
                </View>
                <AppButton
                  style={styles.btnSend}
                  isLoading={isLoading}
                  onPress={handleSubmit}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "600",
                      color: "white",
                    }}>
                    Change
                  </Text>
                </AppButton>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    width: "65%",
    fontSize: 16,
    color: "#90A3BC",
    marginBottom: 50,
  },
  containerInput: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
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
    fontSize: 18,
    color: Colors.light.text,
  },
  btnSend: {
    height: 56,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
  },
  validateError: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: -10,
  },
});
