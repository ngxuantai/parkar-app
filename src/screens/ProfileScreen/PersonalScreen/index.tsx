import { Spinner } from "@nghinv/react-native-loading";
import AppButton from "@src/components/common/AppButton";
import AvatarUpload from "@src/components/Profile/AvatarUpload";
import ProfileInput from "@src/components/Profile/ProfileInput";
import { Colors, Layout } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/selectors";
import { userActions } from "@src/store/slices/userSlice";
import { Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MailIcon, PhoneIcon, UserIcon } from "react-native-heroicons/outline";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IProfileInputProps {
  field: string;
  placeholder: string;
  title: string;
  maxLength: number;
  icon: JSX.Element;
}

type ProfileForm = {
  displayName: string;
  email: string;
  phoneNumber: string;
};

const PersonalScreen = () => {
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const formikRef = useRef<FormikProps<ProfileForm>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(
    userState?.imageUrl ||
      "https://ui-avatars.com/api/?background=random&color=random&font-size=0.33&name=user",
  );

  const inputs: IProfileInputProps[] = [
    {
      field: "displayName",
      placeholder: "Your name",
      title: "NAME",
      maxLength: 50,
      icon: <UserIcon color={Colors.light.primary} size={26} />,
    },
    {
      field: "email",
      placeholder: "Your email",
      title: "EMAIL",
      maxLength: 50,
      icon: <MailIcon color={Colors.light.primary} size={26} />,
    },
    {
      field: "phoneNumber",
      placeholder: "Your phone number",
      title: "PHONE NUMBER",
      maxLength: 11,
      icon: <PhoneIcon color={Colors.light.primary} size={26} />,
    },
  ];

  const handleUpdateProfile = (values: ProfileForm) => {
    const user = { ...userState, ...values, imageUrl };
    dispatch(userActions.updateUser(user));
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) Spinner.show();
    else Spinner.hide();
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;
    setIsLoading(false);
    Alert.alert("Updated sucessfully!");
  }, [userState]);

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <AvatarUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <Formik
            innerRef={formikRef}
            initialValues={{
              displayName: userState?.displayName,
              email: userState?.email,
              phoneNumber: userState?.phoneNumber,
            }}
            onSubmit={(values) => handleUpdateProfile(values)}>
            {({ handleChange, handleSubmit, values }) => {
              type InputKey = keyof typeof values;
              return (
                <View style={{ flex: 1 }}>
                  {inputs.map((input) => (
                    <ProfileInput
                      key={input.title}
                      placeholder={input.placeholder}
                      value={values[input.field as InputKey]}
                      title={input.title}
                      icon={input.icon}
                      maxLength={input.maxLength}
                      onChangeText={handleChange(input.field)}
                    />
                  ))}
                  <AppButton
                    height={"44"}
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.textButton}>Update profile</Text>
                  </AppButton>
                </View>
              );
            }}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 8,
    justifyContent: "flex-start",
    height: Layout.window.height - 160,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 16,
    left: 16,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default PersonalScreen;
