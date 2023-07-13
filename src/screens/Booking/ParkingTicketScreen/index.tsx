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
import ViewShot from "react-native-view-shot";

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flex}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
};

const ParkingTicketScreen = ({ navigation }: any) => {
  const ref = useRef(null);
  const [uri, setUri] = useState<string>(
    "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
  );
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  const bookingState = useAppSelector(selectBooking);
  console.log("ParkingTicketScreen - bookingState", bookingState);
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
          style={{ flex: 1, paddingBottom: 100 }}
          ref={ref}
          options={{ format: "png", quality: 0.9 }}>
          <View style={styles.card}>
            <Text style={styles.note}>
              Scan this when you are in the parking lot
            </Text>
            <AppQRCode
              size={180}
              // content={"parka" + bookingState.idParkingReservation}
              content={"parkar" + bookingState.idTicket}
            />
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
            <Item
              title={"Parking area"}
              value={bookingState.parkingLot?.name}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Item
                  title={"Parking spot"}
                  value={`${bookingState.blockCode} - ${bookingState.parkingSlot.slotNumber}`}
                />
                <Item
                  title={"Date"}
                  value={DateTimeHelper.formatDate(bookingState.bookingDate)}
                />
                <Item title={"Phone number"} value={userState?.phoneNumber} />
              </View>
              <View style={{ flex: 1 }}>
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
                <Item
                  title={"Vehicle"}
                  value={`${bookingState.vehicle?.name} (${bookingState.vehicle?.number})`}
                />
              </View>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={navigationNext}>
        <Text style={styles.countinueText}>Back to home</Text>
      </AppButton>
    </View>
  );
};

export default ParkingTicketScreen;

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    paddingHorizontal: 20,
    height: 80,
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
