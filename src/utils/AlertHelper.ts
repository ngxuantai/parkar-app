import { Alert } from "react-native";

const AlertHelper = {
  confirm: (onYes: any, onNo: any) => {
    Alert.alert("Are your sure?", "Are you sure you want to remove this?", [
      {
        text: "Yes",
        onPress: () => onYes(),
      },
      {
        text: "No",
        onPress: () => onNo(),
      },
    ]);
  },
};

export default AlertHelper;
