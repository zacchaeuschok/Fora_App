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
import { Userpoint } from "../components/Userpoint";
import { ApiError, Session } from "@supabase/supabase-js";

const choices: Array<IChoice> = [
    { id: 1, choice: "Yes, it will", votes: 12 },
    { id: 2, choice: "No, it won't", votes: 1 },
  ];

const CreatePoll = ({data}) => {
  const [loading, setLoading] = useState(false);
  const [questionPoints, setQuestionPoints] = useState(data.points);
  const [point, setPoint] = useState(null);
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

  async function updateUserPoint(user_points) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        user_points,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }



  const deductPoints = async () => {
    getPoint();
    console.log({questionPoints})
    console.log({point})
    setPoint(point-questionPoints)
    updateUserPoint(point);
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
            <Userpoint/>
      </SafeAreaView>
  )
};
export default CreatePoll;
