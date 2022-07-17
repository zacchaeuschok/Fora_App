import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Details from "../screens/Details"
import Forum from "../screens/Forum"
import Post from "../screens/Post";
import Profile from "../screens/Profile"
import CreatePoll from "../screens/CreatePoll.tsx"

// import { useState, useEffect } from 'react';
// import { Session } from '@supabase/supabase-js'
// import { supabase } from '../initSupabase'

const MainStack = createNativeStackNavigator();
const Main = () => {

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Details" component={Details} />
      <MainStack.Screen name="Forum" component={Forum} />
      <MainStack.Screen name="Post" component={Post} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="CreatePoll" component={CreatePoll} />
    </MainStack.Navigator>
  );
};

export default Main;

{/* <Stack.Navigator
screenOptions={{
  headerShown: false,
}}
initialRouteName="Home"
>
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="Details" component={Details} />
</Stack.Navigator> */}