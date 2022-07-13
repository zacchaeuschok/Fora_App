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
import { FocusedStatusBar } from ".";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { supabase } from "../initSupabase";
import { useNavigation } from "@react-navigation/native";

const Choice = ({data, totalVotes, submitted}) => {
  const [choice,SetChoice] = useState(data.choice);
  const [choiceId,SetChoiceId] = useState(data.choice_id);
  const [questionId,SetQuestionId] = useState(data.question_id);
  const navigation = useNavigation();
  const [pointDeduct, SetPointDeduct]=useState(null); 
  const [point, setPoint] = useState(null);

  //user current point 
  useEffect(() => {
    const getPoint = async() => {
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

    getPoint();

  },[]);


  //Increase vote by 1 after user have voted
  //Record the vote  
  const updateVote = async () => {
    const { data } = await supabase.rpc('update_vote', {choice_id_input: choiceId, question_id_input: questionId});
  };

  //calculate point to be deducted
  useEffect(() => {
    const getPointDeduct = async() => {
      SetPointDeduct(Math.floor((data.votes/totalVotes)*100))
    };
    getPointDeduct();
  },[]);

  //deductPoint
  const deductPoints = async () => {
    const { data } = await supabase.rpc('deduct_points', {question_points_input: pointDeduct});
  };
  

  const onPressHandler = () => {
    if (pointDeduct > 100) {
      Alert.alert("Return to home and try again!")
    } else if (point - pointDeduct < 0) {
      Alert.alert("Not enough points!")
    } else {
      deductPoints();
      updateVote();
      navigation.navigate("Points", {pointDeduct,point});
    }
  }

  return (
    <View
        style={styles.choices}
      >
        <TouchableOpacity
          onPress={onPressHandler}
          disabled={submitted}
        >
          { pointDeduct < 100 ? 
        <Text
        size="md"
        fontWeight="bold"
        style={submitted ? styles.disable : styles.option}
        >
          {choice} - {pointDeduct}%
        </Text> :
        <Text
        size="md"
        fontWeight="bold"
        style={submitted ? styles.disable : styles.option}
        >
          loading...
        </Text>}
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