import { Images } from "@src/assets";
import { Colors } from "@src/constants";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  item: any;
  checkedId: string;
  handleSelect: any;
}

const SelectablePaymentItem = ({ item, checkedId, handleSelect }: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.item, checkedId === item.id && styles.selectedItem]}
      onPress={handleSelect}>
      <Image source={Images.Money} style={styles.image} />
      <View style={styles.wrapper}>
        <Text style={styles.title} numberOfLines={2}>
          {item.type}
        </Text>
      </View>
      <View style={styles.radioWrapper}>
        {(checkedId === item.id) && <View style={styles.radio} />}
      </View>
    </TouchableOpacity>
  );
};

export default SelectablePaymentItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "space-between",
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedItem: {
    borderColor: Colors.light.primary,
  },
  image: { width: 34, height: 34, marginVertical: 6 },
  wrapper: { flex: 1, marginHorizontal: 16 },
  title: { fontSize: 20, color: Colors.light.heading, fontWeight: "600" },
  radioWrapper: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    backgroundColor: Colors.light.primary,
    width: 12,
    height: 12,
    borderRadius: 100,
  },
});
