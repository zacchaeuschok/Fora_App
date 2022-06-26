import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Alert
} from "react-native";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { supabase } from "../initSupabase";
import { ApiError, Session } from "@supabase/supabase-js";

const choices: Array<IChoice> = [
    { id: 1, choice: "Yes, it will", votes: 12 },
    { id: 2, choice: "No, it won't", votes: 1 },
  ];

const CreatePoll = ({data}) => {
  const [point, setPoint] = useState(null);
  const [questionPoints, setQuestionPoints] = useState(data.points);

  useEffect(() => {
    const getInitialPoints = async() => {
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
    };

    getInitialPoints();

  },[]);

  const deductPoints = async () => {
    const { data } = await supabase.rpc('deduct_points', {question_points_input: questionPoints});
    setPoint(data);
    console.log("deduct")
  };

  const test = (selectedChoice) => {
    console.log("SelectedChoice: ", selectedChoice)
    deductPoints();
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
                  Current point
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.medium,
                    color: COLORS.primary,
                  }}
                >
                  {point !== null ? point : "Loading..."}
                </Text>
              </View>
            </View>
      </SafeAreaView>
  )
};
export default CreatePoll;
