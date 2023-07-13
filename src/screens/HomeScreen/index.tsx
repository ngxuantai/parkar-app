import DetailModal from "@src/components/Home/DetailModal";
import Map from "@src/components/Home/Map";
import { useAppDispatch } from "@src/store/hooks";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [distance, setDistance] = useState(0);
  const dispatch = useAppDispatch();
  console.log("isShowDetail (parking marker)",isShowDetail);
  const navigateBooking = () => {
    navigation.navigate("ParkingDetailsScreen");
  };
  console.log("Isshow detail modal ",isShowDetail);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Map
          onSelectedMarker={(parking: ParkingLot) => {
            console.log("onSelectedMarker parking = ",parking);
            dispatch(
              bookingActions.update({
                field: "parkingLot",
                value: parking,
              }),
            );
            setIsShowDetail(true);
          }}
          setDistance={setDistance}
        />
        <DetailModal
          distance={distance}
          isShow={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          navigateBooking={navigateBooking}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    flex: 1,
  },
});
