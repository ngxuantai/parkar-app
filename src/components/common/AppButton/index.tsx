import Colors from "@src/constants/Colors";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

interface ButtonProps {
  width: string;
  height: string;
  onPress: any;
  isLoading: boolean;
  children: JSX.Element;
  style: any;
}

const AppButton = ({
  width,
  height,
  onPress,
  isLoading,
  children,
  style,
}: ButtonProps) => {
  const w = width == "auto" ? "auto" : parseInt(width);
  const h = height == "auto" ? "auto" : parseInt(height);
  const btnStyle = [styles.root, { width: w, height: h }, style];
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {isLoading && <ActivityIndicator style={{ marginRight: 12 }} />}
      {children}
    </TouchableOpacity>
  );
};

AppButton.defaultProps = {
  width: "auto",
  height: 45,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPress: () => {},
  style: {},
};

const styles = {
  root: {
    paddingVertical: "auto",
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    minHeight: 40,
    justifyContent: "center",
    color: "#fff",
    backgroundColor: Colors.light.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
};

// const AppButton = ({
//   title,
//   width,
//   height,
//   color,
//   backgroundColor,
//   onPress,
//   children,
//   textStyle,
//   style,
//   isLoading,
// }: ButtonProps) => {
//   const btnStyle = [styles.root, { width, height, backgroundColor }, style];
//   const txtStyle = [styles.text, { color }, textStyle];
//   return (
//     <TouchableOpacity onPress={onPress} style={btnStyle}>
//       {isLoading && (
//         <ActivityIndicator style={{ marginRight: 20 }} color="white" />
//       )}
//       {title && <Text style={txtStyle}>{title}</Text>}
//       {children}
//     </TouchableOpacity>
//   );
// };

// type ButtonProps = {
//   title: string;
//   width: string;
//   height: string;
//   color: string;
//   backgroundColor: string;
//   onPress: any;
//   children: string;
//   textStyle: any;
//   style: any;
//   isLoading: boolean;
// };

// AppButton.defaultProps = {
//   title: null,
//   width: "auto",
//   height: "auto",
//   color: "white",
//   backgroundColor: Colors.light.primary,
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   onPress: () => {},
//   children: null,
//   textStyle: {},
//   style: {},
//   isLoading: false,
// };

export default AppButton;
