import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, Alert } from "react-native";
import { Button, TouchableOpacity, KeyboardAvoidingView} from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { QuestionTitle } from "../components/SubInfo";
import { CircleButton, RectButton, ProfileButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar, Comment} from "../components";
import { Ionicons } from 'react-native-vector-icons' 
import { TextInput } from "react-native-rapi-ui"
import { supabase } from "../initSupabase";

const Post = ({route, navigation}) => {
    const { data } = route.params;
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    async function postMessage({title, message}) {
        try {
            setLoading(true);
            const user = supabase.auth.user();
            if (!user) throw new Error("No user on the session!");
    
            const post = {
                commentor_id : user.id,
                title: title,
                message: message,
                question_id: data.question_id,
                likes: 0,
                created_at: new Date()            
            }

            console.log(post)
    
            let { error } = await supabase
                .from("comments")
                .insert([post], { returning: "minimal" })
    
            if (error) {
                console.log(error)
                throw new Error;
            } else {
                Alert.alert("Posted!")
            }
        } catch (error) {
            Alert.alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
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
                <Text style ={{
                    fontFamily: FONTS.bold,
                    color: COLORS.white,
                    fontSize: SIZES.large,
                    paddingLeft: SIZES.font,
                    paddingBottom: SIZES.font * 2,
                    textAlign: "center"
                }}>
                    Create New Post
                </Text>
                <Text style ={{
                    fontFamily: FONTS.semiBold,
                    color: COLORS.white,
                    paddingLeft: SIZES.font,
                    // textAlign: "center"
                }}>
                    {data.question}
                </Text>
                <Text style ={{
                    color: COLORS.gray,
                    padding: SIZES.font,
                    // textAlign: "center"
                }}>
                    {data.description}
                </Text>
            </View>
            
            <TextInput
            containerStyle={{ margin: 15}}
            placeholder="Enter your Title"
            value={title || ""}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="default"
            onChangeText={(text) => setTitle(text)}
            />

            <View style = {{       
                    paddingHorizontal: SIZES.font,
                    width: "100%",
                    // backgroundColor: '#F0F0F0',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    // borderWidth: 1,
                    // borderColor: 'lightgrey',
                    // borderRadius: 25
                }}>
                <TextInput
                containerStyle={{ height: 140, paddingTop: 0, paddingBottom: 0 }}
                style={{textAlignVertical: "top"}}
                textAlignVertical= 'top'
                multiline={true}
                numberOfLines={5}
                maxLength={1000}

                clearTextOnFocus={true}
                placeholder="Enter your Message"
                value={message || ""}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={(text) => setMessage(text)}
                />
            </View>

            <View style = {{flexDirection: 'row', justifyContent: "space-evenly"}}>
                <TouchableOpacity 
                    onPress ={() => navigation.goBack()}
                    style = {{
                        marginTop: SIZES.font * 2,
                        borderRadius: 10,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Text style = {{
                        paddingVertical: SIZES.font,
                        paddingHorizontal: SIZES.font * 3,
                        fontFamily: FONTS.semiBold,
                        textAlign:"center",
                        color: COLORS.white
                    }}> 
                        Back
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => postMessage({title, message})} 
                    style = {{
                        marginTop: SIZES.font * 2,
                        borderRadius: 10,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Text style = {{
                        paddingVertical: SIZES.font,
                        paddingHorizontal: SIZES.font * 3,
                        fontFamily: FONTS.semiBold,
                        textAlign:"center",
                        color: COLORS.white
                    }}> 
                        Post
                    </Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
};

export default Post;