import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import { AlertHelper, ColorHelper } from "@src/utils";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface IProps {
  item: Vehicle;
  onEdit: any;
  onDelete: any;
}

const VehicleItem = ({ item, onEdit, onDelete }: IProps) => {
  const swipeRef = useRef(null);

  const closeSwipable = () => {
    swipeRef?.current?.close();
  };

  const renderTag = (type: string) => {
    switch (type) {
      case "bike":
        return (
          <View style={styles.tag}>
            <MaterialCommunityIcons
              name="motorbike"
              size={22}
              color={Colors.light.primary}
            />
            <Text style={styles.tagText}>Bike</Text>
          </View>
        );
      case "car":
        return (
          <View style={styles.tag}>
            <Ionicons
              name="ios-car-outline"
              size={20}
              color={Colors.light.primary}
            />
            <Text style={styles.tagText}>Car</Text>
          </View>
        );
      default:
        return (
          <View style={styles.tag}>
            <MaterialCommunityIcons
              name="van-utility"
              size={20}
              color={Colors.light.primary}
            />
            <Text style={styles.tagText}>Van</Text>
          </View>
        );
    }
  };

  const renderRightAction = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.deleteBox}>
        <Animated.Text style={{ transform: [{ scale }] }}>
          <Ionicons
            name="ios-trash-outline"
            size={26}
            color={Colors.light.background}
          />
        </Animated.Text>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onEdit}>
      <Swipeable
        ref={swipeRef}
        key={item.idVehicle}
        onSwipeableRightOpen={() =>
          AlertHelper.confirm(onDelete, closeSwipable)
        }
        renderRightActions={renderRightAction}>
        <View style={styles.item}>
          <View style={styles.wrapper}>
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {item.number}
            </Text>
          </View>
          {renderTag(item.type)}
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
};

export default VehicleItem;

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  item: {
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },
  tag: {
    paddingHorizontal: 12,
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.primary, 0.2),
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    height: 22,
  },
  tagText: {
    color: Colors.light.primary,
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 4,
  },
  wrapper: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    color: Colors.light.heading,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.subtitle,
    marginTop: 4,
  },
  deleteBox: {
    backgroundColor: Colors.light.danger,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
