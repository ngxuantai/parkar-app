import React from "react";
import QRCode from "react-native-qrcode-svg";

type Props = {
  content: string;
  size: any;
};

const AppQRCode = ({ content, size }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logoFromFile = require("@src/assets/images/branding/android-chrome-512x512.png");
  return <QRCode size={size} value={content} logo={logoFromFile} />;
};

export default AppQRCode;
