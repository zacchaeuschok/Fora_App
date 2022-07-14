import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Details from "../screens/Details"
import Profile from "../screens/Profile"
import Poll from "../components/Poll.js"
import Points from "../screens/Points.js"
import Expired from "../screens/Expired"

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
      <MainStack.Screen name="Expired" component={Expired} />
      <MainStack.Screen name="Poll" component={Poll} />
      <MainStack.Screen name="Points" component={Points} />
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