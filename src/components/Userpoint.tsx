import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";
import { supabase } from "../initSupabase";

export const Userpoint = () => {
  const [point, setPoint] = useState("");
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (session) getPoint();
  }, [session]);

  async function getPoint() {
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`user_points`)
        .eq("id", user.id)
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
  }
  return (
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
        Current point
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
  );
};