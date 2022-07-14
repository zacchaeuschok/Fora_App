import { useState, useEffect } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Alert,
  StatusBar
} from "react-native";
import { supabase } from "../initSupabase";
import { ApiError, Session } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'
import { Userpoint } from "../components/Userpoint";

import {
  Layout,
  Text,
  TextInput,
  Button,
} from "react-native-rapi-ui";
import { CircleButton, FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Portfolio = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
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
            <View style={{ width: "100%", height: 373 }}>
              <CircleButton
                  imgUrl={assets.left}
                  handlePress={() => navigation.goBack()}
                  left={15}
                  top={StatusBar.currentHeight + 10}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    alignSelf: "center",
                    padding: 30,
                    color:COLORS.white,
                    fontSize: SIZES.large
                  }}
                >
                  Portfolio
                </Text>
                <CircleButton
                  imgUrl={assets.settings}
                  handlePress={() => navigation.navigate("Profile")}
                  right={15}
                  top={StatusBar.currentHeight + 10}
                />
                <Userpoint/>
            </View>
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
            style={{ height: 200, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>)
};

export default Portfolio;
