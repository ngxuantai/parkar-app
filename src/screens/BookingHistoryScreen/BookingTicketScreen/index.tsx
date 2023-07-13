import AppQRCode from "@src/components/Booking/QRCode";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectUser } from "@src/store/selectors";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { DateTimeHelper } from "@src/utils";
import * as ImageManipulator from "expo-image-manipulator";
import * as Sharing from "expo-sharing";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DashedLine from "react-native-dashed-line";
import { ClipboardListIcon } from "react-native-heroicons/outline";
import { color } from "react-native-reanimated";
import ViewShot from "react-native-view-shot";

const Item = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color?: string;
}) => {
  return (
    <View style={styles.flex}>
      <Text style={[styles.title, { color: color }]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
};

const BookingTicketScreen = ({ navigation, route }: any) => {
  const ref = useRef(null);
  const [uri, setUri] = useState<string>(
    "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
  );
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  // const bookingState = useAppSelector(selectBooking);
  const reservation = route.params;
  console.log("BooktingTicketScreen - route.params", route.params);
  const parkingSlot = reservation?.ParkingSlot;
  const parkingLot = parkingSlot?.Block?.ParkingLot;
  const status = reservation?.status;
  const parkingSlip = reservation?.ParkingSlip;

  var time = `${reservation?.startTime.slice(
    0,
    reservation?.startTime.length - 3,
  )} - ${reservation?.endTime.slice(0, reservation?.endTime.length - 3)}`;

  if (parkingSlip) {
    time = `${parkingSlip?.entryTime.slice(
      0,
      parkingSlip?.entryTime.length - 3,
    )} - ${parkingSlip?.exitTime.slice(0, parkingSlip?.exitTime.length - 3)}`;
  }

  const onCapture = useCallback(() => {
    ref?.current.capture().then((uri: any) => {
      setUri(uri);
      shareImage();
    });
  }, []);

  const shareImage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Sharing isn't available on your platform");
      return;
    }
    const imageProcess = await ImageManipulator.manipulateAsync(uri);
    await Sharing.shareAsync(imageProcess.uri);
  };

  const navigationNext = () => {
    dispatch(bookingActions.reset());
    navigation.navigate("HomeScreen");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>Parking ticket</Text>
        </View>
        <TouchableOpacity style={styles.copy} onPress={onCapture}>
          <ClipboardListIcon color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}>
        <ViewShot
          style={{ flex: 1, paddingBottom: 80 }}
          ref={ref}
          options={{ format: "png", quality: 0.9 }}>
          <View style={styles.card}>
            <Text style={styles.note}>
              {status == "end" || status == "cancel"
                ? "QR code expired!"
                : "Scan this when you are in the parking lot"}
            </Text>
            {/* <AppQRCode size={180} content={"parkar" + reservation.id} /> */}
            <AppQRCode size={180} content={"parkar" + reservation.idTicket} />
          </View>
          <DashedLine
            dashLength={10}
            dashThickness={3}
            dashGap={4}
            dashColor={Colors.light.primary}
            dashStyle={{ borderRadius: 8 }}
            style={styles.dash}
          />
          <View
            style={[
              styles.card,
              { alignItems: "flex-start", paddingVertical: 12 },
            ]}>
            <Item title={"Name"} value={userState?.displayName} />
            <Item title={"Parking area"} value={parkingLot?.name} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Item
                  title={"Parking spot"}
                  value={`${parkingSlot?.Block?.blockCode} - ${parkingSlot?.slotNumber}`}
                />
                <Item
                  title={"Date"}
                  value={DateTimeHelper.formatDate(reservation?.bookingDate)}
                />
                <Item title={"Phone number"} value={userState?.phoneNumber} />
              </View>
              <View style={{ flex: 1 }}>
                <Item
                  title={"Duration"}
                  value={DateTimeHelper.convertToHour(
                    // reservation?.TimeFrame?.duration,
                    reservation?.duration,
                  )}
                />
                {status == "cancel" && (
                  <Item title="Cancelled" value="" color="red" />
                )}
                {status != "cancel" && (
                  <Item
                    title={status == "end" ? "Entry time - Exit time" : "Hours"}
                    value={time}
                  />
                )}
                <Item
                  title={"Vehicle"}
                  value={`${reservation?.Vehicle?.name} (${reservation?.Vehicle?.number})`}
                />
              </View>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
      {/* <AppButton style={styles.continueButton} onPress={navigationNext}>
        <Text style={styles.countinueText}>Back to home</Text>
      </AppButton> */}
    </View>
  );
};

export default BookingTicketScreen;

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    color: Colors.light.primary,
    fontWeight: "700",
    textAlign: "center",
  },
  copy: {},
  card: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: "center",
  },
  note: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.subtitle,
    marginBottom: 12,
  },
  code: { width: 180, height: 180 },
  dash: { marginHorizontal: 34 },
  bottom: {
    flexDirection: "row",
  },
  flex: {
    alignItems: "flex-start",
    marginVertical: 8,
  },
  title: { fontSize: 14, fontWeight: "500", color: Colors.light.subtitle },
  value: { fontSize: 16, fontWeight: "600", color: Colors.light.text },
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
