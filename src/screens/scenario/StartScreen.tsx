import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    headerBackground: {
        height: 320,
    }
})

export const ScenarioStartScreen = () => {
    return <View>

        <ImageBackground
            style={styles.headerBackground}
            resizeMode="cover"
            source={require("../../../assets/images/placeholder_scenario.png")}>
            <Text>{ 'something' }</Text>
        </ImageBackground>

    </View>
}