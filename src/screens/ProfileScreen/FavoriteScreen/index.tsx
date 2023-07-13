import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from "@src/assets";
import FavoriteItem from "@src/components/Favorite/FavoriteItem";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectFavorites } from "@src/store/selectors";
import { favoriteActions } from "@src/store/slices/favoriteSlice";
import React, { useEffect } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";

const FavoriteScreen = () => {
  const favoriteState = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  console.log("FavouriteScreen - favouritestate", favoriteState);
  const handleDelete = (id: string) => {
    console.log("Favorite handle delete ", { id: id });
    dispatch(favoriteActions.deleteFavorite(id))
      .then(() => Alert.alert("Deleted successfully!"))
      .catch(() => Alert.alert("Error!"));
  };

  useEffect(() => {
    const getFavoriteLots = async () => {
      const idUser = await AsyncStorage.getItem("idUser");
      dispatch(favoriteActions.getFavorites(idUser));
    };

    getFavoriteLots();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {favoriteState.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image source={Images.EmptyBox} style={styles.image} />
          <Text style={styles.text}>No data</Text>
        </View>
      ) : (
        <FlatList
          style={{ padding: 20 }}
          data={favoriteState}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FavoriteItem
              favorite={item}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  image: { width: 160, height: 160 },
  text: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.subtitle,
  },
});
