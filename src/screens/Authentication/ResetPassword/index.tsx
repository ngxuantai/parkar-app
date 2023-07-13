import { AntDesign, Feather } from "@expo/vector-icons";
import userApi from "@src/api/userApi";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { app, auth } from "@src/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider } from "firebase/auth";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";
import * as Yup from "yup";

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const ResetPassword = (props: Props) => {
  const recaptchaVerifier = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const PhoneNumberSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(new RegExp("^0"), "Invalid phone number")
      .required("Please enter phone number!")
      .length(10, "Phone number must include 10 numbers"),
  });

  const next = async (values: any) => {
    try {
      setIsLoading(true);
      const isExist = await userApi.checkDuplicatePhone(values.phoneNumber);
      if (!isExist) {
        Alert.alert("Failed! PhoneNumber doesn't exist!");
        setIsLoading(false);
        return;
      }
      const phoneNumber = `+84${values.phoneNumber.slice(
        1,
        values.phoneNumber.length,
      )}`;
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current,
      );
      setIsLoading(false);
      props.navigation.navigate("Verification", {
        type: "ResetPassword",
        phoneNumber: values.phoneNumber,
        verificationId,
      });
    } catch (err: any) {
      setIsLoading(false);
      Alert.alert(`Error: ${err.message}`);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
        />
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Please enter your phone number to request a password reset
        </Text>
        <Formik
          initialValues={{ phoneNumber: "" }}
          onSubmit={(values) => next(values)}
          validationSchema={PhoneNumberSchema}>
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <>
              <View style={styles.containerInput}>
                <View style={styles.groupInput}>
                  <Feather name="phone" size={22} />
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#CBD5E1"
                    onChangeText={handleChange("phoneNumber")}
                    value={values.phoneNumber}
                    autoFocus
                    keyboardType="numeric"
                    style={styles.input}
                  />
                </View>
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.validateError}>
                    * {errors.phoneNumber}
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
                  Send
                </Text>
              </AppButton>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

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
