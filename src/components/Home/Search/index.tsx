import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import parkingLotApi from "@src/api/parkingLotApi";

type Props = {
  onSelected: any;
};

const SearchAutocomplete = (props: Props) => {
  const [value, setValue] = useState<string>();
  const [data, setData] = useState<ParkingLot[]>([]);

  const getItemText = (item: ParkingLot) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={styles.image}
          width={22}
          source={require("assets/images/location.png")}
        />
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.tabIconDefault,
          }}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.itemAddress} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
      </View>
    );
  };

  const handleChangeText = async (text: string) => {
    if (text.length >= 2) {
      try {
        const result = await parkingLotApi.search(text);
        if (result.data.data.length > 0) setData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.search}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="black"
          onPress={() => {
            setData([]);
            setValue(null);
          }}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#CBD5E1"
          style={styles.input}
          value={value}
          onChangeText={(text) => {
            handleChangeText(text);
            if (text) {
              setValue(text);
            } else {
              setValue(null);
            }
          }}
        />
        {value && (
          <AntDesign
            name="closecircleo"
            onPress={() => setValue(null)}
            size={18}
            color="black"
          />
        )}
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        style={{ marginHorizontal: 10, marginTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.onSelected(item);
              setData([]);
              setValue(item.name);
            }}>
            {getItemText(item)}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchAutocomplete;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    paddingTop: 30,
    overflow: "visible",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.light.subtitle,
    backgroundColor: Colors.light.background,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  input: {
    marginLeft: 15,
    marginRight: 10,
    flex: 1,
    height: "100%",
    color: Colors.light.text,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    marginVertical: 10,
  },
  itemName: {
    fontSize: 17,
    fontWeight: "400",
  },
  itemAddress: {
    marginTop: 2,
    color: "#56585D",
  },
  image: {
    borderRadius: 11,
    marginRight: 10,
  },
});
