import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Details from "../screens/Details"
import Profile from "../screens/Profile"

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
      <MainStack.Screen name="Profile" component={Profile} />
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