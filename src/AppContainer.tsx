import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./navigation/types";
import { ListScreen } from "./screens/ListScreen";
import { ScenarioStartScreen } from "./screens/scenario/StartScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppContainer = () => {
    return <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={ListScreen} />
        <Stack.Screen name="ScenarioStart" component={ScenarioStartScreen} />
    </Stack.Navigator>
}