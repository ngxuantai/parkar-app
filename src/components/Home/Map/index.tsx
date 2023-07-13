import parkingLotApi from "@src/api/parkingLotApi";
import { Colors } from "@src/constants";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import SearchAutocomplete from "../Search";
import { TouchableOpacity } from "react-native-gesture-handler";
import Geofence from "react-native-expo-geofence";

type Props = {
  onSelectedMarker: any;
  setDistance: any;
};
type Location = {
  longitude: number;
  latitude: number;
};

const Map = (props: Props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 10.879424639901684,
    longitude: 106.63844840942431,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocation, setCurrentLocation] = useState<Location>({
    latitude: 10.879424639901684,
    longitude: 106.63844840942431,
  });
  const [destination, setDestination] = useState<Location>();
  const [locations, setLocations] = useState([]);
  const [nearestParkingSpot, setNearsetParkingSpot] = useState<ParkingLot>();
  const [parkings, setParkings] = useState<ParkingLot[]>([]);

  const handleSelectedSearchItem = (location: any) => {
    setRegion({
      ...region,
      longitude: location.long,
      latitude: location.lat,
    });
    setDestination(null);
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const tmp = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: tmp.coords.latitude,
        longitude: tmp.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCurrentLocation({
        latitude: tmp.coords.latitude,
        longitude: tmp.coords.longitude,
      });
    };
    const getParkingLocation = async () => {
      try {
        const result = await parkingLotApi.getAll();
        if (result.data.data.length > 0) {
          setParkings(result.data.data);
          const tmp = result.data.data.map((element: any) => {
            return {
              longitude: Number(element.long),
              latitude: Number(element.lat),
            };
          });
          setLocations(tmp);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentLocation();
    getParkingLocation();
  }, []);

  const findNearestParkingSpot = () => {
    const locs = parkings.map((item) => {
      return {
        key: item.id,
        latitude: item.lat,
        longitude: item.long,
      };
    });
    console.log("locs", locs);
    const nearestLocation = Geofence.filterByProximity(
      currentLocation,
      locs,
      10,
    );

    //get the lowest distanceInKm location
    const a = nearestLocation.reduce(
      (prev: { distanceInKM: number }, curr: { distanceInKM: number }) =>
        prev.distanceInKM < curr.distanceInKM ? prev : curr,
    );
    const result = parkings.find((parking) => parking.id == a.key);
    setNearsetParkingSpot(result);
    props.onSelectedMarker(result);
  };
  return (
    <>
      <SearchAutocomplete onSelected={handleSelectedSearchItem} />
      <TouchableOpacity
        onPress={findNearestParkingSpot}
        style={{
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "tomato",
        }}>
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
          FIND NEAREST PARKING LOCATION
        </Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        region={region}
        provider="google"
        showsMyLocationButton
        showsUserLocation>
        {locations &&
          locations.map((e, index) => {
            return (
              <Marker
                coordinate={e}
                key={`marker${index}`}
                onPress={() => {
                  props.onSelectedMarker(parkings[index]);
                  setRegion({ ...region, ...e });
                  setDestination(e);
                }}>
                <Image
                  style={styles.marker}
                  width={22}
                  source={require("@src/assets/images/location.png")}
                />
              </Marker>
            );
          })}
        {destination && (
          <MapViewDirections
            origin={currentLocation}
            destination={destination}
            apikey="AIzaSyDDshYtcCaO_wP7yN6mm4gYdhqLZw8hHAc"
            strokeWidth={4}
            strokeColor={Colors.light.primary}
            optimizeWaypoints={true}
            onReady={(result) => {
              props.setDistance(result.distance);
            }}
          />
        )}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 180,
  },
  marker: {
    resizeMode: "contain",
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.155,
    shadowRadius: 10,
  },
});

export default Map;
