import { Colors } from "@src/constants";
import { ColorHelper } from "@src/utils";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  maxLine: number;
  lineHeight: number;
  content: string;
  style?: any;
  styleText?: any;
};

const ReadMore = ({
  maxLine = 4,
  lineHeight = 14,
  content,
  style,
  styleText,
}: Props) => {
  const [isShowMore, setShowMore] = useState<boolean>(false);
  const [isShowText, setShowText] = useState<boolean>(false);
  const [maxLines, setMaxLines] = useState<number>(maxLine);

  const onPressShowMore = () => {
    setShowMore(!isShowMore);
    setMaxLines(!isShowMore ? maxLine : 0);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    const maxHeight = maxLines * lineHeight;

    if (maxLines > 0 && height > maxHeight) {
      setShowMore(true);
      setShowText(true);
    }
  };

  return (
    <View style={style}>
      <Text
        style={[styles.text, styleText, { lineHeight: lineHeight }]}
        numberOfLines={isShowMore ? maxLines : 0}
        ellipsizeMode="tail"
        onLayout={(event) => onLayout(event)}>
        {content}
      </Text>
      {isShowText && (
        <TouchableOpacity onPress={onPressShowMore}>
          <Text style={styles.textShowMore} onPress={onPressShowMore}>
            {isShowMore ? "Show more" : "Show less"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
  textShowMore: {
    color: ColorHelper.hexToRgbA(Colors.light.primary, 0.7),
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default ReadMore;
