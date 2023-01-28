import React from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { DefaultText } from "./Text";


const styles = StyleSheet.create({
    container: {
        backgroundColor: themeColors.PRIMARY,
        padding: themeDimensions.BUTTON_PADDING,
        borderRadius: themeDimensions.BORDER_RADIUS_BUTTON,
    },
    text: {
        color: themeColors.TEXT_ON_PRIMARY,
        textAlign: "center"
    }
})

export const TextButton = ({children, onPress, style, textStyle}: {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {
    return <TouchableOpacity 
        onPress={onPress}
        style={[styles.container, style]}>
        <DefaultText bold style={[styles.text, textStyle]}>{ children }</DefaultText>
    </TouchableOpacity>
}