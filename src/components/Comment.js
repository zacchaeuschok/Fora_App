import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { Ionicons } from 'react-native-vector-icons' 
import { supabase } from "../initSupabase";
import { useNavigation } from "@react-navigation/native";


const Comment = ({ comment }) => {
    const [username, setUsername] = useState("");
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(comment.likes);
    const [deleted, setDeleted] = useState(false);
    const [deletable, setDeletable] = useState(false);
    const [text, setText] = useState(comment.message.slice(0, 100));
    const [readMore, setReadMore] = useState(false);
    const navigation = useNavigation();
    const [commentorID, setCommentorID] = useState(comment.commentor_id)
    const [questionID, setQuestionID] = useState(comment.question_id)
    const [choice, setChoice] = useState(null);

    useEffect(() => {
      getUsername();
    });

    useEffect(() => {
      const fetchStatus = async() => {
        const { data } = await supabase.rpc('get_user_status', {commentor_id_input: commentorID,question_id_input:questionID});
        console.log(data);
        setChoice(data);
      };
  
      fetchStatus();

    },[]);

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

    async function decreaseLikes() {

      setLikes(likes - 1);
      setLiked(false);

      const { data, error } = await supabase
      .from('comments')
      .update({ likes: likes })
      .eq("comment_id", comment.comment_id)
    }

    async function increaseLikes() {

      setLikes(likes + 1);
      setLiked(true);

      const { data, error } = await supabase
        .from('comments')
        .update({ likes: likes })
        .eq("comment_id", comment.comment_id)
    }

  return (
    <View>
        <View style={{flexDirection:"row"}}>
          <View style={{alignItems:"flex-start",marginTop: 15, marginLeft: 10}}>
            <TouchableOpacity
              testID="profile"
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                borderRadius: SIZES.extraLarge,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Portfolio")}
            >
              <Image
                source={assets.person01}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
          <View style={ styles.commentdata }>
              <Text style={ styles.username }> {username} </Text>
              <Text style ={ styles.date }>{comment?.created_at.substring(0, 10)} </Text>
          </View>
        </View>
        <View style ={{ paddingLeft: SIZES.font }}>
            <Text>
                {text} {JSON.stringify({text}).length < 110 ? "" : !readMore && "..."}
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
                {JSON.stringify({text}).length < 110 ? "" : readMore ? "Show Less" : "Read More"}
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
                    onPress={() => liked ? decreaseLikes() : increaseLikes()}
                /> 
                {' '} {likes}
            </Text>
            <Text style = {{color: COLORS.gray}}>
              { choice != null ? 
              username + " vote - " + choice  
              : 
              username + " have not voted"  
              }
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
        padding: SIZES.font,
        justifyContent: "space-between",
        flexDirection: "row-reverse"
    },

    readmore: {
        color: COLORS.primary,
        fontSize: SIZES.small,
        fontFamily: FONTS.semiBold,
    }


})

export default Comment;