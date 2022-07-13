import { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  View,
  Alert,
  StyleSheet,
  StatusBar
} from "react-native";
import { supabase } from "../initSupabase";
import { ApiError, Session } from "@supabase/supabase-js";
// import { useNavigation } from "@react-navigation/native";
import 'react-native-url-polyfill/auto'
import { Userpoint } from "../components/Userpoint";

import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { CircleButton } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";



export default function Profile() {

  
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select('username, avatar_url')
        .eq("id", user.id)
        .single();
      
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
  }: {
    username: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        // avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw new Error;
      } else {
        Alert.alert("Update successful")
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
      <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <CircleButton
              imgUrl={assets.left}
              handlePress={() => navigation.goBack()}
              left={15}
              top={StatusBar.currentHeight + 10}
            />
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h3"
            >
              Portfolio
            </Text>
            {/* <Text style={{ marginTop: 15 }}>Email</Text>
            <TextInput
             containerStyle={{ marginTop: 15 }}
             placeholder="Enter your email"
             value={session?.user?.email} 
             autoCapitalize="none"
             autoCompleteType="off"
             autoCorrect={false}
             keyboardType="email-address"
            /> */}
            <Userpoint/>
            <Text style={{ marginTop: 15 }}>Username</Text>
            <TextInput
             containerStyle={{ marginTop: 15 }}
             placeholder="Enter your username"
             value={username || ""}
             autoCapitalize="none"
             autoCompleteType="off"
             autoCorrect={false}
             keyboardType="default"
             onChangeText={(text) => setUsername(text)}
            />
            <Button
              text= {loading ? "Loading ..." : "Update"}
              onPress={() => {
                if (username.length > 3) {
                  updateProfile({ username });
                } else {
                  Alert.alert("Username too short!")
                }
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />
            <Button
              text= "Sign Out"
              onPress={() => {
                supabase.auth.signOut();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />
          </View>        
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
)}