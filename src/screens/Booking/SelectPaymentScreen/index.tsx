import SelectablePaymentItem from "@src/components/Booking/SelectablePaymentItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { ColorHelper } from "@src/utils";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@src/store/hooks";
import { useEffect } from "react";

const SelectPaymentScreen = ({ navigation }: any) => {
  const [selectedId, setSelectedId] = useState<string>(null);
  const data = [
    {
      id: "1",
      type: "Cash",
    },
    {
      id: "2",
      type: "VNPay",
    },
  ];

  // const handleSelect = (itemId) => {
  //   setSelectedId(itemId === selectedId ? null : itemId);
  // };

  const handleSelect = (item) => {
    setSelectedId(item.id);
  };

  useEffect(() => {
    console.log("selectedId", selectedId);
  }, [selectedId]);

  const navigateNext = () => {
    if (selectedId) {
      navigation.navigate("SummaryScreen", { selectedId });
    } else {
      Alert.alert("You must select payment method!");
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <SelectablePaymentItem
            item={item}
            checkedId={selectedId}
            handleSelect={() => handleSelect(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectPaymentScreen;

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
