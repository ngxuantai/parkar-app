/* eslint-disable no-unsafe-optional-chaining */
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import { ColorHelper, CurrencyHelper } from "@src/utils";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: any;
  onViewTicket: any;
};

const ScheduleBookingItem = ({ item, onViewTicket }: Props) => {
  const parkingSlot = item?.ParkingSlot;
  const parkingLot = parkingSlot?.Block?.ParkingLot;
  console.log("SCheduleBookingItem - props", {
    parkingSlot: parkingSlot,
    parkingLot: parkingLot,
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onViewTicket}>
        <View
          style={[
            styles.flexRow,
            { alignItems: "center", justifyContent: "space-between" },
          ]}>
          {item?.status == "ongoing" ? (
            <View style={styles.status}>
              <Text style={styles.statusText}>Ongoging</Text>
            </View>
          ) : (
            <View style={[styles.status, styles.schedule]}>
              <Text style={[styles.statusText, styles.scheduleText]}>
                Scheduled
              </Text>
            </View>
          )}
          <Text style={styles.price} numberOfLines={1}>
            {CurrencyHelper.formatVND(item?.total)}
          </Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {parkingLot?.name}
        </Text>
        <View style={[styles.flexRow]}>
          <Feather name="map-pin" size={14} color={Colors.light.subtitle} />
          <Text style={styles.subtitle} numberOfLines={1}>
            {parkingLot?.address}
          </Text>
        </View>
        <View style={[styles.flexRow, { marginTop: 12, alignItems: "center" }]}>
          <Feather name="calendar" size={20} color={Colors.light.text} />
          <View style={styles.wrapper}>
            <Text style={styles.date} numberOfLines={1}>
              {dayjs(item?.bookingDate).format("DD MMM YY")}
            </Text>
            <Text style={styles.time} numberOfLines={1}>
              {(item?.startTime).toString().substring(0, 5)}
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={Colors.light.text}
          />
          <View style={styles.wrapper}>
            <Text style={styles.date} numberOfLines={1}>
              {dayjs(item?.bookingDate).format("DD MMM YY")}
            </Text>
            <Text style={styles.time} numberOfLines={1}>
              {(item?.endTime).toString().substring(0, 5)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleBookingItem;

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
    padding: 12,
  },
  status: {
    borderRadius: 20,
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.primary, 0.1),
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  schedule: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.warning, 0.1),
  },
  scheduleText: {
    color: Colors.light.warning,
  },
  statusText: {
    color: Colors.light.primary,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
  },
  price: { fontSize: 20, fontWeight: "700", color: Colors.light.primary },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.subtitle,
    marginLeft: 4,
    paddingRight: 20,
  },
  flexRow: { display: "flex", flexDirection: "row" },
  wrapper: { marginHorizontal: 12 },
  date: { fontWeight: "600", fontSize: 14, color: Colors.light.text },
  time: { fontWeight: "500", fontSize: 14, color: Colors.light.text },
});
