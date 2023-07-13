import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import { ColorHelper } from "@src/utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileAction = ({ icon, text, screen, navigation }: any) => {
  const navigateTo = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={navigateTo} style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>{icon}</View>
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={Colors.light.heading}
      />
    </TouchableOpacity>
  );
};

export default ProfileAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    alignItems: "center",
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.primary, 0.1),
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  icon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 16,
    color: Colors.light.heading,
  },
});
