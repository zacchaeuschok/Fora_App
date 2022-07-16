import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, StatusBar, Text, Image} from "react-native";
import { QuestionCard, HomeHeader, FocusedStatusBar, CircleButton } from "../components";
import { COLORS, SIZES, assets, QuestionData, FONTS} from "../constants";
import {Userpoint} from "../components/Userpoint"
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    vote_id: "1",
    question: "Will the CDC identify a variant of high consequence by September 30, 2022?",
    choice: "Yes, it will",
    image: assets.up,
    change_point: +50,
    expired_date: "2022-02-23"
  },
  {
    vote_id: "2",
    question: "Will Singapore go into a recession in 2022?",
    choice: "Yes, it will",
    image: assets.down,
    change_point: -50,
    expired_date: "2022-02-27"
  },
  {
    vote_id: "3",
    question: "Will inflation rise more than 0.8% in July?",
    choice: "Yes, it will",
    image: assets.up,
    change_point: +50,
    expired_date: "2022-02-25"
  },
];

const Item = ({ item }) => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: SIZES.base,
      paddingHorizontal: SIZES.base,
    }}
    key={item.vote_id}
  >
    <Image
      source={item.image}
      resizeMode="contain"
      style={{ width: 48, height: 48 }}
    />

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
        {item.question}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small - 2,
          color: COLORS.secondary,
          marginTop: 3,
        }}
      >
        {item.choice} : {item.change_point} points
      </Text>
    </View>
  </View>
);

const Portfolio = () => {
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.vote_id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
           <View style={{ width: "100%", height: 250 }}>
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
                  Portfolio
                </Text>
                <CircleButton
                  imgUrl={assets.settings}
                  handlePress={() => navigation.navigate("Profile")}
                  right={15}
                  top={StatusBar.currentHeight + 10}
                />
                <Userpoint/>
                <Text
                  style={{
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                    marginTop:50,
                    marginLeft: 10
          
                  }}
                >
                  {DATA.length > 0 ? "Vote History" : "No History"}
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
          <View style={{ height: 200, backgroundColor: COLORS.primary }} />
          <View style={{ backgroundColor: COLORS.white }} />
      </View>
    </SafeAreaView>
  );
};

export default Portfolio;
