import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { CircleButton, RectButton, ProfileButton, SubInfo } from "../components";
import { Ionicons } from 'react-native-vector-icons' 
import { supabase } from "../initSupabase";
import ModalDropdown from 'react-native-modal-dropdown';

const Comment = ({ comment }) => {
    const [username, setUsername] = useState("");
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(comment.likes);
    const [deleted, setDeleted] = useState(false);
    const [deletable, setDeletable] = useState(false);
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

    async function deleteComment() {

      setDeleted(true);
      
      const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('comment_id', comment.comment_id)
    }

    function canDelete() {

      const user = supabase.auth.user();

      return user.id == comment.commentor_id;
    }

  return (
    <View style={ styles.container }>
        <View style={{
          marginLeft: 15,
          marginRight: 15,
          marginTop: 15, 
          flexDirection:"row", 
          justifyContent: "space-between"
        }}>
          <Text style = 
            {{ fontFamily: FONTS.bold,
               fontSize: SIZES.medium,
               color: COLORS.primary,}}
          > 
            {comment.title}
          </Text>
          
          {canDelete() 
            ? 
            <ModalDropdown 
              options= {['Delete']} 
              dropdownStyle={{height: 40}}
              onSelect = {() => deleteComment()} >
              <Ionicons
                  name='ellipsis-vertical-outline'
                  size={20}
              />
            </ModalDropdown>
            : null
          }

        </View>
        <View>
          <ProfileButton 
              imgUrl={assets.person02} 
              handlePress={() => navigation.navigate("Profile")}
              left = {15}
              top = {15}
          />
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
            <Text style = {{color: COLORS.gray}}>{username} voted YES</Text>
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