import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";
import { supabase } from "../initSupabase";

export const Commentorpoint = ({commentorID}) => {
  const [point, setPoint] = useState("");

  useEffect(() => {
    const getPoint = async() => {
      try {
        const user = supabase.auth.user();
        if (!user) throw new Error("No user on the session!");
        let { data, error, status } = await supabase
        .from("profiles")
        .select(`user_points`)
        .eq("id", commentorID)
        .single();

        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setPoint(data.user_points)
        }
      } catch (error) {
        alert(error);
      } 
    };

    getPoint();

  },[]);
  return (
    <View style={{
      width: "100%",
      paddingHorizontal: SIZES.font,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "center",
      // space-between
    }}>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.base,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          ...SHADOWS.light,
          elevation: 10,
          maxWidth: "50%",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.primary,
          }}
        >
          Current points
        </Text>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.medium,
            color: COLORS.primary,
          }}
        >
          {point} 
        </Text>
      </View>
    </View>
  );
};