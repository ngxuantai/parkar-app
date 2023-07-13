import AsyncStorage from "@react-native-async-storage/async-storage";
import { paymentApi } from "@src/api/paymentApi";
import { ticketApi } from "@src/api/ticketApi";
import { Images } from "@src/assets";
import AppButton from "@src/components/common/AppButton";
import AppModalMessage from "@src/components/common/AppModalMessage";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectUser } from "@src/store/selectors";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { reservationActions } from "@src/store/slices/reservationSlice";
import { CurrencyHelper, DateTimeHelper } from "@src/utils";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WebView from "react-native-webview";
import axiosClient from "@src/api/axiosClient";

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flexRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const SummaryScreen = ({ navigation, route }: any) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [paymentUrl, setPaymentUrl] = useState<String>("");
  // const [isSecondTimeNavigation, setIsSecondTimeNavigation] =
  //   useState<boolean>(false);
  const isSecondTimeNavigationRef = useRef(false);
  const paymentUrlRef = useRef("");
  const bookingState = useAppSelector(selectBooking);
  //payment method id
  const { selectedId } = route.params;
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handlePaymentByCard = async () => {
    const data = await paymentApi.create(bookingState.timeFrame?.cost);
    paymentUrlRef.current = data.vnpUrl;
    setModalVisible(() => true);
    // setPaymentUrl(() => data.vnpUrl);
  };
  const confirmBooking = async () => {
    if (selectedId == 2) {
      handlePaymentByCard();
      return;
    }
    confirmBookingSuccess();
  };

  const navigateNext = (isSuccess: boolean) => {
    setVisible(false);
    if (isSuccess) {
      navigation.navigate("ParkingTicketScreen");
    } else {
      navigation.navigate("HomeScreen");
    }
  };
  const confirmBookingSuccess = async (isPaid: boolean = false) =>{
    try {
      console.log("Selected Payment Method Id", selectedId);

      const idUser = await AsyncStorage.getItem("idUser");
      // const data = {
      //   idVehicle: bookingState.vehicle?.idVehicle,
      //   idUser: userState?.id || idUser,
      //   idParkingSlot: bookingState.parkingSlot?.idParkingSlot,
      //   idTimeFrame: bookingState.timeFrame?.idTimeFrame,
      //   startTime: dayjs(bookingState.startTime).format("HH:mm:ss"),
      //   endTime: dayjs(bookingState.endTime).format("HH:mm:ss"),
      //   bookingDate: bookingState.bookingDate,
      //   duration: bookingState.timeFrame.duration,
      //   total: bookingState.timeFrame?.cost,
      // };
      // console.log("Confirm booking clicked, List data = ", data);
      console.log("Confirm booking - bookingState", bookingState);
      const newData = {
        idVehicle: bookingState.vehicle?.id,
        idUser: userState?.id || idUser,
        idParkingSlot: bookingState.parkingSlot?.id,
        idTimeFrame: bookingState.timeFrame?.id,
        startTime: dayjs(bookingState.startTime).format("HH:mm:ss"),
        endTime: dayjs(bookingState.endTime).format("HH:mm:ss"),
        bookingDate: bookingState.bookingDate,
        duration: bookingState.timeFrame.duration,
        total: bookingState.timeFrame?.cost,
      };
      console.log("Confirm booking bookingState data", newData);
      dispatch(reservationActions.createReservation(newData))
        .unwrap()
        .then((res) => {
          console.log("create reservation succeeded", res);
          setSuccess(true);
          dispatch(
            bookingActions.update({
              field: "idParkingReservation",
              value: res.idParkingReservation,
            }),
          );
          return res;
        })
        .then((res) => {
          console.log("create reservation succeeded passed", res);
          const ticketRes = ticketApi.create({
            vehicleId: newData.idVehicle,
            userId: newData.idUser,
            parkingSlotId: newData.idParkingSlot,
            parkingLotId: bookingState.parkingLot?.id,
            reservationId: res.idParkingReservation,
            timeFrameId: newData.idTimeFrame,
            endTime: bookingState.endTime,
            startTime: bookingState.startTime,
            isPaid:isPaid
          });
          return ticketRes;
        })
        .then((ticketRes) => {
          console.log("ticket - response", ticketRes);
          dispatch(
            bookingActions.update({
              field: "idTicket",
              value: ticketRes.data.data.id,
            }),
          );
        })
        .catch((err) => {
          console.log("Create reservation faield", err);
          setSuccess(false);
        })
        .finally(() => {
          console.log("final");
          setVisible(true);
        });
    } catch (err) {
      console.log("Error when create reservation", err);
    }
  }
  const handleNavigationWebView = async (navState: any) => {
    console.log("nav uri", navState.url);
    if (navState.url.includes("http://192.168.43.213:3001/payment/return") == false)
      return;
    try {
        const response = await axios.get(navState.url,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
      });
      console.log("data return result vnpay", response.data);
      if (response.data.RspCode === "00") {
        Alert.alert("SUCCESS");
        await confirmBookingSuccess(true);
      } else {
        Alert.alert("FAILED");
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      setModalVisible(false);
      paymentUrlRef.current = "";
      isSecondTimeNavigationRef.current = false;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        {paymentUrlRef.current != "" && (
          <WebView
            source={{ uri: paymentUrlRef.current }}
            onNavigationStateChange={handleNavigationWebView}></WebView>
        )}
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Item title={"Parking area"} value={bookingState.parkingLot?.name} />
          <Item title={"Address"} value={bookingState.parkingLot?.address} />
          <Item
            title={"Vehicle"}
            value={`${bookingState.vehicle?.name} (${bookingState.vehicle?.number})`}
          />
          <Item
            title={"Parking spot"}
            value={`${bookingState.blockCode} - ${bookingState.parkingSlot?.slotNumber}`}
          />
          <Item
            title={"Date"}
            value={DateTimeHelper.formatDate(bookingState.bookingDate)}
          />
          <Item
            title={"Duration"}
            value={DateTimeHelper.convertToHour(
              bookingState.timeFrame?.duration,
            )}
          />
          <Item
            title={"Hours"}
            value={`${DateTimeHelper.formatTime(
              bookingState.startTime,
            )} - ${DateTimeHelper.formatTime(bookingState.endTime)}`}
          />
        </View>
        <View style={styles.card}>
          <Item
            title={"Amount"}
            value={CurrencyHelper.formatVND(bookingState.timeFrame?.cost)}
          />
          {/* <Item title={"Fees"} value={"20.000 ₫"} /> */}
          <Text style={styles.dash} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - -
          </Text>
          <Item
            title={"Total"}
            value={CurrencyHelper.formatVND(bookingState.timeFrame?.cost)}
          />
        </View>
        <View
          style={[
            styles.card,
            styles.flexRow,
            { alignItems: "center", marginBottom: 60 },
          ]}>
          <Image source={Images.Money} style={styles.image} />
          <View style={styles.wrapper}>
            <Text style={styles.cash} numberOfLines={2}>
              VNPay
            </Text>
          </View>
        </View>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={confirmBooking}>
        <Text style={styles.countinueText}>Confirm payment</Text>
      </AppButton>
      {isVisible && (
        <AppModalMessage
          isVisible={isVisible}
          isSuccess={isSuccess}
          onOk={() => navigateNext(isSuccess)}
          okText={isSuccess ? "View parking ticket" : "Back to home"}
          message={
            isSuccess
              ? "Successfully made parking reservation"
              : "There is an error!"
          }
        />
      )}
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  title: { fontSize: 15, fontWeight: "500", color: Colors.light.subtitle },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "right",
    flex: 1,
  },
  dash: { color: Colors.light.subtitle },
  image: { width: 34, height: 34, marginVertical: 8 },
  wrapper: { flex: 1, marginHorizontal: 16 },
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
  cash: { fontSize: 18, fontWeight: "600", color: Colors.light.text },
});
