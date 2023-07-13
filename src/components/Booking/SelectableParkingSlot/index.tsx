import { Colors } from "@src/constants";
import { useAppDispatch } from "@src/store/hooks";
import { bookingActions } from "@src/store/slices/bookingSlice";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  blockCode: string;
  slot: ParkingSlot;
  selectedId: string;
};
const SelectableParkingSlot = ({ blockCode, slot, selectedId }: Props) => {
  const dispatch = useAppDispatch();
  const onSelect = () => {
    dispatch(bookingActions.update({ field: "blockCode", value: blockCode }));
    dispatch(bookingActions.update({ field: "parkingSlot", value: slot }));
    console.log(
      "SelectectableParingSlot onSelect bookingAction =",
      bookingActions,
    );
  };
  return (
    <TouchableOpacity
      style={[styles.container, selectedId == slot.id && styles.selected]}
      onPress={onSelect}>
      <Text
        style={[
          styles.text,
          selectedId == slot.id && styles.selectedText,
        ]}>{`${blockCode} - ${slot.slotNumber}`}</Text>
    </TouchableOpacity>
  );
};

export default SelectableParkingSlot;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    paddingVertical: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "31%",
    backgroundColor: Colors.light.background,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  text: { fontSize: 16, fontWeight: "600", color: Colors.light.text },
  selected: {
    backgroundColor: Colors.light.primary,
  },
  selectedText: {
    color: Colors.light.background,
  },
});
