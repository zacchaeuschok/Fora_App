import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
} from "react-native";
import { FocusedStatusBar } from ".";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { supabase } from "../initSupabase";
import Choice from "./Choice";
import { useIsFocused } from "@react-navigation/native";

const Poll = ({data}) => {
  const [choices, SetChoices] = useState([]);
  const [question_id,SetQuestionID] =useState(data.question_id);
  const [submitted, SetSubmitted] = useState(false);
  const isFocused = useIsFocused();

  //check if button need to be disable in the beginning
  useEffect(() => {
    const questionDone = async() => {
      const { data } = await supabase.rpc('question_done', {question_id_input: question_id});
      SetSubmitted(data);
    };
    questionDone();
  },[isFocused]);

  //get the choices from supabase base on the question 
  useEffect(() => {
    const getChoices = async() => {
      try {
        const user = supabase.auth.user();
        if (!user) throw new Error("No user on the session!");
        let { data, error, status } = await supabase
          .from('choices')
          .select('*')
          .eq("question_id", question_id)
          .order('question_id', { ascending: false })
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          SetChoices(data);
        }
      } catch (error) {
        alert(error);
      } 
    };

    getChoices();

  },[]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.white} />
      <View style={{ zIndex: 0 }}>
          <FlatList
            data={choices}
            renderItem={({ item }) => <Choice data={item} submitted={submitted}/>}
            keyExtractor={(item) => `${item.choice_id}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
    </SafeAreaView>
  )
};
export default Poll;
