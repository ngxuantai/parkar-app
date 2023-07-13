import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

export default Layout;
