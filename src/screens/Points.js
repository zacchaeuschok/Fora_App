import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image
} from "react-native";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import { supabase } from "../initSupabase";



const Points = ({ route, navigation }) => {
  const { pointDeduct, point } = route.params;
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.white} />
      <View
        style={{
          paddingBottom:30,
          flex: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: COLORS.secondary
        }}
      >
        <CircleButton
          imgUrl={assets.home}
          handlePress={() => navigation.navigate("Home")}
          left={15}
          top={StatusBar.currentHeight + 10}
        />
      </View>

      <View style={{flex: 6}}>
        <View
          style={{
            flex: 2,
            paddingTop:10,
            paddingBottom:10,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: COLORS.secondary
          }}
        >
          <Text
            style={{
              width: "100%", 
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.large,
              color: COLORS.white,
              textAlign: "center"
            }}
          >
            Your choice has been successfully submitted! 
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: COLORS.secondary
          }}
        >
          <Image
            source ={assets.success}
            resizeMode="center"
            style={{ width: "50%", height: "50%" }}
          />
        </View>
        <View
          style={{
            flex: 5,
            paddingTop:20,
            paddingBottom:20,
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: COLORS.primary
          }}
        >
          <Text
            style={{
              width: "100%", 
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.large,
              color: COLORS.white,
              textAlign: "center"
            }}
          >
            {pointDeduct} points deducted!{'\n'}
          </Text>
          <Text
            style={{
              width: "100%", 
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.large,
              color: COLORS.white,
              textAlign: "center"
            }}
          >
            You have {point - pointDeduct} points remaining
          </Text>
        </View>
      </View>

      
    </SafeAreaView>
  )
};
export default Points;
