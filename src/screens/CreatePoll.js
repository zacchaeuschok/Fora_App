import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { supabase } from "../initSupabase";
import { ApiError, Session } from "@supabase/supabase-js";
import TestPoll from "../components/TestPoll";

const CreatePoll = ({data}) => {
  const [submitted, SetSubmitted] = useState(false);
  const [choices, SetChoices] = useState([]);
  const [question_id,SetQuestionID] =useState(data.question_id);
  const [totalVotes, setTotalVotes] = useState(null); 

  useEffect(() => {
    const getTotalVotes = async () => {
      const { data } = await supabase.rpc('get_total_votes', {id_input: question_id});
      setTotalVotes(data);
    };
    getTotalVotes();
  },[]);

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

  const updateVote = async () => {
    const { data } = await supabase.rpc('get_total_votes', {id_input: question_id});
    setTotalVotes(data);
  };

  const onPressHandler = () => {
    SetSubmitted(!submitted);
    updateVote();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.white} />
      <View style={{ zIndex: 0 }}>
          <FlatList
            data={choices}
            renderItem={({ item }) => <TestPoll data={item} onPressHandler ={onPressHandler} submitted={submitted} totalVotes={totalVotes}/>}
            keyExtractor={(item) => `${item.choice_id}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
    </SafeAreaView>
  )
};
export default CreatePoll;
