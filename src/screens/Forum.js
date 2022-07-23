import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, StyleSheet } from "react-native";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { CircleButton, RectButton, ProfileButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar, Comment} from "../components"; 
import { supabase, supabaseUrl } from "../initSupabase";
import { ListItem } from 'react-native-elements'
import { Ionicons } from 'react-native-vector-icons' 
import ModalDropdown from 'react-native-modal-dropdown';
  

const ForumHeader = ({data, navigation}) => {
    const [avatarUrl, setAvatarUrl] = useState();

    useEffect(() => {
        getAvatar();
    });

    async function getAvatar() {
        try {

            const user = supabase.auth.user();
            if (!user) throw new Error("No user on the session!");

            let { data, error, status } = await supabase
            .from("profiles")
            .select('avatar_url')
            .eq("id", user.id)
            .single();

            if (error && status !== 406) {
            throw error;
            }

            if (data) {
            setAvatarUrl(supabaseUrl + '/storage/v1/object/public/avatars/' + data.avatar_url)
            }

        } catch (error) {
            alert(error);
        } 
    }

    return (
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
                imgUrl={avatarUrl} 
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
        )
};

const Forum = ({ route, navigation }) => {
    const { data } = route.params;
    const [commentData, setCommentData] = useState("");
    //const isFocused = useIsFocused();
  
    useEffect(() => {
      fetchComments()
    }, [commentData])
  
    const fetchComments = async () => {
        try {
        const { data: commentData, error } = await supabase
            .from('comments')
            .select('*')
            .eq("question_id", data.question_id)
            .order("created_at", {ascending: false})

            if (error) console.log('error', error)
            else {
                setCommentData(commentData)
            }
         } catch (error) {
            alert(error)
         }
    }


    const deleteComment = async (id) => {
        const { error } = await supabase.from('comments').delete().eq('comment_id', id)
        if (error) console.log('error', error)
        else setCommentData(commentData.filter((x) => x.id !== Number(id)))
      }

    function canDelete(id) {
        const user = supabase.auth.user();
        return user.id == id;
      }

    // const commentSort = (data) => data.sort((a, b) => a.created_at.localeCompare(b.created_at))
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar backgroundColor={COLORS.primary} />
            <ForumHeader data={data} navigation={navigation}></ForumHeader>
            <View style={{ flex: 1 }}>
                <SafeAreaView 
                    style={{flex : 1 }}>
                    <FlatList
                        data={commentData}
                        keyExtractor={(item) => `${item.comment_id}`}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                        <ListItem>
                            <ListItem.Content>
                                <View style={ styles.container }>
                                    <View style={ styles.header}>
                                        <Text style = {styles.title}> {item.title} </Text>
                                        {canDelete(item.commentor_id) 
                                        ? 
                                        <ModalDropdown 
                                        options= {['Delete']} 
                                        dropdownStyle={{height: 40}}
                                        onSelect = {() => deleteComment(item.comment_id)} >
                                        <Ionicons
                                            name='ellipsis-vertical-outline'
                                            size={20}
                                        />
                                        </ModalDropdown>
                                        : null
                                        }
                                    </View>
                                    <Comment comment={item} />
                                </View>
                            </ListItem.Content>
                        </ListItem>
                        )}
                    />
                </SafeAreaView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      },

    header: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15, 
        flexDirection:"row", 
        justifyContent: "space-between"
    },

    title: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    }
})

export default Forum;