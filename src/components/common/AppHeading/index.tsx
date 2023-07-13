import React from "react";
import { Text } from "react-native";

const AppHeading = ({ style, children }: HeadingProps) => {
  const styles = [defaultStyle, style];
  return <Text style={styles}>{children}</Text>;
};

type HeadingProps = {
  style: any;
  children?: React.ReactNode;
};

AppHeading.defaultProps = {
  text: null,
  style: {},
};

const defaultStyle = {
  fontSize: 26,
  fontWeight: "600",
  color: "#35438E",
};

export default AppHeading;
