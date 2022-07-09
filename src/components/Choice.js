import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet
} from "react-native";
import { FocusedStatusBar } from ".";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { supabase } from "../initSupabase";

const Choice = ({data, totalVotes, submitted}) => {
  const [choice,SetChoice] = useState(data.choice);
  const [choiceId,SetChoiceId] = useState(data.choice_id);
  const [questionId,SetQuestionId] = useState(data.question_id);

  //Increase vote by 1 after user have voted
  //Record the vote  
  const updateVote = async () => {
    const { data } = await supabase.rpc('update_vote', {choice_id_input: choiceId, question_id_input: questionId});
  };
  

  const onPressHandler = () => {
    updateVote();
  }

  return (
    <View
        style={styles.choices}
      >
        <TouchableOpacity
          onPress={onPressHandler}
          disabled={submitted}
        >
        <Text
        size="md"
        fontWeight="bold"
        style={submitted ? styles.disable : styles.option}
        >
          {choice} - {Math.floor(data.votes/totalVotes*100)}%  
        </Text>
        </TouchableOpacity>
      </View>
  );

};

const styles = StyleSheet.create({
  option : {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.font,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
    elevation: 1,
    maxWidth: "100%",
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
},
  disable : {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.font,
    backgroundColor: COLORS.lightgray,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
    elevation: 1,
    maxWidth: "100%",
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  choices : {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  }
});
export default Choice;