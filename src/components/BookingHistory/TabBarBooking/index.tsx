import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Colors } from "@src/constants";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TabBarBooking = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        const activeOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
        });
        const inactiveOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            <Animated.View style={[styles.item, { opacity: inactiveOpacity }]}>
              <Text style={[styles.label, styles.inactive]}>{label}</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.item,
                styles.activeItem,
                { opacity: activeOpacity },
              ]}>
              <Text style={[styles.label, styles.active]}>{label}</Text>
              <View
                style={{
                  backgroundColor: Colors.light.primary,
                  height: 2,
                  width: "50%",
                  marginTop: 4,
                }}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBarBooking;

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F1F3F4",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  activeItem: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    color: Colors.light.primary,
  },
  inactive: {
    color: "#a1afc2",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
