import { Spinner } from "@nghinv/react-native-loading";
import parkingSlotApi from "@src/api/parkingSlotApi";
import ParkingSlotItem from "@src/components/Booking/ParkingSlotItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import { availableSlotsActions } from "@src/store/slices/availableSlotSlice";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const SelectParkingSlotScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);
  const dispatch = useAppDispatch();
  const availableSlotState = useAppSelector((state) => state.availableSlot);
  const navigateNext = () => {
    navigation.navigate("SelectPaymentScreen");
  };
  console.log("avaiableSlotState", availableSlotState);

  useEffect(() => {
    const getSlots = async () => {
      const data = {
        start: dayjs(bookingState.startTime).format("HH:mm"),
        end: dayjs(bookingState.endTime).format("HH:mm"),
        date: dayjs(bookingState.bookingDate).format("YYYY-MM-DD"),
        id: bookingState.parkingLot.id,
      };
      dispatch(availableSlotsActions.getAvailableSlots(data));
    };
    getSlots();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <FlatList
        data={availableSlotState.blocks}
        keyExtractor={(block) => block.idBlock}
        renderItem={({ item }) => (
          // <ParkingSlotItem
          //   key={item.idBlock}
          //   block={item}
          //   slots={item.ParkingSlots}
          // />
          <ParkingSlotItem
            key={item.id}
            block={item}
            slots={item.parkingSlots}
          />
        )}
      />
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectParkingSlotScreen;

const styles = StyleSheet.create({
  continueButton: {
    marginTop: 12,
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
  },
  countinueText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
});
