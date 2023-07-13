import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// interface IProps {
//   currentIndex: any;
//   slides:
// }

const FooterButton = (props) => {
  return (
    <View style={styles.container}>
      {props.currentIndex == props.slides.length - 1 ? (
        <TouchableOpacity onPress={props.getStarted} style={styles.startBtn}>
          <Text style={styles.text}>Get started</Text>
          <AntDesign name="arrowright" style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={props.skip}
            style={styles.skipBtn}
            activeOpacity={0.8}>
            <Text style={[styles.text, { color: "#4D65EB" }]}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.goToNextSlide}
            style={styles.nextBtn}
            activeOpacity={0.8}>
            <Text style={styles.text}>Next</Text>
            <AntDesign name="arrowright" size={16} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    marginVertical: 40,
    width: "100%",
  },
  startBtn: {
    paddingHorizontal: 16,
    height: 50,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#4D65EB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#4D65EB",
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.155,
    shadowRadius: 10,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
    marginRight: 8,
  },
  icon: {
    fontSize: 16,
    color: "#fff",
  },
});
