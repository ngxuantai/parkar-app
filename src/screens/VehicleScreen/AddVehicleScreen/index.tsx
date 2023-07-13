import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Spinner } from "@nghinv/react-native-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from "@src/assets";
import AppButton from "@src/components/common/AppButton";
import VehicleInput from "@src/components/Vehicle/VehicleInput";
import { Colors, Layout } from "@src/constants";
import {
  createVehicleAction,
  updateVehicleAction,
} from "@src/store/actions/vehicleAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/selectors";
import { Formik, FormikProps } from "formik";
import React, { useRef } from "react";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

type VehicleFormProps = {
  type: string;
  number: string;
  name: string;
};

const VehicleSchema = Yup.object().shape({
  type: Yup.mixed()
    .oneOf(["bike", "car", "van"], "Please select car type!")
    .required("Please select car type!")
    .nullable(),
  number: Yup.string().max(50).required("Please enter license plate!"),
  name: Yup.string().max(255).required("Please enter car model!"),
});

const AddVehicleScreen = ({ route, navigation }: any) => {
  const editData: Vehicle = route.params;
  console.log("AddVehicleScreen.editData", editData);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const formikRef = useRef<FormikProps<VehicleFormProps>>();

  const inputs = [
    {
      field: "type",
      placeholder: "Select car type",
      title: "TYPE",
      maxLength: 0,
      type: "picker",
      icon: (
        <Ionicons
          name="ios-car-outline"
          size={22}
          color={Colors.light.primary}
        />
      ),
    },
    {
      field: "number",
      placeholder: "License plate number",
      title: "LICENSE PLATE",
      type: "input",
      maxLength: 50,
      icon: <Feather name="hash" size={22} color={Colors.light.primary} />,
    },
    {
      field: "name",
      placeholder: "Vehicle name",
      title: "CAR MODEL",
      type: "input",
      maxLength: 255,
      icon: (
        <MaterialCommunityIcons
          name="cog-outline"
          size={22}
          color={Colors.light.primary}
        />
      ),
    },
  ];

  const handleSubmit = (values: VehicleFormProps) => {
    Spinner.show();
    try {
      if (editData) {
        handleEdit(values);
      } else {
        handleAdd(values);
      }
    } catch (err: any) {
      Alert.alert(err);
      Spinner.hide();
    } finally {
      Alert.alert(
        "Successfully",
        `${editData ? "Edit" : "Add"} vehicle successfully`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  const handleEdit = (values: VehicleFormProps) => {
    const vehicle: Vehicle = {
      idVehicle: editData.idVehicle,
      idUser: editData.idUser,
      name: values.name,
      number: values.number,
      type: values.type,
    };
    dispatch(updateVehicleAction(vehicle));
  };

  const handleAdd = async (values: VehicleFormProps) => {
    const idUser = await AsyncStorage.getItem("idUser");
    console.log("handleAdd.userId", idUser);

    const vehicle: Vehicle = {
      idVehicle: "",
      // idUser: userState?.id || JSON.parse(idUser),
      idUser,
      name: values.name,
      number: values.number,
      type: values.type,
    };
    console.log("AddVehicleSCreen.handleAdd", vehicle);

    dispatch(createVehicleAction(vehicle));
  };
  console.log("AddVehicleScreen1", editData);

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={Images.CarPeople} style={styles.image} />
          </View>
          <Text style={styles.title}>Vehicle details</Text>
          <Text style={styles.subtitle}>
            {editData ? "Edit" : "Add"} your vehicle details below
          </Text>
          <Formik
            innerRef={formikRef}
            initialValues={
              editData || {
                type: "",
                number: "",
                name: "",
              }
            }
            validationSchema={VehicleSchema}
            onSubmit={(values) => handleSubmit(values)}>
            {({ handleChange, handleSubmit, values, errors, touched }) => {
              type InputKey = keyof typeof values;
              console.log("AddVehicleScreen2", editData);

              return (
                <View style={{ flex: 1 }}>
                  {inputs.map((input) => (
                    <View key={input.field}>
                      <VehicleInput
                        placeholder={input.placeholder}
                        value={values[input.field as InputKey]}
                        title={input.title}
                        type={input.type}
                        icon={input.icon}
                        maxLength={input.maxLength}
                        onChangeText={handleChange(input.field)}
                      />
                      {errors[input.field as InputKey] &&
                        touched[input.field as InputKey] && (
                          <Text style={styles.validateError}>
                            {/* * {errors[input.field as InputKey]} */}
                            {errors[input.field as InputKey]}
                          </Text>
                        )}
                    </View>
                  ))}
                  <AppButton
                    height={"44"}
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.textButton}>
                      {editData ? "Update" : "Add"} vehicle
                    </Text>
                  </AppButton>
                </View>
              );
            }}
          </Formik>
          {console.log("AddVehicleScreen3")}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default AddVehicleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
    height: Layout.window.height - 100,
  },
  imageContainer: {
    alignItems: "center",
    height: 160,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  title: {
    color: Colors.light.heading,
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: Colors.light.subtitle,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  validateError: {
    color: "red",
    fontSize: 13,
    marginTop: -4,
  },
});
