import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileAction from "@src/components/Profile/ProfileAction";
import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LogoutIcon } from "react-native-heroicons/outline";

const actions = [
  {
    text: "Personal information",
    screen: "PersonalScreen",
    icon: <FontAwesome5 name="user" size={19} color={Colors.light.primary} />,
  },
  {
    text: "Payment",
    screen: "HomeScreen",
    icon: (
      <AntDesign name="creditcard" size={20} color={Colors.light.primary} />
    ),
  },
  {
    text: "Favorite",
    screen: "FavoriteScreen",
    icon: <FontAwesome name="heart-o" size={20} color={Colors.light.primary} />,
  },
  {
    text: "Vehicles",
    screen: "VehicleScreen",
    icon: (
      <Ionicons name="ios-car-outline" size={22} color={Colors.light.primary} />
    ),
  },
  {
    text: "Change password",
    screen: "ChangePasswordScreen",
    icon: (
      <MaterialCommunityIcons
        name="cog-outline"
        size={20}
        color={Colors.light.primary}
      />
    ),
  },
];

const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scroll}
        bounces={true}
        showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 40 }}>
          {/* <Image
            style={styles.avatar}
            source={{
              uri:
                userState?.imageUrl ||
                "https://ui-avatars.com/api/?background=random&color=random&font-size=0.33&name=user",
            }}
          /> */}
          {actions.map((action) => (
            <ProfileAction
              key={action.text}
              navigation={navigation}
              text={action.text}
              screen={action.screen}
              icon={action.icon}
            />
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              navigation.navigate("SignIn");
              await AsyncStorage.removeItem("idUser");
            }}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Log out</Text>
              <LogoutIcon color={Colors.light.primary} size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7FB",
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  heading: {
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    marginTop: 20,
  },
  buttonContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: "600",
    marginRight: 12,
  },
});
