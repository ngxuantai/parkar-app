import { Layout } from "@src/constants";
import React from "react";
import { StyleSheet, View, Animated } from "react-native";

const Indicator = ({ data, scrollX }: any) => {
  return (
    <View style={styles.container}>
      {data.map((_: any, i: number) => {
        const inputRange = [
          (i - 1) * Layout.window.width,
          i * Layout.window.width,
          (i + 1) * Layout.window.width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: "row",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#35438E",
  },
});
