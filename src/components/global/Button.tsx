import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
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

export const TextButton = ({children, style}: {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}) => {
    return <TouchableOpacity style={[styles.container, style]}>
        <DefaultText bold style={styles.text}>{ children }</DefaultText>
    </TouchableOpacity>
}