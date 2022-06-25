import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView
} from "react-native";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { supabase } from "../initSupabase";

const choices: Array<IChoice> = [
    { id: 1, choice: "Yes, it will", votes: 12 },
    { id: 2, choice: "No, it won't", votes: 1 },
  ];

const CreatePoll = () => {

  const test = (selectedChoice) => {
    console.log("SelectedChoice: ", selectedChoice)
  };

  return (
      <SafeAreaView style={{ flex: 1 }}>
          <FocusedStatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
          />
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent" ,
              }}
            >
              <RNPoll
                  appearFrom = "left"
                  totalVotes={30}
                  animationDuration={750}
                  choices={choices}
                  PollContainer={RNAnimated}
                  PollItemContainer={RNAnimated}
                  choiceTextStyle={{
                      fontFamily: FONTS.semiBold,
                  }}
                  onChoicePress={(selectedChoice: IChoice) =>
                      test(selectedChoice)
                  }
              />
            </View>
      </SafeAreaView>
  )
};
export default CreatePoll;
