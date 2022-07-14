import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList } from "react-native";
import { Section, SectionContent } from 'react-native-rapi-ui';

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { QuestionTitle } from "../components/SubInfo";
import { CircleButton, RectButton, ProfileButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar, Comment} from "../components";
import { supabase } from "../initSupabase";

  
const ForumHeader = ({data, navigation}) => (
   
   <View 
    style = {{
        width: "100%",
        height: 330,
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignSelf: "stretch",
        // alignItems: "center",
        padding: SIZES.font,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }}
   >
        <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={25}
        top = {15}
        />
        <ProfileButton 
        imgUrl={assets.person02} 
        handlePress={() => navigation.navigate("Profile")}
        right = {25}
        top = {15}
        />

        <View
        style ={{ 
            flexDirection: "row",
            marginTop: 60,
            padding: SIZES.font,
        }}>
            <View
            style = {{
                alignSelf: "flex-start",

            }}>
                <Text 
                style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.large,
                    color: COLORS.white
                }}
                >
                {data.category}
                </Text>
            </View>

            <View
            style = {{
                alignSelf: "flex-end",
                marginLeft: 'auto'
            }}>
                <RectButton
                    minWidth={90}
                    fontSize={SIZES.small}
                    handlePress={() => navigation.navigate("Details", { data })}
                    text = {"Place a bid"}
                    backgroundColor={COLORS.white}
                    textColor={COLORS.primary}
                />
            </View>
        </View>

        <Text style ={{
            fontFamily: FONTS.semiBold,
            color: COLORS.white,
            paddingLeft: SIZES.font
        }}>
            {data.question}
            
        </Text>

        <Text style ={{
            color: COLORS.gray,
            padding: SIZES.font
        }}>
            {data.description}
        </Text>
    </View>
);

const Forum = ({ route, navigation }) => {
    const { data } = route.params;
    const [commentData, setCommentData] = useState("");
  
    useEffect(() => {
      fetchComments()
    }, [])
  
    const fetchComments = async () => {
        try {
        const { data: commentData, error } = await supabase
            .from('comments')
            .select()
            if (error) console.log('error', error)
            else {
                setCommentData(commentData)
            }
         } catch (error) {
            alert(error)
         }
    }

    // const commentSort = (data) => data.sort((a, b) => a.created_at.localeCompare(b.created_at))

    console.log(commentData)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ForumHeader data={data} navigation={navigation}></ForumHeader>
            <View style={{ flex: 1 }}>
                <SafeAreaView 
                    style={{flex : 1 }}>
                    <FlatList
                        data={commentData}
                        renderItem = {({item}) => <Comment comment={item} />}
                        keyExtractor={(item) => `${item.comment_id}`}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            </View>
        </SafeAreaView>
    );
};

export default Forum;