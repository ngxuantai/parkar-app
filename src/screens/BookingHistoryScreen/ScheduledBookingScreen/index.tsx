import AsyncStorage from "@react-native-async-storage/async-storage";
import ScheduleBookingItem from "@src/components/BookingHistory/ScheduleBookingItem";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectReservationsScheduled, selectUser } from "@src/store/selectors";
import { reservationActions } from "@src/store/slices/reservationSlice";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { parkingReservationApi } from "@src/api";

type Props = {
  navigation: any;
};

const ScheduledBookingScreen = ({ navigation }: Props) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const userState = useAppSelector(selectUser);
  const reservationsScheduledState = useAppSelector(
    selectReservationsScheduled,
  );
  const [scheduleBooking, setScheduleBooking] = useState<Reservation[]>();
  console.log("scheduleBooking", scheduleBooking);
  console.log("reservationsScheduledState", reservationsScheduledState);

  const dispatch = useAppDispatch();
  console.log("user State", userState);
  const onRefresh = () => {
    (async () => {
      let idUser;
      if (userState?.id) {
        idUser = await AsyncStorage.getItem("idUser");
      }
      setRefreshing(true);
      dispatch(
        reservationActions.getReservationsScheduled(userState?.id || idUser),
      ).finally(() => setRefreshing(false));
    })();
  };

  const navigationTicket = (item: any) => {
    navigation.navigate("BookingTicketScreen", item);
  };

  useEffect(() => {
    dispatch(reservationActions.getReservationsScheduled(userState?.id));
  }, []);

  useEffect(() => {
    const schedule: Reservation[] = [];
    const isAfter = (date: any, endTime: any) => {
      console.log("DATE", date);
      console.log("endTime", endTime);
      if (dayjs(date).isBefore(dayjs(), "date")) {
        return true;
      } else if (dayjs(date).isSame(dayjs(), "date")) {
        const hour = endTime.substring(0, 2);
        const mins = endTime.substring(3, 5);
        const endDate = dayjs().set("hour", hour).set("minute", mins);
        if (endDate.isBefore(dayjs())) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    var arrIdParkingReservation: string[] = [];
    if (reservationsScheduledState.length > 0) {
      reservationsScheduledState.map(async (reservation: Reservation) => {
        console.log("RESERVATION", reservation);
        if (isAfter(reservation.bookingDate, reservation.endTime)) {
          // arrIdParkingReservation.push(reservation.idParkingReservation);
          arrIdParkingReservation.push(reservation.id);
        } else {
          schedule.push(reservation);
        }
      });
    }
    parkingReservationApi.cancel(arrIdParkingReservation);
    setScheduleBooking(schedule);
  }, [reservationsScheduledState]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1, padding: 20 }}
        data={scheduleBooking}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.idParkingReservation}
        renderItem={({ item }) => (
          <ScheduleBookingItem
            onViewTicket={() => navigationTicket(item)}
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ScheduledBookingScreen;
