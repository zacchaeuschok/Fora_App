import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { View, Image } from "react-native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, EthPrice, QuestionTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";
import { supabase } from "../initSupabase";

const QuestionCard = ({ data }) => {
  const navigation = useNavigation();
  const noChoice = data.choice;
  const [question_id, setQuestionID] = useState(data.question_id);
  const [totalVotes, setTotalVotes] = useState(null); 
  const isFocused = useIsFocused();

  useEffect(() => {
    const getTotalVotes = async () => {
      const { data } = await supabase.rpc('get_total_votes', {id_input: question_id});
      setTotalVotes(data);
    };
    getTotalVotes();
  },[isFocused]);


  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
        }}
      >
        <Image
          source={{uri: data.image}}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />

        <CircleButton 
          imgUrl={assets.forum} 
          right={10} 
          top={10} 
          handlePress={() => navigation.navigate("Forum", { data })}
          />

      </View>

      <SubInfo question_id = {data.question_id}/>

      <View style={{ width: "100%", padding: SIZES.font }}>
        <QuestionTitle
          title={data.category}
          subTitle={data.question + "\n\nExpire at: " + data.expire_at.substring(0,10)}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
          color={COLORS.primary}
        />

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <EthPrice price={totalVotes - noChoice} />
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("Details", { data })}
            text = "Place a bid"
            backgroundColor={COLORS.primary}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );
};

export default QuestionCard;
