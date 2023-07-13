import { Colors } from "@src/constants";
import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SelectableParkingSlot from "../SelectableParkingSlot";

type Props = {
  block: Block;
  slots: ParkingSlot[];
};

const ParkingSlotItem = ({ block, slots }: Props) => {
  const selectedSlot = useAppSelector(selectBooking).parkingSlot;
  console.log("ParkingSlotItem selectedSlot", selectedSlot);
  console.log("ParkingSlotItem props: block", block);
  console.log("ParkingSlotItem props: slots", slots);
  return (
    <View>
      {/* <Text style={styles.block}>{`Block - ${block.blockCode}`}</Text> */}
      <Text style={styles.block}>{`Block - ${block.code}`}</Text>
      {/* <FlatList
        data={slots}  
        keyExtractor={(item) => item.idParkingSlot}
        renderItem={({ item }) => (
          <SelectableParkingSlot
            selectedId={selectedSlot?.idParkingSlot}
            blockCode={block.blockCode}
            slot={item}
          />
        )}
        scrollEnabled={false}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        key={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      /> */}
      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SelectableParkingSlot
            selectedId={selectedSlot?.id}
            blockCode={block.code}
            slot={item}
          />
        )}
        scrollEnabled={false}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        key={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

export default ParkingSlotItem;

const styles = StyleSheet.create({
  block: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.heading,
    marginVertical: 12,
  },
  container: {
    display: "flex",
    width: 100,
    height: 100,
    backgroundColor: "red",
    flexWrap: "wrap",
  },
});
