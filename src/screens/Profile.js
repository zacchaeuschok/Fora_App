import React, { useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity,} from "react-native";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 150,
          justifyContent: "center",
        }}
      >
      </View>
    </SafeAreaView>
  );
};

export default Profile