import { Images } from "@src/assets";
import { Colors } from "@src/constants";
import { ColorHelper } from "@src/utils";
import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  isVisible: boolean;
  isSuccess: boolean;
  onOk: any;
  okText: string;
  message: string;
};
const AppModalMessage = ({
  isVisible,
  isSuccess,
  onOk,
  okText,
  message,
}: Props) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Image
            source={isSuccess ? Images.Success : Images.Error}
            style={styles.Image}
          />
          <Text
            style={[
              styles.title,
              !isSuccess && { color: Colors.light.danger },
            ]}>
            {isSuccess ? "Successful!" : "Error!"}
          </Text>
          <Text style={styles.subTitle}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onOk}>
            <Text style={styles.buttonText}>{okText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AppModalMessage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
    paddingTop: 34,
    borderRadius: 8,
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.light.success,
    fontWeight: "600",
    fontSize: 22,
    marginVertical: 6,
  },
  subTitle: {
    color: Colors.light.text,
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  Image: {
    width: 100,
    height: 100,
    marginBottom: 22,
  },
  button: {
    marginVertical: 22,
    backgroundColor: Colors.light.primary,
    padding: 12,
    width: "100%",
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.background,
  },
});
