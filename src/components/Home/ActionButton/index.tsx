import { Spacing } from "@src/constants";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  action: any;
  icon: any;
  text: string;
}
const ActionButton = ({ action, icon, text }: IProps) => {
  return (
    <TouchableOpacity onPress={action} style={styles.container}>
      <View style={styles.flex}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.s,
    paddingHorizontal: 12,
    backgroundColor: "#DBE0FB",
    borderRadius: 6,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4D65EB",
    marginLeft: Spacing.s,
  },
});
