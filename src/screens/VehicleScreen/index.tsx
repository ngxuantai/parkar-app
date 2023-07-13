import { Spinner } from "@nghinv/react-native-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from "@src/assets";
import AppButton from "@src/components/common/AppButton";
import VehicleItem from "@src/components/Vehicle/VehicleItem";
import { Colors } from "@src/constants";
import {
  deleteVehicleAction,
  getVehicleAction,
} from "@src/store/actions/vehicleAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectVehicles } from "@src/store/selectors";
import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const VehicleScreen = ({ navigation }: any) => {
  const vehicleState = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const navigateToAdd = () => {
    navigation.navigate("AddVehicleScreen");
  };

  const navigateToEdit = (data: Vehicle) => {
    navigation.navigate("AddVehicleScreen", data);
  };

  const handleDelete = (idVehicle: string) => {
    Spinner.show();
    dispatch(deleteVehicleAction(idVehicle));
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
    <View style={{ flex: 1 }}>
      {vehicleState.length == 0 ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Image source={Images.EmptyBox} style={styles.image} />
          <Text style={styles.text}>No data</Text>
        </View>
      ) : (
        <FlatList
          data={vehicleState}
          renderItem={({ item }) => (
            <VehicleItem
              item={item}
              onEdit={() => navigateToEdit(item)}
              onDelete={() => handleDelete(item.idVehicle)}
            />
          )}
          keyExtractor={(item) => item.idVehicle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      <AppButton onPress={navigateToAdd} style={styles.button}>
        <Text style={styles.buttonText}>Add a vehicle</Text>
      </AppButton>
    </View>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
  separator: {
    height: 12,
  },
  image: { width: 160, height: 160 },
  text: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.subtitle,
  },
});
