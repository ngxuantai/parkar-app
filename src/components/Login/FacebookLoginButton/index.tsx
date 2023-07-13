import axios from "axios";
import $t from "@src/constants/i18n";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FacebookLogo from "@src/assets/svg/facebook.svg";
import config from "@src/config";

WebBrowser.maybeCompleteAuthSession();
const AUTH_STATE_KEY = "AuthKey";

type Props = {
  handleLogin: any;
};

export const FacebookLoginButton = (props: Props) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: config.FACEBOOK_APP_ID,
    scopes: ["email", "public_profile"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const auth = response.params;
      // const storageValue = JSON.stringify(auth);

      // if (Platform.OS !== "web") {
      //   SecureStore.setItemAsync(AUTH_STATE_KEY, storageValue);
      // }
      axios
        .get(
          `https://graph.facebook.com/v13.0/me?fields=id%2Cname%2Cemail&access_token=${auth["access_token"]}`,
        )
        .then((res) => {
          const { id, email, name } = res.data;
          if (!email) {
            Alert.alert(
              "Đăng nhập không thành công",
              "Vui lòng cung cấp quyền truy cập email! Thử đăng nhập lại?",
              [
                {
                  text: "Hủy",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => promptAsync() },
              ],
            );
          } else {
            axios
              .post("http://192.168.1.5:8080/api/auth/loginoauth", {
                displayname: name,
                email: email,
                idsocial: id,
              })
              .then((res) => {
                const { user } = res.data;
                props.handleLogin(user);
              })
              .catch((err) => console.log({ err }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}>
      <View style={styles.wrapper}>
        <FacebookLogo width={26} height={26} />
        {/* <Text style={styles.text}>{$t("loginwfb")}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    color: "#35438E",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 20,
  },
});
