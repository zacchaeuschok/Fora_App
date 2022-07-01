import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert
} from "react-native";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { supabase } from "../initSupabase";
import { ApiError, Session } from "@supabase/supabase-js";
import {
  Layout,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";



const CreatePoll = ({data}) => {
  const [submitted, SetSubmitted] = useState(false);

  const onPressHandler = () => {
    SetSubmitted(!submitted);
  }
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
        />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
  
        }}
      >
        <TouchableOpacity
          onPress={onPressHandler}
          disabled={submitted}
        >
          { submitted ? 
          <Text
          size="md"
          fontWeight="bold"
          style={styles.disable}
          >
            Yes, it will - 75%  
          </Text>
          :
          <Text
          size="md"
          fontWeight="bold"
          style={styles.option}
          >
            Yes, it will - 75%  
          </Text>
          }
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15
        }}
      >
        <TouchableOpacity
          onPress={onPressHandler}
          disabled={submitted}
        >
          { submitted ? 
          <Text
          size="md"
          fontWeight="bold"
          style={styles.disable}
          >
            No, it won't - 15%  
          </Text>
          :
          <Text
          size="md"
          fontWeight="bold"
          style={styles.option}
          >
            No, it won't - 15%  
          </Text>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  option : {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.font,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
    elevation: 1,
    maxWidth: "100%",
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
},
  disable : {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.font,
    backgroundColor: COLORS.lightgray,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
    elevation: 1,
    maxWidth: "100%",
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  }
});
export default CreatePoll;
