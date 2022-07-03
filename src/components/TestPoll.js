import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet
} from "react-native";
import { FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";

const TestPoll = ({data, onPressHandler,submitted,totalVotes}) => {
  const [choice,SetChoice] = useState(data.choice)

  return (
    <View
        style={styles.choices}
      >
        <TouchableOpacity
          onPress={onPressHandler}
          disabled={submitted}
        >
        <Text
        size="md"
        fontWeight="bold"
        style={submitted ? styles.disable : styles.option}
        >
          {choice} - {Math.floor(data.votes/totalVotes*100)}%  
        </Text>
        </TouchableOpacity>
      </View>
  );

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
  },
  choices : {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  }
});
export default TestPoll;