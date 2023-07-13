import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import { AlertHelper } from "@src/utils";
import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

type Props = {
  favorite: ParkingLot;
  onDelete: any;
};

const FavoriteItem = ({ favorite, onDelete }: Props) => {
  const swipeRef = useRef(null);

  const closeSwipable = () => {
    swipeRef?.current?.close();
  };
  const renderRightAction = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-10, 0],
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
    <TouchableOpacity style={styles.container}>
      <Swipeable
        ref={swipeRef}
        key={favorite.id}
        onSwipeableRightOpen={() =>
          AlertHelper.confirm(onDelete, closeSwipable)
        }
        renderRightActions={renderRightAction}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{favorite.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Feather name="map-pin" size={14} color={Colors.light.subtitle} />
            <Text style={styles.subtitle}>{favorite.address}</Text>
          </View>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 10,
  },
  wrapper: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.subtitle,
    paddingRight: 20,
    marginLeft: 4,
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
