import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { Label } from "./Text";


const styles = StyleSheet.create({
    tagBase: {
        color: "white",
        backgroundColor: themeColors.PRIMARY,
        borderRadius: themeDimensions.BORDER_RADIUS_TAG,
        alignSelf: 'flex-start',
        overflow: 'hidden',
        marginEnd: 5,
        marginTop: 4,
    },
    smallTag: {
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    fatTag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    inactive: {
        backgroundColor: themeColors.LIGHT,
    },
    secondary: {
        backgroundColor: themeColors.SECONDARY
    }
})

export const Tag = ({children, secondary = false}: {
    children?: React.ReactNode;
    secondary?: boolean
}) => {
    return <Text style={[styles.tagBase, styles.smallTag,
        secondary && styles.secondary]}>
        {children}
    </Text>
}

export const FatTag = ({children, active = true, onPress}: {
    children?: React.ReactNode;
    active?: boolean;
    onPress?: (event: GestureResponderEvent) => void
}) => {
    return <TouchableOpacity onPress={onPress}>
        <Label style={[styles.tagBase, styles.fatTag, 
            !active && styles.inactive]}>
            {children}
        </Label>
    </TouchableOpacity>
}