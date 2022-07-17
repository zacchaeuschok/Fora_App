import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList } from "react-native";
import { Section, SectionContent } from 'react-native-rapi-ui';

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { QuestionTitle } from "../components/SubInfo";
import { CircleButton, RectButton, ProfileButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar, Comment} from "../components";
import { Ionicons } from 'react-native-vector-icons' 
import { supabase } from "../initSupabase";

  
const ForumHeader = ({data, navigation}) => (
   
   <View 
    style = {{
        width: "100%",
        // flex: 1,
        // flexDirection: "column",
        // justifyContent: "space-between",
        padding: SIZES.font,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }}
   >
        <View style = {{
            flexDirection: 'column'
        }}>
            <CircleButton
            imgUrl={assets.left}
            handlePress={() => navigation.goBack()}
            left = {25}
            top = {15}
            />
            <ProfileButton 
            imgUrl={assets.person02} 
            handlePress={() => navigation.navigate("Profile")}
            right = {25}
            top = {15}
            />
        </View>

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
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.extraLarge,
                    color: COLORS.white
                }}
                >
                {data.category}
                </Text>
            </View>
        </View>

        <View style = {{
            flexDirection: 'column'
        }}>
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

        <View style = {{
            justifyContent: "space-around",
            flexDirection: 'row',
            padding: SIZES.font,
        }}>
            <RectButton
                minWidth={90}
                fontSize={SIZES.small}
                handlePress={() => navigation.navigate("Details", { data })}
                text = {"Place a bid"}
                backgroundColor={COLORS.white}
                textColor={COLORS.primary}
            />
            <View style = {{
                justifyContent: "flex-end",
                marginRight: "auto"
            }}>
                <CircleButton
                    imgUrl={assets.pen}
                    handlePress={() => navigation.navigate("Post", { data })}
                    top={0}
                    left={20}
                />
            </View>
        </View>
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
            .select("*")
            .eq("question_id", data.question_id)

            if (error) console.log('error', error)
            else {
                setCommentData(commentData)
            }
         } catch (error) {
            alert(error)
         }
    }

    // const commentSort = (data) => data.sort((a, b) => a.created_at.localeCompare(b.created_at))
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