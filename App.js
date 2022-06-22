import React from "react";
// import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/provider/AuthProvider";
import Navigation from "./src/navigation";
import { ThemeProvider } from "react-native-rapi-ui";

// import { useState, useEffect } from 'react';
// import { Session } from '@supabase/supabase-js'
// import { supabase } from './src/initSupabase'
// import Home from "./screens/Home";
// import Details from "./screens/Details";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./src/assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./src/assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./src/assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./src/assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./src/assets/fonts/Inter-Light.ttf"),
  });

  // if (!loaded) return null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
