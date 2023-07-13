import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@src/constants";
import CarType from "@src/constants/CarType";
import { ColorHelper } from "@src/utils";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface IProps {
  placeholder: string;
  value: string;
  title: string;
  type: string;
  icon: JSX.Element;
  maxLength: number;
  onChangeText: any;
}

const VehicleInput = ({
  placeholder,
  value,
  title,
  type,
  icon,
  maxLength,
  onChangeText,
}: IProps) => {
  return (
    <View style={styles.container}>
      {icon}
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        {type == "picker" ? (
          <RNPickerSelect
            placeholder={{
              label: placeholder,
              value: "default",
            }}
            value={value}
            onValueChange={onChangeText}
            items={CarType}
            style={{
              iconContainer: {
                bottom: 2,
              },
              placeholder: {
                ...styles.input,
                color: ColorHelper.hexToRgbA(Colors.light.text, 0.4),
              },
              inputIOS: { ...styles.input },
              inputAndroid: { ...styles.input },
            }}
            Icon={() => (
              <Ionicons
                name="md-chevron-down-outline"
                size={24}
                color={Colors.light.text}
              />
            )}
          />
        ) : (
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#CBD5E1"
            maxLength={maxLength}
          />
        )}
      </View>
    </View>
  );
};

export default VehicleInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "white",
    borderRadius: 6,
  },
  wrapper: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    color: Colors.light.heading,
  },
  input: {
    paddingVertical: 4,
    paddingRight: 16,
    fontSize: 16,
    marginRight: 20,
    color: Colors.light.text,
    fontWeight: "500",
  },
});
