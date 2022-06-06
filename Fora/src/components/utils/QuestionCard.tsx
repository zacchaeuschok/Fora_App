import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text } from "react-native";
import { Section, SectionContent, SectionImage } from "react-native-rapi-ui";
import { COLORS, SIZES, SHADOWS, assets } from "../../../constants";

const QuestionCard = ({ data } : {data: any}) => {
    const navigation = useNavigation();

    return (
        <Section>
            <SectionImage
                source={data.image}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: SIZES.font,
                    borderTopRightRadius: SIZES.font,
                }} />
            <SectionContent>
                <Text>This is a Section</Text>
            </SectionContent>
        </Section>
    );
};

export default QuestionCard;