import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./navigation/types";
import { ClassroomListScreen } from "./screens/home/ClassroomListScreen";
import { HomeListScreen } from "./screens/home/HomeListScreen";
import { ScenarioStartScreen } from "./screens/scenario/StartScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppContainer = () => {
    return <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeListScreen} />
        <Stack.Screen name="Classrooms" component={ClassroomListScreen} />
        <Stack.Screen name="ScenarioStart" component={ScenarioStartScreen} />
    </Stack.Navigator>
}