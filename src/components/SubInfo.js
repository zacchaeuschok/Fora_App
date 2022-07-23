import React, { useState, useEffect } from "react";
import { View, Image, Text, Alert } from "react-native";

import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";
import { supabase } from "../initSupabase";
import { useIsFocused } from "@react-navigation/native";

export const QuestionTitle = ({ title, subTitle, titleSize, subTitleSize, color }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          // color: COLORS.primary,
          color: color,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: color,
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export const EthPrice = ({ price }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={assets.eth}
        resizeMode="contain"
        style={{ width: 20, height: 20, marginRight: 2 }}
      />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
        }}
      >
        {price}
      </Text>
    </View>
  );
};

const ImageCmp = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 48,
        height: 48,
        marginLeft: index === 0 ? 0 : -SIZES.font,
      }}
    />
  );
};

export const People = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[assets.person02, assets.person03, assets.person04].map(
        (imgUrl, index) => (
          <ImageCmp imgUrl={imgUrl} index={index} key={`People-${index}`} />
        )
      )}
    </View>
  );
};

export const EndDate = ({question_id}) => {
  const [difference, setDifference] = useState(null);
  const [expired, setExpired] = useState(null);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  async function updateExpired() {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");
      const { data } = await supabase.rpc('update_expired', {question_id_input: question_id});
      setExpired(data);
      setLoading(false);
  }

  async function addPoint() {
    setLoading(true);
    const user = supabase.auth.user();
    if (!user) throw new Error("No user on the session!");
    const { data } = await supabase.rpc('add_points', {question_id_input: question_id});
    setLoading(false);
}

  useEffect(() => {
    const duration = async () => {
      const { data } = await supabase.rpc('duration', {id_input: question_id});
      if (data == null) { //loading when null
        setDifference("loading");
      } else if (data.substring(0,1) == '-') { //when expired
        setDifference('Expired');
        updateExpired();
        if (expired == false) addPoint();
      } else if (data.substring(0,6) == '1 day ' || data.substring(0,6) == '1 year') { //when 1 day or 1 year
        setDifference(data.substring(0,6));
      } else if (data.substring(0,5) == '1 mon') { //when 1 mon
        setDifference(data.substring(0,5));
      } else if (data.substring(0,6).slice(-1) == 's') { //when one digit day
        setDifference(data.substring(0,6));
      } else if (data.substring(0,7).slice(-3) == 'day') { //when two digit day
        setDifference(data.substring(0,7)); 
      } else { // less than 24 hour
        setDifference(data.substring(0,8));
      }
    };

    duration();

  },[isFocused]);

  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        {difference == "Expired" ? "Status:" : "Ending in"}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {difference}
      </Text>
    </View>
  );
};

export const SubInfo = ({question_id}) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: "row",
        justifyContent: "flex-end",
        // space-between
      }}
    >
      {/* <People /> */}
      <EndDate question_id = {question_id}/>
    </View>
  );
};
