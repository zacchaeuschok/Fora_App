import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";

import { QuestionCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS, QuestionData } from "../constants";

import { useUser } from '../provider/UserContext';
import { supabase } from "../initSupabase";

type Question = {
  question_id: number,
  category: string,
  question: string,
  description: string,
  image: string,
  created_at: Date,
  expire_at: Date,
  choice: number,
  points: number
}

const Home = () => {
  const { user } = useUser()
  const [questionData, setQuestionData] = useState<Array<Question>>([]);
  const [originalData, setOriginalData] = useState<Array<Question>>([]);

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    const { data: questionData, error } = await supabase
      .from<Question>('questions')
      .select('*')
      .order('question_id', { ascending: false })
    if (error) console.log('error', error)
    else {
      setQuestionData(questionData!)
      setOriginalData(questionData!)
    }
  }

  const handleSearch = (value) => {
    if (value.length === 0) {
      setQuestionData(originalData);
    }

    const filteredData = originalData.filter((item) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setQuestionData(questionData);
    } else {
      setQuestionData(filteredData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={questionData}
            renderItem={({ item }) => <QuestionCard data={item} />}
            keyExtractor={(item) => `${item.question_id}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch}/>}
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
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
