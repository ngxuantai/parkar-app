import { Spinner } from "@nghinv/react-native-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectableVehicleItem from "@src/components/Booking/SelectableVehicleItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { getVehicleAction } from "@src/store/actions/vehicleAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectVehicles } from "@src/store/selectors";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { ColorHelper } from "@src/utils";
import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

const SelectVehicleScreen = ({ navigation }: any) => {
  const vehicleState = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();
  const selectedVehicle = useAppSelector(selectBooking).vehicle;

  const handleSelect = (vehicle: Vehicle) => {
    dispatch(bookingActions.update({ field: "vehicle", value: vehicle }));
  };

  const navigateToAdd = () => {
    console.log("SelectVehicleScreen Navigate to Add Vehicle");

    navigation.navigate("AddVehicleScreen");
  };

  const navigateNext = () => {
    if (selectedVehicle) {
      navigation.navigate("ReserveParkingScreen");
    } else {
      Alert.alert("You must select your vehicle!");
    }
  };

  useEffect(() => {
    const getVehicle = async () => {
      Spinner.show();
      const idUser = await AsyncStorage.getItem("idUser");
      dispatch(getVehicleAction(idUser));
    };

    getVehicle();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <FlatList
        data={vehicleState}
        keyExtractor={(item) => item.idVehicle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <SelectableVehicleItem
            item={item}
            checkedId={selectedVehicle?.idVehicle}
            handleSelect={handleSelect}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <AppButton style={styles.addButton} onPress={navigateToAdd}>
            <Text style={styles.addText}>Add new vehicle</Text>
          </AppButton>
        }
      />
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectVehicleScreen;

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  addButton: {
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.primary, 0.2),
    marginTop: 12,
    marginBottom: 50,
  },
  addText: {
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: "600",
  },
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
