import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, StatusBar, Text, Image} from "react-native";
import {  CircleButton } from "../components";
import { COLORS, SIZES, assets, FONTS} from "../constants";
import { Commentorpoint } from "../components/Commentorpoint"
import { supabase } from "../initSupabase";

const Item = ({ item }) => {
  const [question, setQuestion] = useState();
  const [choice, setChoice] = useState();
  useEffect(() => {
    const fetchQuestion = async() => {
      const { data } = await supabase.rpc('get_question',{question_id_input: item.question_id});
      setQuestion(data);
    };

    const fetchChoice = async() => {
      const { data } = await supabase.rpc('get_choice',{choice_id_input: item.choice_id});
      setChoice(data);
    };

    fetchQuestion();
    fetchChoice();

  },[]);


  return(
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: SIZES.base,
      backgroundColor: COLORS.white,
      paddingBottom: 10,
      paddingTop: 10      
    }}
    key={item.vote_id}
  >
    {
    item.change_point == 0 ?
    <Image
      source={assets.equal}
      resizeMode="contain"
      style={{ width: 48, height: 48 }}
    />
    :
    (item.change_point > 0 ?
    <Image
      source={assets.up}
      resizeMode="contain"
      style={{ width: 48, height: 48 }}
    />
    :
    <Image
      source={assets.down}
      resizeMode="contain"
      style={{ width: 48, height: 48 }}
    />)
    }

    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: SIZES.base,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.small,
          color: COLORS.primary,
          textAlign: "left"
        }}
      >
        {question}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small - 2,
          color: COLORS.secondary,
          marginTop: 3,
        }}
      >
        {choice} : {item.change_point} points
      </Text>
    </View>
  </View>
  );
};

const Commentor = ({ route, navigation }) => {
  const { commentorID } = route.params;

  const [recordData, setRecordData] = useState([]);
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  useEffect(() => {
    const fetchRecords = async() => {
      const { data } = await supabase.rpc('get_commentor_records',{commentor_id_input: commentorID});
      setRecordData(data);
    };

    fetchRecords();

  },[]);

  return (
    <SafeAreaView>
      <FlatList
        data={recordData}
        renderItem={renderItem}
        keyExtractor={item => item.vote_id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
           <View style={{ width: "100%", height: 250,}}>
              <CircleButton
                  imgUrl={assets.left}
                  handlePress={() => navigation.goBack()}
                  left={15}
                  top={StatusBar.currentHeight + 10}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    alignSelf: "center",
                    padding: 30,
                    color:COLORS.white,
                    fontSize: SIZES.large
                  }}
                >
                  Commentor Portfolio
                </Text>
                <Commentorpoint commentorID = {commentorID}/>
                <Text
                  style={{
                    fontSize: SIZES.large,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                    textAlign: "center",
                    marginTop:50,
                    backgroundColor: COLORS.white,
                    paddingBottom: 10
                  }}
                >
                  {recordData.length > 0 ? "Vote History" : "No History"}
                </Text>
            </View>
          </React.Fragment>
        )}
      />
      <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ 
            height: 200, 
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: 15, 
            borderBottomRightRadius: 15, 
            }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white  }} />
      </View>
    </SafeAreaView>
  );
};

export default Commentor;
