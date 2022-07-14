import React from "react";
import { View, Text, Image, TextInput, StatusBar } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { CircleButton } from "./Button";
import { supabase } from "../initSupabase";
import { useState, useEffect } from 'react'

import { COLORS, FONTS, SIZES, assets } from "../constants";
//import from from "../../__mocks__/@react-native-async-storage/async-storage";

export const ExpiredHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 3,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={StatusBar.currentHeight + 10}
      />
      <Text
        style={{
          fontWeight: "bold",
          alignSelf: "center",
          padding: 30,
          color:COLORS.white,
          fontSize: SIZES.large
        }}
      >
        Expired Question
      </Text>
    </View>
  );
};
