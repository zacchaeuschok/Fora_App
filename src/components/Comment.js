import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, StyleSheet } from "react-native";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { CircleButton, RectButton, ProfileButton, SubInfo } from "../components";
import { Ionicons } from 'react-native-vector-icons' 
import { supabase } from "../initSupabase";

const Comment = ({ comment }) => {
    const [username, setUsername] = useState("");
    const [text, setText] = useState(comment.message.slice(0, 100));
    const [readMore, setReadMore] = useState(false);

    useEffect(() => {
      getUsername();
    });

    async function getUsername() {
        try {
        //   const user = supabase.auth.user();
        //   if (!user) throw new Error("No user on the session!");
          let { data, error, status } = await supabase
            .from("profiles")
            .select(`username`)
            .eq("id", comment.commentor_id)
            .single();
    
          if (error && status !== 406) {
            throw error;
          }
    
          if (data) {
            setUsername(data.username)
          }

        } catch (error) {
          alert(error);
        } 
      }

  return (
    <View style={ styles.container }>
        <ProfileButton 
            imgUrl={assets.person02} 
            handlePress={() => navigation.navigate("Profile")}
            left = {15}
            top = {15}
        />
        <View style={ styles.commentdata }>
            <Text style={ styles.username }> {username} </Text>
            <Text style ={ styles.date }> {comment?.created_at} </Text>
        </View>
        <View style ={{ paddingLeft: SIZES.font }}>
            <Text>
                {text} {!readMore && "..."}
            </Text>
            <Text
              style={ styles.readmore }
              onPress={() => {
                if (!readMore) {
                  setText(comment.message);
                  setReadMore(true);
                } else {
                  setText(comment.message.slice(0, 100));
                  setReadMore(false);
                }
              }}
            >
                {readMore ? "Show Less" : "Read More"}
            </Text>
        </View>

        <View style={ styles.like }>
            <Text style={{
                    alignItems: 'center',
                    color: COLORS.primary,
                    fontFamily: FONTS.medium,
                    fontSize: SIZES.small * 1.2,
            }}>
                <Ionicons 
                    name='thumbs-up'
                    size={20}
                // onPress={() => navigation.goBack()}
                /> 
                {' '} {comment.likes}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      },

    commentdata: {
        // flex: 1,
        flexDirection: "column",
        margin: 17,
        marginLeft: 65
    },

    username: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },

    date: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },

    like: {
        // flex: 1,
        padding: SIZES.font * 1,
        justifyContent: "space-between",
    },

    readmore: {
        color: COLORS.primary,
        fontSize: SIZES.small,
        fontFamily: FONTS.semiBold,
    }


})

export default Comment;