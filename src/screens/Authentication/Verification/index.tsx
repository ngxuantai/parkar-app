import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { auth } from "@src/firebase";
import { useAppDispatch } from "@src/store/hooks";
import { userActions } from "@src/store/slices/userSlice";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<any, any>;
};

const Verification = (props: Props) => {
  const refPin1 = useRef<TextInput>(null);
  const refPin2 = useRef<TextInput>(null);
  const refPin3 = useRef<TextInput>(null);
  const refPin4 = useRef<TextInput>(null);
  const refPin5 = useRef<TextInput>(null);
  const refPin6 = useRef<TextInput>(null);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  const [timerCount, setTimer] = useState(60);
  const routeData = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [verificationId, setVerificationId] = useState(
    routeData.verificationId,
  );

  const handleVerification = async () => {
    try {
      setIsLoading(true);
      const verificationCode = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );
      await signInWithCredential(auth, credential);
      console.log("called await signInWIthCredential");
      if (routeData.type === "SignUp") {
        const res = await dispatch(
          userActions.createUser(routeData.user),
        ).unwrap();
      console.log("dispatched create user - res",res);

        setIsLoading(false);
        if (res.errorMessage) {
          Alert.alert("Error: " + res.errorMessage);
          return;
        }

        if (res.data) {
          Alert.alert("Successfully!");
          await AsyncStorage.setItem("password", res.data.password);
          await AsyncStorage.setItem("phoneNumber", res.data.phoneNumber);
          await AsyncStorage.setItem("idUser", res.data.idUser);
          props.navigation.navigate("App");
        }
      } else if (routeData.type === "ResetPassword") {
        props.navigation.navigate("ChangePassword", {
          phoneNumber: routeData.phoneNumber,
        });
      }
    } catch (err: any) {
      setIsLoading(false);
      Alert.alert(`Error: ${err.message}`);
    }
  };

  const handleResendOTP = async () => {
    setTimer(60);
    countDown();
    // setTimer(5);
    // const re = new RecaptchaVerifier("recaptcha-container", {}, auth);
    // // const id = await re.render();
    // signInWithPhoneNumber(auth, routeData.phoneNumber, re)
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     console.log(confirmationResult);
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // Error; SMS not sent
    //     // ...
    //   });
    // // setVerificationId(tmp);
  };

  const countDown = () => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View></View>
        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={"padding"}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => props.navigation.goBack()}
          />
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.description}>
            We're send you the verification code on your email
          </Text>
          <View style={styles.containerInput}>
            <TextInput
              ref={refPin1}
              style={styles.input}
              maxLength={1}
              textContentType="oneTimeCode"
              onChangeText={(value) => {
                setPin1(value);
                if (value) refPin2.current.focus();
              }}
              keyboardType="numeric"
              autoFocus={true}
              value={pin1}
              clearTextOnFocus={true}
            />
            <TextInput
              ref={refPin2}
              style={styles.input}
              maxLength={1}
              textContentType="oneTimeCode"
              onChangeText={(value) => {
                setPin2(value);
                if (value) refPin3.current.focus();
              }}
              keyboardType="numeric"
              value={pin2}
              clearTextOnFocus={true}
            />
            <TextInput
              ref={refPin3}
              style={styles.input}
              textContentType="oneTimeCode"
              maxLength={1}
              onChangeText={(value) => {
                setPin3(value);
                if (value) refPin4.current.focus();
              }}
              keyboardType="numeric"
              value={pin3}
              clearTextOnFocus={true}
            />
            <TextInput
              ref={refPin4}
              style={styles.input}
              textContentType="oneTimeCode"
              maxLength={1}
              onChangeText={(value) => {
                setPin4(value);
                if (value) refPin5.current.focus();
              }}
              keyboardType="numeric"
              value={pin4}
              clearTextOnFocus={true}
            />
            <TextInput
              ref={refPin5}
              style={styles.input}
              textContentType="oneTimeCode"
              maxLength={1}
              onChangeText={(value) => {
                setPin5(value);
                if (value) refPin6.current.focus();
              }}
              keyboardType="numeric"
              value={pin5}
              clearTextOnFocus={true}
            />
            <TextInput
              ref={refPin6}
              style={styles.input}
              maxLength={1}
              textContentType="oneTimeCode"
              onChangeText={setPin6}
              keyboardType="numeric"
              value={pin6}
              clearTextOnFocus={true}
            />
          </View>
          <AppButton
            style={styles.btnContinue}
            isLoading={isLoading}
            onPress={() => handleVerification()}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: "white",
              }}>
              Next
            </Text>
          </AppButton>
          {timerCount > 0 && (
            <View style={styles.resend}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                Re-send code in
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: Colors.light.primary,
                  marginLeft: 5,
                }}>
                {timerCount} s
              </Text>
            </View>
          )}
          {timerCount == 0 && (
            <TouchableOpacity
              onPress={handleResendOTP}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: Colors.light.primary,
                  fontSize: 16,
                  fontWeight: "700",
                }}>
                Resend
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light.text,
    textAlign: "center",
    color: Colors.light.text,
    fontSize: 22,
    fontWeight: "600",
  },
  btnContinue: {
    height: 56,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
  },
  resend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
