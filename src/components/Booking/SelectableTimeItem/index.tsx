import { Colors } from "@src/constants";
import { ColorHelper, CurrencyHelper, DateTimeHelper } from "@src/utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  item: TimeFrame;
  selectedId: string;
  onSelect: any;
};

const SelectableTimeItem = ({ item, onSelect, selectedId }: Props) => (
  <TouchableOpacity
    style={[
      styles.container,
      selectedId == item.idTimeFrame && styles.selected,
    ]}
    onPress={onSelect}>
    <Text
      style={[
        styles.time,
        selectedId == item.idTimeFrame && styles.selectedText,
      ]}>
      {DateTimeHelper.convertToHour(item.duration)}
    </Text>
    <Text
      style={[
        styles.price,
        selectedId == item.idTimeFrame && styles.selectedText,
      ]}>
      {CurrencyHelper.formatVND(item.cost)}
    </Text>
  </TouchableOpacity>
);

export default SelectableTimeItem;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.light.subtitle,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginRight: 6,
    width: 100,
  },
  selected: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.primary, 0.9),
    borderWidth: 0,
  },
  selectedText: {
    color: Colors.light.background,
  },
  time: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.text,
  },
  price: {
    fontSize: 16,
    color: Colors.light.primary,
  },
});
