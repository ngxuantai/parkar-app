import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Spinner } from "@nghinv/react-native-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import parkingSlotApi from "@src/api/parkingSlotApi";
import { Colors, Spacing } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectFavorites } from "@src/store/selectors";
import { favoriteActions } from "@src/store/slices/favoriteSlice";
import { timeFrameActions } from "@src/store/slices/timeFrameSlice";
import dayjs from "dayjs";
import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionButton from "../ActionButton";
import TimeItem from "../TimeItem";

const renderItem = (value: any) => {
  return <TimeItem period={value.item.duration} cost={value.item.cost} />;
};

type Props = {
  isShow: boolean;
  onClose: any;
  distance: number;
  navigateBooking: any;
};

const DetailModal = (props: Props) => {
  const { isShow, onClose, navigateBooking } = props;
  const ref = React.useRef<BottomSheet>(null);
  const selectedParking = useAppSelector(selectBooking).parkingLot;
  console.log(
    "Detail parking modal parkingLot  selectedParking= ",
    selectedParking,
  );
  const [numOfAvailableSlots, setNumOfAvailableSlots] = useState<number>(0);
  const favoriteState = useAppSelector(selectFavorites);
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onOpenBottomSheetHandler = (index: number) => {
    ref?.current?.snapToIndex(index);
  };
  const handleCall = () => {
    Linking.openURL("tel:+84978155434");
  };
  const addFavorite = () => {
    (async () => {
      const idUser = await AsyncStorage.getItem("idUser");
      console.log("addFavourite selectedParking", selectedParking?.id);
      console.log("addFavourite idUser", idUser);
      dispatch(
        favoriteActions.createFavorite({
          // id: selectedParking?.id,
          id: selectedParking?.id,
          idUser: idUser,
        }),
      );
      setFavorite(true);
    })();
  };

  useEffect(() => {
    if (isShow === true) {
      onOpenBottomSheetHandler(1);
    } else {
      onOpenBottomSheetHandler(-1);
    }
  }, [isShow, selectedParking]);

  useEffect(() => {
    dispatch(timeFrameActions.getTimeFrames(selectedParking?.id));
    let isFav = false;
    favoriteState.forEach((favorite) => {
      if (favorite.id == selectedParking.id) isFav = true;
    });
    setFavorite(isFav);
  }, [selectedParking]);

  useEffect(() => {
    const getNumOfSlots = async () => {
      // const time = dayjs().get("hour") + ":" + dayjs().get("minute");
      // Spinner.show();
      // const numOfSlots = await parkingSlotApi.getAvailableSlots(
      //   time,
      //   time,
      //   dayjs().format("YYYY-MM-DD"),
      //   selectedParking?.id,
      // );
      const time = dayjs().get("hour") + ":" + dayjs().get("minute");
      Spinner.show();
      const numOfSlots = await parkingSlotApi.getAvailableSlots(
        dayjs().format(),
        dayjs().format(),
        dayjs().format(),
        selectedParking?.id,
      );
      console.log("Number of avaiable slot", numOfSlots);
      let num = 0;

      // numOfSlots.data.data.forEach((element: any) => {
      //   num += element.ParkingSlots?.length;
      // });

      //Code sau khi thêm câu lệnh điều kiện
      if (numOfSlots.data.data) {
        numOfSlots.data.data.forEach((element: any) => {
          console.log("???", element);
          num += element.parkingSlots?.length;
        });
      }
      setNumOfAvailableSlots(num);
      Spinner.hide();
    };
    if (selectedParking) {
      getNumOfSlots();
    }
  }, [selectedParking]);

  return (
    <>
      <BottomSheet
        ref={ref}
        enablePanDownToClose={true}
        onClose={onClose}
        snapPoints={[1, 280, "52%", "95%"]}>
        <BottomSheetView>
          <View
            style={{
              paddingHorizontal: 20,
              height: "100%",
              backgroundColor: "white",
            }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: Colors.light.primary,
                    lineHeight: 24,
                  }}
                  numberOfLines={2}>
                  {selectedParking?.name}
                </Text>
                <View style={styles.flexRow}>
                  <Feather
                    name="map-pin"
                    size={18}
                    color={Colors.light.heading}
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: Colors.light.heading,
                      lineHeight: 18,
                      width: "90%",
                      marginLeft: Spacing.s,
                    }}>
                    {selectedParking?.address}
                  </Text>
                </View>
              </View>
              <Image
                source={{
                  uri: "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
                }}
                style={{
                  height: 80,
                  width: "25%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <TouchableOpacity style={styles.btnBook} onPress={navigateBooking}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: Colors.light.background,
                  textAlign: "center",
                }}>
                View details
              </Text>
            </TouchableOpacity>
            <View style={styles.flexRow}>
              <View
                style={{
                  backgroundColor: Colors.light.primary,
                  padding: 4,
                  borderRadius: 4,
                }}>
                <MaterialIcons
                  name="directions-walk"
                  size={20}
                  color={Colors.light.background}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: Spacing.s,
                  color: Colors.light.heading,
                }}>
                {Math.round(props.distance * 100) / 100}km
              </Text>
              <View
                style={{
                  backgroundColor: Colors.light.primary,
                  padding: 5,
                  borderRadius: 4,
                }}>
                <MaterialCommunityIcons
                  name="parking"
                  size={18}
                  color={Colors.light.background}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: Spacing.s,
                  color: Colors.light.heading,
                }}>
                {numOfAvailableSlots} slots available
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Spacing.l,
              }}>
              <ActionButton
                action={handleCall}
                icon={
                  <Ionicons
                    name="ios-call-outline"
                    size={24}
                    color={Colors.light.primary}
                  />
                }
                text={"Call"}
              />
              <ActionButton
                action={() => onOpenBottomSheetHandler(0)}
                icon={
                  <MaterialIcons
                    name="directions"
                    size={24}
                    color={Colors.light.primary}
                  />
                }
                text={"Direction"}
              />
              <ActionButton
                action={addFavorite}
                icon={
                  isFavorite ? (
                    <Ionicons
                      name="md-heart"
                      size={24}
                      color={Colors.light.primary}
                    />
                  ) : (
                    <Ionicons
                      name="md-heart-outline"
                      size={24}
                      color={Colors.light.primary}
                    />
                  )
                }
                text={"Save"}
              />
            </View>
            <Text style={styles.title}>Info</Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                color: Colors.light.subtitle,
                textAlign: "justify",
              }}>
              {selectedParking?.description}
            </Text>
            {/* <Text style={styles.title}>Parking time</Text>
            <View style={{ height: 50 }}>
              <BottomSheetFlatList
                style={{ flexGrow: 0 }}
                data={timeFrames}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Text style={styles.title}>Payment type</Text> */}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  btnBook: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    height: 42,
    marginVertical: 12,
  },
  header: {
    backgroundColor: Colors.light.background,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: -1, height: -4 },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    paddingTop: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  flexRow: { display: "flex", flexDirection: "row", alignItems: "center" },
});

export default DetailModal;
