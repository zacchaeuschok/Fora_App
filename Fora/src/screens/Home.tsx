import React from "react";
import { View, Linking, Image, FlatList } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../initSupabase";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  TextInput,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { NFTData } from "../../constants"; 
import { QuestionCard } from "../components";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [text, setText] = React.useState('');
  const [questionData, setQuestionData] = React.useState(NFTData);

  return (
    <Layout>
      <TopNav
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
        
      />

      <View style = {{
        marginTop: 10
      }}>
        <TextInput
            placeholder="Search for new questions"
            value={text}
            onChangeText={(val) => setText(val)}
            leftContent={
                <Ionicons name="search-outline" size={20} color={themeColor.gray300} />
            }
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={questionData}
            renderItem={({ item }) => <QuestionCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

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
          <View
            style={{ height: 300, }} />
          <View style={{ flex: 1, backgroundColor: themeColor.white100 }} />
        </View>
      </View>

    </Layout>
  );
}