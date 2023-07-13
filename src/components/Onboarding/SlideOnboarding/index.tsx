import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Layout } from "@src/constants";

const SlideOnboarding = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: Layout.window.width,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "50%",
    resizeMode: "contain",
    marginTop: 40,
  },
  subtitle: {
    color: "#333",
    fontSize: 14,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 23,
  },
});

export default SlideOnboarding;
