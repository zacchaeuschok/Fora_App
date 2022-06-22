import React from "react";
import {
    View,
    Text,
    SafeAreaView
} from "react-native";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";

const choices: Array<IChoice> = [
    { id: 1, choice: "Nike", votes: 12 },
    { id: 2, choice: "Adidas", votes: 1 },
    { id: 3, choice: "Puma", votes: 3 },
    { id: 4, choice: "Reebok", votes: 5 },
    { id: 5, choice: "Under Armour", votes: 9 },
  ];

const CreatePoll = ({ }) => {
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
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Text
                    style={{
                        marginTop: 32,
                        fontSize: 20,
                        fontFamily: FONTS.semiBold,
                    }}
                    >
                    What is your favorite sport brand?
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent" ,
                }}
              >
                <RNPoll
                    appearFrom="top"
                    totalVotes={30}
                    animationDuration={750}
                    choices={choices}
                    PollContainer={RNAnimated}
                    PollItemContainer={RNAnimated}
                    choiceTextStyle={{
                        fontFamily: FONTS.semiBold,
                    }}
                    onChoicePress={(selectedChoice: IChoice) =>
                        console.log("SelectedChoice: ", selectedChoice)
                    }
                />
              </View>
        </SafeAreaView>
    )
};
export default CreatePoll;
