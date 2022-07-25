import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

import { COLORS, SIZES, FONTS, SHADOWS } from "../constants";
import Avatar from "./Avatar";

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      testID="circle"
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};

export const ProfileButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      testID="profile"
      style={{
        width: 40,
        height: 40,
        position: "absolute",
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
    
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        // source={imgUrl == null ? {uri : imgUrl} : require("../assets/images/smiley.png")}
        source = {{uri : imgUrl}}
        resizeMode="contain"
        style={{ width: 40, height: 40 }}
      />
    </TouchableOpacity>
  );
};

export const ArchiveButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      testID="archive"
      style={{
        width: 40,
        height: 40,
        backgroundColor: "transparent",
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 40, height: 40 }}
      />
    </TouchableOpacity>
  );
};

export const RectButton = ({ minWidth, fontSize, handlePress, text, backgroundColor, textColor, ...props }) => {
  return (
    <TouchableOpacity
      testID="rect"
      style={{
        backgroundColor: backgroundColor,
        padding: SIZES.small,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: fontSize,
          color: textColor,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
