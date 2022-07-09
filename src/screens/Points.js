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
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";


const Points = () => {
  const navigation = useNavigation();
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
            Your choice have been successfully submitted! 
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
      </View>

      <View style={{flex: 6, backgroundColor: COLORS.secondary}}>
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
                    Your points
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: SIZES.medium,
                      color: COLORS.primary,
                    }}
                  >
                    {12}
                  </Text>
                </View>
              </View>
      </View>
    </SafeAreaView>
  )
};
export default Points;
